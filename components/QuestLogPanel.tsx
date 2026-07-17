"use client";

import Image from "next/image";
import { forwardRef, Fragment, useMemo, useRef, useState } from "react";
import { PlayfulText } from "@/components/PlayfulText";
import { useFitContainerFontSize } from "@/hooks/useFitContainerFontSize";
import { useUniformFitFontSize } from "@/hooks/useFitTextBox";

type QuestCategory = "active" | "paused" | "complete";

type Quest = {
  id: string;
  type: string;
  category: QuestCategory;
  icon: string;
  name: string;
  objective: string;
  companion?: string;
  companionIcon?: string;
  companionUrl?: string;
  statusLabel: string;
  statusDetail: string;
  reward?: string;
  exploreUrl?: string;
};

const QUESTS: Quest[] = [
  {
    id: "prime-portal",
    type: "Main Quest",
    category: "active",
    icon: "/pixel-icons/nav-star.png",
    name: "Prime Portal",
    objective: "Liberate TCG data from the corporate big dogs and build the ultimate search engine and analytics dashboard.",
    companion: "Dex the Ghost",
    companionIcon: "/pixel-icons/dex-profile.png",
    companionUrl: "https://primeportal.nexus",
    statusLabel: "In Progress",
    statusDetail: "Search engine live; Dashboards under construction.",
    exploreUrl: "https://primeportal.nexus",
  },
  {
    id: "savepoint",
    type: "Main Quest",
    category: "active",
    icon: "/pixel-icons/nav-campfire.png",
    name: "SavePoint",
    objective: "Restore the lost magic of the ad-free, retro arcade.",
    statusLabel: "In Progress",
    statusDetail: "One game live, high scores active. Building user accounts next.",
    exploreUrl: "https://savepoint.nexus",
  },
  {
    id: "grim-fracture",
    type: "Side Quest",
    category: "paused",
    icon: "/pixel-icons/item-orb-purple.png",
    name: "Grimm Fracture",
    objective: "Generate a high-quality, AI-assisted graphic novel.",
    statusLabel: "Paused",
    statusDetail: "Awaiting Mana / Budget Regeneration.",
    exploreUrl: "https://grimmfracture.nexus",
  },
  {
    id: "nexus-prime",
    type: "Quest",
    category: "complete",
    icon: "/pixel-icons/nav-gem.png",
    name: "Nexus Prime HUB",
    objective: "Construct a central portfolio and launchpad to showcase the .nexus ecosystem and attract indie dev collaborations.",
    statusLabel: "Complete",
    statusDetail: "You are looking at it.",
    reward: "+1000 EXP, Digital Hub Unlocked",
  },
];

const CATEGORIES: { key: QuestCategory; label: string }[] = [
  { key: "active",   label: "Main Quests"      },
  { key: "paused",   label: "Side Quests"       },
  { key: "complete", label: "Completed Quests"  },
];

const STATUS_COLOR: Record<QuestCategory, string> = {
  active:   "text-[#20ff00]",
  paused:   "text-[#ffd700]",
  complete: "text-[#fe9dfe]",
};

const EXPLORE_BUTTON_CLASS =
  "w-fit shrink-0 mt-auto bg-[#20ff00] text-black font-pixel text-[clamp(0.4rem,0.9vh,0.55rem)] tracking-[0.08em] px-5 py-2.5 border-2 border-black transition-opacity hover:opacity-85 no-underline";

const OBJECTIVE_LABEL_CLASS =
  "type-label text-[0.56em] text-white/70 uppercase";

const OBJECTIVE_BODY_CLASS =
  "type-body text-[0.82em] text-white/90 leading-[1.35]";

const OBJECTIVE_SECTION_CLASS = "flex flex-col gap-[0.35em] shrink-0";

const QuestItemButton = forwardRef<
  HTMLButtonElement,
  {
    name: string;
    fontSize: number;
    isSelected: boolean;
    onSelect: () => void;
  }
>(function QuestItemButton({ name, fontSize, isSelected, onSelect }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={[
        "flex-[1_1_0] min-h-0 flex items-center w-full text-left",
        "px-4 py-2 border-2 border-black transition-colors overflow-hidden",
        isSelected
          ? "bg-[rgba(139,48,211,1)] text-[#20ff00]"
          : "bg-[rgba(139,48,211,0.25)] text-[#20ff00] hover:bg-[rgba(139,48,211,0.4)]",
      ].join(" ")}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      <span
        className="type-body block w-full leading-none whitespace-nowrap"
        style={{ fontSize: `${fontSize}px` }}
      >
        {name}
      </span>
    </button>
  );
});

