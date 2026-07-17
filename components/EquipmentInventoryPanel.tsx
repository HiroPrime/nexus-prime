"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { PlayfulText } from "@/components/PlayfulText";

const EQUIPMENT = [
  { slot: "Head",      icon: "/pixel-icons/eq-headphones.png", name: "Noise-Canceling Headphones", stats: "+20 Focus · IMMUNE: Background Distraction" },
  { slot: "Weapon",    icon: "/pixel-icons/eq-keyboard.png",   name: "Mechanical Keyboards",       stats: "+15 DPS · +5 Sonic Damage (Click-Clack)"  },
  { slot: "Armor",     icon: "/pixel-icons/eq-monitor.png",    name: "Dark Mode IDE Theme",         stats: "+50 Eye Strain Resist · +10 Aesthetics"   },
  { slot: "Accessory", icon: "/pixel-icons/eq-drink.png",      name: "Endless Energy Drinks",       stats: "+100 Haste · −5 Jitters"                  },
] as const;

type Item = { id: string; icon: string; name: string; desc: string };

const ITEMS: Item[] = [
  { id: "scroll",  icon: "/pixel-icons/item-scroll.png",     name: "Scroll of Reactivity", desc: "A legendary parchment that allows the user to re-render reality without ever refreshing the instance." },
  { id: "flask",   icon: "/pixel-icons/item-flask.png",      name: "Flask of the Tailwind", desc: "A concentrated utility potion that grants instant styling to any equipped gear. Cures the 'Bloated CSS' status ailment." },
  { id: "compass", icon: "/pixel-icons/item-orb-blue.png",   name: "The Cursor Compass",   desc: "An AI-infused artifact that reveals hidden pathways within the codebase and auto-completes the journey forward." },
  { id: "crystal", icon: "/pixel-icons/item-orb-purple.png", name: "CoreNode Crystal",     desc: "A high-density energy source that powers the entire .nexus realm, keeping servers alive, data secure, and latency low." },
  { id: "satchel", icon: "/pixel-icons/item-bag.png",         name: "Sprite-Sheet Satchel", desc: "An extra-dimensional bag holding infinite high-res assets, AI-generated panels, and pixel art." },
];

const GRID_SLOTS = 16;

type TooltipState = { item: Item; top: number; left: number } | null;

export function EquipmentInventoryPanel() {
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  function setTooltipAtCursor(item: Item, e: React.MouseEvent<HTMLButtonElement>) {
    const panel = rightRef.current;
    if (!panel) return;
    const pr = panel.getBoundingClientRect();
    setTooltip({
      item,
      top: e.clientY - pr.top,
      left: e.clientX - pr.left,
    });
  }

  return (
    <div className="flex flex-row w-full flex-1 min-h-0 bg-[rgba(139,48,211,0.82)] border-2 border-black overflow-hidden">

      {/* ── LEFT: Equipment ── */}
      <div className="col-divider flex-[0_0_50%] flex flex-col min-h-0 px-[clamp(1.25rem,2.5vw,2rem)] pt-[clamp(1rem,2vh,1.5rem)] pb-[clamp(1rem,2vh,1.5rem)]">

        <h2 className="shrink-0 type-heading text-[clamp(2.4rem,5vw,3.8rem)] text-white mb-[clamp(0.75rem,1.5vh,1.25rem)]">
          <PlayfulText>Equipment</PlayfulText>
        </h2>

        {/* Equipment list */}
        <div className="flex-1 min-h-0 flex flex-col justify-evenly px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.35rem,0.8vh,0.6rem)] gap-[clamp(0.05rem,0.2vh,0.15rem)] overflow-y-auto">
          {EQUIPMENT.map((item) => (
            <div
              key={item.slot}
              className="flex items-center gap-[clamp(0.45rem,0.9vw,0.75rem)] min-w-0"
            >
              {/* Icon — 100% opacity purple box */}
              <span className="shrink-0 flex items-center justify-center w-[clamp(76px,9vw,104px)] h-[clamp(76px,9vw,104px)] bg-[rgba(139,48,211,1)] border-2 border-black">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={80}
                  height={80}
                  style={{
                    imageRendering: "pixelated",
                    width: "clamp(56px,7vw,84px)",
                    height: "auto",
                  }}
                  unoptimized
                />
              </span>

              <div className="flex flex-col gap-0 min-w-0 flex-1">
                <span className="type-subtitle text-[clamp(1rem,1.9vw,1.65rem)] text-[#20ff00] leading-[1.1] uppercase">
                  {item.name}
                </span>
                <span className="type-subtitle text-[clamp(0.85rem,1.5vw,1.25rem)] text-[#fe9dfe] leading-[1.15]">
                  {item.stats}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Inventory ── */}
      <div
        ref={rightRef}
        className="flex-1 flex flex-col min-h-0 relative px-[clamp(1.25rem,2.5vw,2rem)] pt-[clamp(1rem,2vh,1.5rem)] pb-[clamp(1rem,2vh,1.5rem)]"
      >
        <h2 className="shrink-0 type-heading text-[clamp(2.4rem,5vw,3.8rem)] text-white mb-[clamp(0.75rem,1.5vh,1.25rem)]">
          <PlayfulText>Inventory</PlayfulText>
        </h2>

        {/* 4×4 grid — flush cells, 2pt black dividers */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <div className="grid grid-cols-4 grid-rows-4 h-full gap-0 border-l-2 border-t-2 border-black">
            {Array.from({ length: GRID_SLOTS }).map((_, i) => {
              const item = ITEMS[i] ?? null;
              return (
                <button
                  key={i}
                  className={[
                    "border-r-2 border-b-2 border-black flex items-center justify-center min-h-0 transition-colors",
                    item
                      ? "bg-[rgba(139,48,211,1)] hover:bg-[rgba(160,60,255,1)] cursor-pointer"
                      : "bg-[rgba(139,48,211,0.25)] cursor-default",
                  ].join(" ")}
                  onMouseEnter={item ? (e) => setTooltipAtCursor(item, e) : undefined}
                  onMouseMove={item ? (e) => setTooltipAtCursor(item, e) : undefined}
                  onMouseLeave={() => setTooltip(null)}
                  disabled={!item}
                  aria-label={item?.name ?? "Empty slot"}
                  title=""
                >
                  {item && (
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={40}
                      height={40}
                      style={{
                        imageRendering: "pixelated",
                        width: "clamp(22px,3vw,44px)",
                        height: "auto",
                      }}
                      unoptimized
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {tooltip && (
          <div
            className="absolute z-50 w-[210px] bg-[rgba(139,48,211,0.85)] border-2 border-black px-3 py-2 pointer-events-none"
            style={{ top: tooltip.top, left: tooltip.left }}
          >
            <p className="type-label text-[clamp(0.38rem,0.75vw,0.52rem)] text-[#20ff00] leading-tight mb-1 uppercase">
              {tooltip.item.name}
            </p>
            <p className="type-body text-[clamp(1rem,1.8vw,1.35rem)] text-white/90 leading-[1.4]">
              {tooltip.item.desc}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
