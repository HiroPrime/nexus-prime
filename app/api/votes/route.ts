import {
  castVote,
  getVoteState,
  getVoterIdentity,
  type VoteChoice,
} from "@/lib/votes";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isVoteChoice(value: unknown): value is VoteChoice {
  return value === "criticism" || value === "compliments";
}

function respond(data: unknown, setCookie?: string, status = 200) {
  const headers: Record<string, string> = {
    "Cache-Control": "no-store",
  };

  if (setCookie) {
    headers["Set-Cookie"] = setCookie;
  }

  return NextResponse.json(data, { status, headers });
}

export async function GET(request: Request) {
  try {
    const { voterKey, setCookie } = getVoterIdentity(request.headers);
    const state = await getVoteState(voterKey);
    return respond(state, setCookie);
  } catch (error) {
    console.error("GET /api/votes failed:", error);
    return respond({ error: "server_error" }, undefined, 500);
  }
}

export async function POST(request: Request) {
  try {
    const { voterKey, setCookie } = getVoterIdentity(request.headers);
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return respond({ error: "invalid_body" }, setCookie, 400);
    }

    const choice =
      typeof body === "object" &&
      body !== null &&
      "choice" in body &&
      isVoteChoice(body.choice)
        ? body.choice
        : null;

    if (!choice) {
      return respond({ error: "invalid_choice" }, setCookie, 400);
    }

    const result = await castVote(voterKey, choice);
    return respond({ ...result, hasVoted: true }, setCookie);
  } catch (error) {
    console.error("POST /api/votes failed:", error);
    return respond({ error: "server_error" }, undefined, 500);
  }
}
