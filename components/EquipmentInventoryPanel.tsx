"use client";

import Image from "next/image";
import { useState } from "react";
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

const GRID_SLOTS_DESKTOP = 16;
const GRID_SLOTS_MOBILE = 6;

function ItemDetailModal({
  item,
  onClose,
}: {
  item: Item;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65"
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[min(380px,92vw)] bg-[rgba(139,48,211,1)] border-2 border-black px-5 py-5 flex flex-col items-center gap-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="flex items-center justify-center w-[clamp(72px,18vw,96px)] h-[clamp(72px,18vw,96px)] bg-[rgba(139,48,211,1)] border-2 border-black">
          <Image
            src={item.icon}
            alt=""
            width={64}
            height={64}
            style={{
              imageRendering: "pixelated",
              width: "clamp(48px,12vw,72px)",
              height: "auto",
            }}
            unoptimized
          />
        </span>

        <p
          id="item-modal-title"
          className="type-label text-[clamp(0.42rem,2.5vw,0.55rem)] text-[#20ff00] uppercase leading-tight"
        >
          {item.name}
        </p>

        <p className="type-body text-[clamp(1rem,3.5vw,1.35rem)] max-lg:text-[clamp(1.15rem,3.8vw,1.45rem)] text-white/90 leading-[1.45]">
          {item.desc}
        </p>

        <button
          type="button"
          className="w-fit bg-[#20ff00] text-black font-pixel text-[clamp(0.4rem,2.5vw,0.55rem)] tracking-[0.08em] px-5 py-2.5 border-2 border-black transition-opacity hover:opacity-85 active:opacity-85"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function EquipmentInventoryPanel() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <>
      <div className="flex flex-row w-full flex-1 min-h-0 bg-[rgba(139,48,211,0.82)] border-2 border-black overflow-hidden max-lg:flex-col max-lg:overflow-y-auto">

        {/* ── LEFT: Equipment ── */}
        <div className="col-divider flex-[0_0_50%] flex flex-col min-h-0 px-[clamp(1.25rem,2.5vw,2rem)] pt-[clamp(1rem,2vh,1.5rem)] pb-[clamp(1rem,2vh,1.5rem)] max-lg:flex-none max-lg:max-h-[52vh] max-lg:row-divider max-lg:px-4 max-lg:pt-3 max-lg:pb-3">

          <h2 className="shrink-0 type-heading text-[clamp(2.4rem,5vw,3.8rem)] text-white mb-[clamp(0.75rem,1.5vh,1.25rem)]">
            <PlayfulText>Equipment</PlayfulText>
          </h2>

          <div className="flex-1 min-h-0 flex flex-col justify-evenly px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.35rem,0.8vh,0.6rem)] gap-[clamp(0.05rem,0.2vh,0.15rem)] overflow-y-auto">
            {EQUIPMENT.map((item) => (
              <div
                key={item.slot}
                className="flex items-center gap-[clamp(0.45rem,0.9vw,0.75rem)] min-w-0"
              >
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
                <span className="type-subtitle text-[clamp(1rem,1.9vw,1.65rem)] max-lg:text-[clamp(1.1rem,3.5vw,1.45rem)] text-[#20ff00] leading-[1.1] uppercase">
                  {item.name}
                </span>
                <span className="type-subtitle text-[clamp(0.85rem,1.5vw,1.25rem)] max-lg:text-[clamp(1rem,3.2vw,1.3rem)] text-[#fe9dfe] leading-[1.15]">
                    {item.stats}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Inventory ── */}
        <div className="flex-1 flex flex-col min-h-0 relative px-[clamp(1.25rem,2.5vw,2rem)] pt-[clamp(1rem,2vh,1.5rem)] pb-[clamp(1rem,2vh,1.5rem)] max-lg:flex-none max-lg:min-h-[36vh] max-lg:px-4 max-lg:pt-3 max-lg:pb-3">
          <h2 className="shrink-0 type-heading text-[clamp(2.4rem,5vw,3.8rem)] text-white mb-[clamp(0.75rem,1.5vh,1.25rem)]">
            <PlayfulText>Inventory</PlayfulText>
          </h2>

          <div className="flex-1 min-h-0 overflow-hidden">
            {/* Desktop — 4×4 */}
            <div className="hidden lg:grid grid-cols-4 grid-rows-4 h-full gap-0 border-l-2 border-t-2 border-black">
              {Array.from({ length: GRID_SLOTS_DESKTOP }).map((_, i) => {
                const item = ITEMS[i] ?? null;
                return (
                  <button
                    key={i}
                    type="button"
                    className={[
                      "border-r-2 border-b-2 border-black flex items-center justify-center min-h-0 transition-colors",
                      item
                        ? "bg-[rgba(139,48,211,1)] hover:bg-[rgba(160,60,255,1)] cursor-pointer"
                        : "bg-[rgba(139,48,211,0.25)] cursor-default",
                    ].join(" ")}
                    onClick={() => item && setSelectedItem(item)}
                    disabled={!item}
                    aria-label={item?.name ?? "Empty slot"}
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

            {/* Mobile / tablet — 2×3 */}
            <div className="lg:hidden grid grid-cols-2 grid-rows-3 h-full gap-0 border-l-2 border-t-2 border-black">
              {Array.from({ length: GRID_SLOTS_MOBILE }).map((_, i) => {
                const item = ITEMS[i] ?? null;
                return (
                  <button
                    key={i}
                    type="button"
                    className={[
                      "border-r-2 border-b-2 border-black flex items-center justify-center min-h-0 transition-colors",
                      item
                        ? "bg-[rgba(139,48,211,1)] active:bg-[rgba(160,60,255,1)] cursor-pointer"
                        : "bg-[rgba(139,48,211,0.25)] cursor-default",
                    ].join(" ")}
                    onClick={() => item && setSelectedItem(item)}
                    disabled={!item}
                    aria-label={item?.name ?? "Empty slot"}
                  >
                    {item && (
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={56}
                        height={56}
                        style={{
                          imageRendering: "pixelated",
                          width: "clamp(36px,12vw,56px)",
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
        </div>

      </div>

      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}
