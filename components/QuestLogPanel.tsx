"use client";

import Image from "next/image";
import { forwardRef, Fragment, useEffect, useMemo, useRef, useState } from "react";
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

function QuestObjectiveDetails({ quest }: { quest: Quest }) {
  return (
    <>
      <div className={OBJECTIVE_SECTION_CLASS}>
        <p className={OBJECTIVE_LABEL_CLASS}>Objective</p>
        <p className={OBJECTIVE_BODY_CLASS}>{quest.objective}</p>
      </div>

      {quest.companion && (
        <div className={OBJECTIVE_SECTION_CLASS}>
          <p className={OBJECTIVE_LABEL_CLASS}>Companion</p>
          <div className="flex items-center gap-3">
            <p className={OBJECTIVE_BODY_CLASS}>{quest.companion}</p>
            {quest.companionUrl && (
              <a
                href={quest.companionUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Click to adventure"
                className="shrink-0 flex items-center"
              >
                <Image
                  src={quest.companionIcon ?? "/pixel-icons/nav-ghost.png"}
                  alt={quest.companion}
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
        <p className={OBJECTIVE_LABEL_CLASS}>Status</p>
        <p className={OBJECTIVE_BODY_CLASS}>
          <span className={`type-subtitle text-[1.05em] ${STATUS_COLOR[quest.category]}`}>
            {quest.statusLabel}
          </span>
          {" "}— {quest.statusDetail}
        </p>
      </div>

      {quest.reward && (
        <div className={OBJECTIVE_SECTION_CLASS}>
          <p className={OBJECTIVE_LABEL_CLASS}>Reward Gained</p>
          <p className="type-body text-[0.82em] text-[#ffd700] leading-[1.35]">
            {quest.reward}
          </p>
        </div>
      )}

      {quest.exploreUrl && (
        <button
          type="button"
          className={EXPLORE_BUTTON_CLASS}
          onClick={() => {
            void (async () => {
              try {
                await fetch("/api/track/quest", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ questId: quest.id }),
                });
              } catch {
                // best-effort
              }
              window.open(quest.exploreUrl, "_blank", "noopener,noreferrer");
            })();
          }}
        >
          Explore the Quest
        </button>
      )}
    </>
  );
}

const QuestItemButton = forwardRef<
  HTMLButtonElement,
  {
    name: string;
    fontSize: number;
    isSelected: boolean;
    isExpanded?: boolean;
    variant?: "list" | "accordion";
    onSelect: () => void;
  }
>(function QuestItemButton(
  { name, fontSize, isSelected, isExpanded, variant = "list", onSelect },
  ref
) {
  const isAccordion = variant === "accordion";

  return (
    <button
      ref={ref}
      type="button"
      className={[
        isAccordion
          ? "shrink-0 flex items-center w-full text-left px-4 py-2.5"
          : "flex-[1_1_0] min-h-0 flex items-center w-full text-left px-4 py-2",
        "border-2 border-black transition-colors overflow-hidden",
        isSelected
          ? "bg-[rgba(139,48,211,1)] text-[#20ff00]"
          : "bg-[rgba(139,48,211,0.25)] text-[#20ff00] hover:bg-[rgba(139,48,211,0.4)]",
        isAccordion && isExpanded ? "border-b-0" : "",
      ].join(" ")}
      onClick={onSelect}
      aria-pressed={isSelected}
      aria-expanded={isAccordion ? isExpanded : undefined}
    >
      <span
        className="type-body block flex-1 min-w-0 leading-none whitespace-nowrap"
        style={{ fontSize: `${fontSize}px` }}
      >
        {name}
      </span>
      {isAccordion && (
        <span
          className={[
            "shrink-0 ml-2 font-pixel text-[0.38rem] text-white/80 transition-transform duration-200",
            isExpanded ? "rotate-90" : "",
          ].join(" ")}
          aria-hidden
        >
          ▶
        </span>
      )}
    </button>
  );
});

export function QuestLogPanel() {
  const [selectedId, setSelectedId] = useState<string>(QUESTS[0].id);
  const [expandedId, setExpandedId] = useState<string | null>(QUESTS[0].id);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : true
  );

  const selected = QUESTS.find((q) => q.id === selectedId)!;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

  function toggleQuest(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="flex flex-row w-full flex-1 min-h-0 bg-[rgba(139,48,211,0.82)] border-2 border-black overflow-hidden">

      {isDesktop ? (
        <>
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
                  <p className="type-subtitle text-[clamp(0.9rem,1.6vw,1.3rem)] max-lg:text-[clamp(1.05rem,3.2vw,1.35rem)] text-[#fe9dfe] uppercase shrink-0 leading-none">
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

            <span
              ref={measureRef}
              className="type-body invisible absolute pointer-events-none whitespace-nowrap leading-none"
              aria-hidden
            />
          </div>
        </div>

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
                <QuestObjectiveDetails quest={selected} />
              </div>
            </div>
          )}
        </div>
        </>
      ) : (
        <div className="flex flex-col w-full flex-1 min-h-0 overflow-hidden px-4 pb-4">
        <h2 className="type-heading text-[clamp(2.4rem,5vw,3.8rem)] text-white pt-5 pb-3 shrink-0">
          <PlayfulText>Quest Log</PlayfulText>
        </h2>

        <div className="relative flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto">
          {CATEGORIES.map(({ key, label }) => {
            const group = QUESTS.filter((q) => q.category === key);
            if (group.length === 0) return null;
            return (
              <Fragment key={key}>
                <p className="type-subtitle text-[clamp(0.9rem,1.6vw,1.3rem)] max-lg:text-[clamp(1.05rem,3.2vw,1.35rem)] text-[#fe9dfe] uppercase shrink-0 leading-none">
                  {label}
                </p>

                {group.map((quest) => {
                  const isExpanded = quest.id === expandedId;
                  return (
                    <div key={quest.id} className="shrink-0 flex flex-col">
                      <QuestItemButton
                        ref={quest.id === QUESTS[0].id ? sampleBoxRef : undefined}
                        name={quest.name}
                        fontSize={fontSize}
                        isSelected={isExpanded}
                        isExpanded={isExpanded}
                        variant="accordion"
                        onSelect={() => toggleQuest(quest.id)}
                      />

                      {isExpanded && (
                        <div className="border-2 border-black border-t-0 bg-[rgba(139,48,211,1)] px-4 py-4 flex flex-col gap-[1.35em] break-words">
                          <QuestObjectiveDetails quest={quest} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </Fragment>
            );
          })}

          <span
            ref={measureRef}
            className="type-body invisible absolute pointer-events-none whitespace-nowrap leading-none"
            aria-hidden
          />
        </div>
        </div>
      )}

    </div>
  );
}
