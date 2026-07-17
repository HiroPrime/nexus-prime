import { PlayfulText } from "@/components/PlayfulText";

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

export function AbilitiesPanel() {
  return (
    <div className="flex flex-col w-full flex-1 min-h-0 bg-[rgba(139,48,211,0.82)] border-2 border-black overflow-hidden">

      <div className="shrink-0 flex items-center justify-center pt-6 pb-2">
        <h2 className="type-heading text-[clamp(2.4rem,5.5vw,4rem)] text-white text-center">
          <PlayfulText>Abilities</PlayfulText>
        </h2>
      </div>

      <div className="flex flex-1 min-h-0">
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

    </div>
  );
}
