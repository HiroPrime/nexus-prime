"use client";

import { PlayfulText } from "@/components/PlayfulText";
import { useFitContainerFontSize } from "@/hooks/useFitContainerFontSize";

const ABILITIES = [
  {
    name: "Domain Expansion: .nexus",
    type: "AoE",
    desc: "Summons an interconnected web of platforms—SavePoint, Prime Portal & CoreNode—sharing traffic, pooling resources, and amplifying reach of all active projects.",
  },
  {
    name: "Cursor Overdrive",
    type: "Active",
    desc: "Channels raw creative mana and AI synergy to prototype and deploy a fully playable retro web game or AAA landing page in a fraction of normal time.",
  },
] as const;

function MobileAbilityCell({
  ability,
  index,
}: {
  ability: (typeof ABILITIES)[number];
  index: number;
}) {
  const cellRef = useFitContainerFontSize({
    min: 14,
    max: 96,
    deps: [ability.name],
  });

  return (
    <div
      className={[
        index === 0 ? "max-lg:row-divider" : "",
        "relative flex-1 flex flex-col min-h-0 min-w-0",
      ].join(" ")}
    >
      <div
        ref={cellRef}
        className="h-full min-h-0 w-full flex flex-col items-center justify-evenly gap-[0.35em] px-[1.1em] py-[0.4em] text-center overflow-hidden"
      >
        <h3 className="type-subtitle text-[1.2em] text-[#20ff00] leading-tight uppercase">
          {ability.name}
        </h3>
        <span className="type-subtitle text-[0.95em] text-[#fe9dfe] leading-tight uppercase">
          [{ability.type}]
        </span>
        <p className="type-body text-[1em] text-white/90 leading-[1.35] max-w-[92%]">
          {ability.desc}
        </p>
      </div>
    </div>
  );
}

export function AbilitiesPanel() {
  return (
    <div className="flex flex-col w-full flex-1 min-h-0 bg-[rgba(139,48,211,0.82)] border-2 border-black overflow-hidden">

      <div className="shrink-0 flex items-center justify-center pt-6 pb-2 max-lg:pt-[clamp(0.5rem,1.5vh,1rem)] max-lg:pb-[clamp(0.2rem,0.6vh,0.4rem)]">
        <h2 className="type-heading text-[clamp(2.4rem,5.5vw,4rem)] text-white text-center max-lg:text-[clamp(2rem,4.5vw,3.5rem)]">
          <PlayfulText>Abilities</PlayfulText>
        </h2>
      </div>

      {/* Desktop — original clamp layout */}
      <div className="hidden lg:flex flex-1 min-h-0">
        {ABILITIES.map((ab, i) => (
          <div
            key={ab.name}
            className={[
              i === 0 ? "col-divider" : "",
              "relative flex-1 flex flex-col items-center justify-center gap-4 px-10 py-4 text-center",
            ].join(" ")}
          >
            <h3 className="type-subtitle text-[clamp(1.1rem,2vw,1.6rem)] text-[#20ff00] leading-tight uppercase">
              {ab.name}
            </h3>
            <span className="type-subtitle text-[clamp(1rem,1.8vw,1.4rem)] text-[#fe9dfe] leading-tight uppercase">
              [{ab.type}]
            </span>
            <p className="type-body text-[clamp(1.1rem,2vw,1.55rem)] text-white/90 leading-[1.6] max-w-[380px]">
              {ab.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile / tablet — fill container */}
      <div className="lg:hidden flex flex-1 min-h-0 flex-col overflow-hidden">
        {ABILITIES.map((ab, i) => (
          <MobileAbilityCell key={ab.name} ability={ab} index={i} />
        ))}
      </div>

    </div>
  );
}