export function QuestLogPanel() {
  const [selectedId, setSelectedId] = useState<string>(QUESTS[0].id);
  const selected = QUESTS.find((q) => q.id === selectedId)!;

  const sampleBoxRef = useRef<HTMLButtonElement>(null);
  const longestQuestName = useMemo(
    () => QUESTS.reduce((a, b) => (a.name.length >= b.name.length ? a : b)).name,
    []
  );
  const { fontSize, measureRef } = useUniformFitFontSize(
    sampleBoxRef,
    longestQuestName
  );

  const objectiveRef = useFitContainerFontSize({
    min: 12,
    max: 34,
    deps: [selectedId],
  });

  return (
    <div className="flex flex-row w-full flex-1 min-h-0 bg-[rgba(139,48,211,0.82)] border-2 border-black overflow-hidden">

      {/* ── LEFT: Quest list ── */}
      <div className="col-divider flex-[0_0_42%] flex flex-col min-h-0 min-w-0 overflow-hidden px-5 pb-5">
        <h2 className="type-heading text-[clamp(2.4rem,5vw,3.8rem)] text-white pt-5 pb-3 shrink-0">
          <PlayfulText>Quest Log</PlayfulText>
        </h2>

        <div className="relative flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
          {CATEGORIES.map(({ key, label }) => {
            const group = QUESTS.filter((q) => q.category === key);
            if (group.length === 0) return null;
            return (
              <Fragment key={key}>
                <p className="type-subtitle text-[clamp(0.9rem,1.6vw,1.3rem)] text-[#fe9dfe] uppercase shrink-0 leading-none">
                  {label}
                </p>

                {group.map((quest) => (
                  <QuestItemButton
                    key={quest.id}
                    ref={quest.id === QUESTS[0].id ? sampleBoxRef : undefined}
                    name={quest.name}
                    fontSize={fontSize}
                    isSelected={quest.id === selectedId}
                    onSelect={() => setSelectedId(quest.id)}
                  />
                ))}
              </Fragment>
            );
          })}

          {/* Hidden measurer — sized against longest quest name */}
          <span
            ref={measureRef}
            className="type-body invisible absolute pointer-events-none whitespace-nowrap leading-none"
            aria-hidden
          />
        </div>
      </div>

      {/* ── RIGHT: Objective detail ── */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden px-5 pb-5">
        <h2 className="type-heading text-[clamp(2.4rem,5vw,3.8rem)] text-white pt-5 pb-3 shrink-0">
          <PlayfulText>Objective</PlayfulText>
        </h2>

        {selected && (
          <div className="flex-1 min-h-0 overflow-hidden bg-[rgba(139,48,211,1)] border-2 border-black p-5">
            <div
              ref={objectiveRef}
              className="h-full min-h-0 flex flex-col gap-[1.35em] overflow-y-auto break-words"
            >
              <div className={OBJECTIVE_SECTION_CLASS}>
                <p className={OBJECTIVE_LABEL_CLASS}>
                  Objective
                </p>
                <p className={OBJECTIVE_BODY_CLASS}>
                  {selected.objective}
                </p>
              </div>

              {selected.companion && (
                <div className={OBJECTIVE_SECTION_CLASS}>
                  <p className={OBJECTIVE_LABEL_CLASS}>
                    Companion
                  </p>
                  <div className="flex items-center gap-3">
                    <p className={OBJECTIVE_BODY_CLASS}>
                      {selected.companion}
                    </p>
                    {selected.companionUrl && (
                      <a
                        href={selected.companionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Click to adventure"
                        className="shrink-0 flex items-center"
                      >
                        <Image
                          src={selected.companionIcon ?? "/pixel-icons/nav-ghost.png"}
                          alt={selected.companion}
                          width={1757}
                          height={265}
                          className="h-[1.1em] w-auto"
                          style={{
                            imageRendering: "pixelated",
                            height: "1.1em",
                            width: "auto",
                          }}
                          unoptimized
                        />
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className={OBJECTIVE_SECTION_CLASS}>
                <p className={OBJECTIVE_LABEL_CLASS}>
                  Status
                </p>
                <p className={OBJECTIVE_BODY_CLASS}>
                  <span className={`type-subtitle text-[1.05em] ${STATUS_COLOR[selected.category]}`}>
                    {selected.statusLabel}
                  </span>
                  {" "}— {selected.statusDetail}
                </p>
              </div>

              {selected.reward && (
                <div className={OBJECTIVE_SECTION_CLASS}>
                  <p className={OBJECTIVE_LABEL_CLASS}>
                    Reward Gained
                  </p>
                  <p className="type-body text-[0.82em] text-[#ffd700] leading-[1.35]">
                    {selected.reward}
                  </p>
                </div>
              )}

              {selected.exploreUrl && (
                <a
                  href={selected.exploreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={EXPLORE_BUTTON_CLASS}
                >
                  Explore the Quest
                </a>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
