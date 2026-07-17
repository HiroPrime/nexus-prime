"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { PlayfulText } from "@/components/PlayfulText";
import { useFitTextWidth } from "@/hooks/useFitTextWidth";

const BASE_STATS = [
  { label: "Bandwidth",       value: "999" },
  { label: "Creative Vision", value: "255" },
  { label: "Execution",       value: "99"  },
  { label: "Agile Dev",       value: "60"  },
  { label: "Bug Resistance",  value: "404" },
] as const;

const RESISTANCES = [
  { label: "Scope Creep",        value: "99%"   },
  { label: "Shiny Object",       value: "40%"   },
  { label: "Tutorial Paralysis", value: "IMMUNE", immune: true },
] as const;

const BIO =
  "I'm the creator and solo dev behind the .nexus ecosystem. When I'm not building ad-free retro arcades at SavePoint or extracting raw TCG data for Prime Portal, I'm crafting high-converting, flat-rate landing pages for indie studios. I build fast, I leverage AI, and I skip the corporate BS to just make cool stuff.";

export function CharacterPanel() {
  const [loveCount, setLoveCount] = useState(12);
  const [hateCount, setHateCount] = useState(3);
  const [voted, setVoted] = useState<"love" | "hate" | null>(null);

  const lvlContainerRef = useRef<HTMLDivElement>(null);
  const lvlRef = useFitTextWidth<HTMLSpanElement>({
    min: 10,
    max: 96,
    containerRef: lvlContainerRef,
  });

  function handleVote(type: "love" | "hate") {
    if (voted) return;
    setVoted(type);
    if (type === "love") setLoveCount((c) => c + 1);
    else setHateCount((c) => c + 1);
  }

  return (
    <div className="flex flex-row items-stretch w-full flex-1 min-h-0 bg-[rgba(139,48,211,0.82)] border-2 border-black overflow-hidden">

      {/* ── COL 1: LVL badge + Portrait ── */}
      <div className="flex-[0_0_20%] flex flex-col items-center justify-start px-[1.6rem] py-[1.4rem] min-h-0 overflow-hidden">
        <div ref={lvlContainerRef} className="shrink-0 w-full min-w-0">
          <div className="mx-auto w-fit max-w-full border-2 border-black px-[1rem] py-[0.15rem]">
            <span
              ref={lvlRef}
              className="type-heading text-white leading-[1.1] inline-block whitespace-nowrap"
            >
              LVL <span className="text-[#20ff00]">1337</span>
            </span>
          </div>
        </div>

        <div className="relative flex-1 min-h-0 w-full mt-[0.6rem] border-2 border-black overflow-hidden">
          <Image
            src="/pixel-icons/avatar-portrait-2.png"
            alt="BasicHiro pixel portrait"
            fill
            style={{
              imageRendering: "pixelated",
              objectFit: "cover",
              objectPosition: "top center",
              transform: "scale(1.6)",
              transformOrigin: "top center",
            }}
            unoptimized
            priority
          />
        </div>
      </div>

      {/* ── COL 2: Name → Alias → Stats → Resistances ── */}
      <div className="col-divider flex-1 flex flex-col gap-[0.35rem] px-[1.2rem] py-[1rem] min-w-0 min-h-0 overflow-hidden break-words">

        <h2 className="shrink-0 type-heading text-[clamp(2.4rem,5.5vw,4.5rem)] text-white leading-none w-full">
          <PlayfulText>BasicHiro</PlayfulText>
        </h2>
        <p className="shrink-0 type-subtitle text-[clamp(1.19rem,2vw,1.6rem)] text-[#fe9dfe] uppercase leading-none -mt-3">
          Jacob Lovell
        </p>

        <h3 className="shrink-0 type-heading text-[clamp(1.2rem,2.2vw,1.85rem)] text-white mt-[0.3rem]">
          <PlayfulText>Stats</PlayfulText>
        </h3>
        <dl className="flex flex-col shrink-0">
          {BASE_STATS.map((s) => (
            <div key={s.label} className="stat-row flex justify-between items-center type-body text-[clamp(1rem,1.8vw,1.4rem)] py-[0.1rem]">
              <dt className="text-white/85">{s.label}</dt>
              <dd className="text-[#ffd700] type-subtitle text-[clamp(0.85rem,1.5vw,1.2rem)]">{s.value}</dd>
            </div>
          ))}
        </dl>

        <h3 className="shrink-0 type-heading text-[clamp(1.2rem,2.2vw,1.85rem)] text-white mt-[0.3rem]">
          <PlayfulText>Resistances</PlayfulText>
        </h3>
        <dl className="flex flex-col shrink-0">
          {RESISTANCES.map((r) => (
            <div key={r.label} className="stat-row flex justify-between items-center type-body text-[clamp(1rem,1.8vw,1.4rem)] py-[0.1rem]">
              <dt className="text-white/85">{r.label}</dt>
              <dd className={
                "immune" in r && r.immune
                  ? "text-[#ffd700] type-subtitle text-[clamp(0.7rem,1.2vw,0.9rem)] uppercase"
                  : "text-[#ffd700] type-subtitle text-[clamp(0.85rem,1.5vw,1.2rem)]"
              }>
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── COL 3: Biography + LOVE / HATE MAIL ── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden break-words px-[2rem] py-[1rem]">

        <h3 className="shrink-0 type-heading text-[clamp(1.8rem,3.2vw,2.8rem)] text-white text-center mt-[48px]">
          <PlayfulText>Biography</PlayfulText>
        </h3>

        <div className="flex-1 min-h-0 flex items-center overflow-hidden">
          <p className="type-body text-[clamp(1.1rem,2vw,1.55rem)] text-white/90 leading-[1.6] text-center">
            {BIO}
          </p>
        </div>

        <div className="shrink-0 flex gap-[0.5rem] w-full">
          <button
            className={[
              "relative flex-1 flex items-center justify-center py-[0.75rem] px-[1rem]",
              "font-pixel text-[clamp(0.45rem,0.95vw,0.6rem)] tracking-[0.08em]",
              "border-2 border-white bg-[rgba(254,157,254,0.9)] text-white transition-opacity",
              voted === "love" ? "opacity-70" : "",
            ].join(" ")}
            onClick={() => handleVote("love")}
            disabled={voted !== null}
            aria-label="Send love"
          >
            LOVE
            <span className="absolute -top-[6px] -right-[6px] flex items-center justify-center w-4 h-4 font-pixel text-[0.35rem] bg-[#1a1a1a] text-white border-2 border-white rounded-full z-[2]">
              {loveCount}
            </span>
          </button>

          <button
            className={[
              "relative flex-1 flex items-center justify-center py-[0.75rem] px-[1rem]",
              "font-pixel text-[clamp(0.45rem,0.95vw,0.6rem)] tracking-[0.08em]",
              "border-2 border-black bg-[rgba(237,41,41,0.9)] text-white transition-opacity",
              voted === "hate" ? "opacity-70" : "",
            ].join(" ")}
            onClick={() => handleVote("hate")}
            disabled={voted !== null}
            aria-label="Send hate mail"
          >
            HATE MAIL
            <span className="absolute -top-[6px] -right-[6px] flex items-center justify-center w-4 h-4 font-pixel text-[0.35rem] bg-[#1a1a1a] text-white border-2 border-white rounded-full z-[2]">
              {hateCount}
            </span>
          </button>
        </div>

        {voted && (
          <p className="shrink-0 font-pixel text-[0.4rem] text-[#20ff00] tracking-[0.08em] mt-[0.3rem]">
            {voted === "love" ? "Thanks! You're awesome. ▶" : "Fair enough. ▶"}
          </p>
        )}
      </div>

    </div>
  );
}
