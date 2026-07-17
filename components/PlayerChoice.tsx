"use client";

import { useEffect, useRef, useState } from "react";

type VoteChoice = "criticism" | "compliments";

type VoteCounts = Record<VoteChoice, number>;

type VotePayload = {
  counts: VoteCounts;
  userVote: VoteChoice | null;
};

const EMPTY_COUNTS: VoteCounts = { criticism: 0, compliments: 0 };

const CHOICE_MESSAGES: Record<VoteChoice, string> = {
  criticism: "Thank you for your honesty, but why are you even here?",
  compliments: "Thanks for the validation. Your awesome too!",
};

const POPUP_STORAGE_KEY = "nexus_choice_popups_seen";

function getSeenPopups(): Record<VoteChoice, boolean> {
  if (typeof window === "undefined") {
    return { criticism: false, compliments: false };
  }

  try {
    const raw = window.localStorage.getItem(POPUP_STORAGE_KEY);
    if (!raw) {
      return { criticism: false, compliments: false };
    }

    const parsed = JSON.parse(raw) as Partial<Record<VoteChoice, boolean>>;
    return {
      criticism: parsed.criticism === true,
      compliments: parsed.compliments === true,
    };
  } catch {
    return { criticism: false, compliments: false };
  }
}

function markPopupSeen(choice: VoteChoice) {
  const seen = getSeenPopups();
  seen[choice] = true;

  try {
    window.localStorage.setItem(POPUP_STORAGE_KEY, JSON.stringify(seen));
  } catch {
    // Ignore storage failures.
  }
}

function parseVotePayload(value: unknown): VotePayload | null {
  if (typeof value !== "object" || value === null) return null;

  const data = value as {
    counts?: VoteCounts;
    userVote?: VoteChoice | null;
  };

  if (
    typeof data.counts?.criticism !== "number" ||
    typeof data.counts?.compliments !== "number"
  ) {
    return null;
  }

  const userVote =
    data.userVote === "criticism" || data.userVote === "compliments"
      ? data.userVote
      : null;

  return { counts: data.counts, userVote };
}

async function fetchVotes(): Promise<VotePayload> {
  const res = await fetch("/api/votes", {
    cache: "no-store",
    credentials: "same-origin",
  });

  const data: unknown = await res.json();
  return parseVotePayload(data) ?? { counts: EMPTY_COUNTS, userVote: null };
}

async function submitVote(choice: VoteChoice): Promise<VotePayload | null> {
  const res = await fetch("/api/votes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ choice }),
    credentials: "same-origin",
  });

  const data: unknown = await res.json();
  return parseVotePayload(data);
}

function adjustCounts(
  counts: VoteCounts,
  previous: VoteChoice | null,
  next: VoteChoice
): VoteCounts {
  const updated = { ...counts };

  if (previous === next) {
    return updated;
  }

  if (previous) {
    updated[previous] = Math.max(0, updated[previous] - 1);
  }

  updated[next] += 1;
  return updated;
}

type PlayerChoiceProps = {
  onVoted?: () => void;
};

export function PlayerChoice({ onVoted }: PlayerChoiceProps = {}) {
  const [counts, setCounts] = useState<VoteCounts>(EMPTY_COUNTS);
  const [selectedChoice, setSelectedChoice] =
    useState<VoteChoice>("criticism");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const hasInteractedRef = useRef(false);
  const requestIdRef = useRef(0);
  const selectedChoiceRef = useRef<VoteChoice>("criticism");
  const seenPopupsRef = useRef<Record<VoteChoice, boolean>>({
    criticism: false,
    compliments: false,
  });

  useEffect(() => {
    seenPopupsRef.current = getSeenPopups();
  }, []);

  useEffect(() => {
    selectedChoiceRef.current = selectedChoice;
  }, [selectedChoice]);

  useEffect(() => {
    const requestId = ++requestIdRef.current;

    fetchVotes()
      .then((payload) => {
        if (requestId !== requestIdRef.current || hasInteractedRef.current) {
          return;
        }

        setCounts(payload.counts);
        if (payload.userVote) {
          selectedChoiceRef.current = payload.userVote;
          setSelectedChoice(payload.userVote);
        }
      })
      .catch((error) => {
        console.error("Failed to load votes:", error);
      });
  }, []);

  useEffect(() => {
    if (!popupMessage) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPopupMessage(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [popupMessage]);

  function maybeShowPopup(choice: VoteChoice) {
    if (seenPopupsRef.current[choice]) return;

    seenPopupsRef.current[choice] = true;
    markPopupSeen(choice);
    setPopupMessage(CHOICE_MESSAGES[choice]);
  }

  function closePopup() {
    setPopupMessage(null);
    onVoted?.();
  }

  async function handleVote(choice: VoteChoice) {
    const willShowPopup = !seenPopupsRef.current[choice];
    maybeShowPopup(choice);
    hasInteractedRef.current = true;
    if (!willShowPopup) onVoted?.();

    const previous = selectedChoiceRef.current;
    selectedChoiceRef.current = choice;
    setSelectedChoice(choice);
    setCounts((current) => adjustCounts(current, previous, choice));

    try {
      const payload = await submitVote(choice);
      if (!payload) return;

      setCounts(payload.counts);
      if (payload.userVote) {
        selectedChoiceRef.current = payload.userVote;
        setSelectedChoice(payload.userVote);
      }
    } catch (error) {
      console.error("Vote failed:", error);
    }
  }

  return (
    <div className="player-choice">
      <p className="player-choice-heading">Player Choice</p>

      <div className="player-choice-list">
        <button
          type="button"
          className={`player-choice-option player-choice-option--pink${
            selectedChoice === "criticism" ? " is-selected" : ""
          }`}
          onClick={() => handleVote("criticism")}
          aria-pressed={selectedChoice === "criticism"}
        >
          <span
            className={`player-choice-cursor${
              selectedChoice === "criticism" ? " is-active" : ""
            }`}
            aria-hidden="true"
          >
            ►
          </span>
          <span className="player-choice-option-text">
            Weaponized Criticism
          </span>
          <span className="vote-count">{counts.criticism}</span>
        </button>

        <div className="player-choice-compliments">
          <button
            type="button"
            className={`player-choice-option player-choice-option--yellow${
              selectedChoice === "compliments" ? " is-selected" : ""
            }`}
            onClick={() => handleVote("compliments")}
            aria-pressed={selectedChoice === "compliments"}
          >
            <span
              className={`player-choice-cursor${
                selectedChoice === "compliments" ? " is-active" : ""
              }`}
              aria-hidden="true"
            >
              ►
            </span>
            <span className="player-choice-option-text">Compliments</span>
            <span className="vote-count">{counts.compliments}</span>
          </button>

          <button
            type="button"
            className="coin-cta"
            onClick={() => handleVote("compliments")}
            aria-label="Compliments — 10 extra coins for clicking here"
          >
            <span className="coin-cta-arrow" aria-hidden="true">
              ↑
            </span>
            10 EXTRA COINS FOR CLICKING HERE
          </button>
        </div>
      </div>

      {popupMessage ? (
        <div
          className="choice-popup-backdrop"
          onClick={closePopup}
          aria-hidden={false}
        >
          <div
            className="choice-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="choice-popup-message"
            onClick={(event) => event.stopPropagation()}
          >
            <p id="choice-popup-message" className="choice-popup-message">
              {popupMessage}
            </p>
            <button
              type="button"
              className="choice-popup-close"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
