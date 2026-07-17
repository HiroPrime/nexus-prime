import { createHash, randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type VoteChoice = "criticism" | "compliments";

type VoteStore = {
  counts: Record<VoteChoice, number>;
  voters: Record<string, VoteChoice>;
};

const DATA_PATH = path.join(process.cwd(), "data", "votes.json");

function hashValue(value: string): string {
  const salt = process.env.VOTE_HASH_SALT ?? "nexus-prime-vote-salt";
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

let cachedStore: VoteStore | null = null;

async function readStore(): Promise<VoteStore> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<VoteStore>;
    cachedStore = {
      counts: {
        criticism: parsed.counts?.criticism ?? 0,
        compliments: parsed.counts?.compliments ?? 0,
      },
      voters: parsed.voters ?? {},
    };
    return cachedStore;
  } catch {
    cachedStore = {
      counts: { criticism: 0, compliments: 0 },
      voters: {},
    };
    return cachedStore;
  }
}

async function writeStore(store: VoteStore): Promise<void> {
  cachedStore = store;
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  const tempPath = `${DATA_PATH}.tmp`;
  await fs.writeFile(tempPath, JSON.stringify(store, null, 2), "utf-8");
  await fs.rename(tempPath, DATA_PATH);
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return headers.get("x-real-ip") ?? "unknown";
}

export function getVoterIdentity(headers: Headers): {
  voterKey: string;
  setCookie?: string;
} {
  const ip = getClientIp(headers);

  if (ip !== "unknown") {
    return { voterKey: hashValue(`ip:${ip}`) };
  }

  const cookieMatch = headers
    .get("cookie")
    ?.match(/(?:^|;\s*)nexus_voter_id=([^;]+)/);

  if (cookieMatch?.[1]) {
    return { voterKey: hashValue(`cookie:${cookieMatch[1]}`) };
  }

  const voterId = randomUUID();
  return {
    voterKey: hashValue(`cookie:${voterId}`),
    setCookie: `nexus_voter_id=${voterId}; Path=/; Max-Age=31536000; SameSite=Lax; HttpOnly`,
  };
}

export async function getVoteState(voterKey: string) {
  const store = await readStore();
  const userVote = store.voters[voterKey] ?? null;

  return {
    counts: store.counts,
    userVote,
    hasVoted: userVote !== null,
  };
}

export async function castVote(voterKey: string, choice: VoteChoice) {
  const store = await readStore();
  const previous = store.voters[voterKey];

  if (previous === choice) {
    return {
      ok: true as const,
      counts: store.counts,
      userVote: choice,
    };
  }

  if (previous) {
    store.counts[previous] = Math.max(0, store.counts[previous] - 1);
  }

  store.voters[voterKey] = choice;
  store.counts[choice] += 1;
  await writeStore(store);

  return {
    ok: true as const,
    counts: store.counts,
    userVote: choice,
  };
}
