"use client";

import { useState } from "react";
import { PixelIcon } from "@/components/PixelIcon";

type Item = {
  id: string;
  icon: string; // PixelIcon name
  name: string;
  tag: string;
  type: string;
  desc: string;
};

const ITEMS: Item[] = [
  {
    id: "scroll-reactivity",
    icon: "scroll",
    name: "Scroll of Reactivity",
    tag: "React",
    type: "Key Item",
    desc: "A legendary parchment that allows the user to re-render reality without ever refreshing the instance.",
  },
  {
    id: "flask-tailwind",
    icon: "flask",
    name: "Flask of the Tailwind",
    tag: "Tailwind CSS",
    type: "Consumable",
    desc: "A concentrated utility potion that grants instant styling to any equipped gear. Cures the \"Bloated CSS\" status ailment.",
  },
  {
    id: "cursor-compass",
    icon: "compass",
    name: "The Cursor Compass",
    tag: "Cursor AI",
    type: "Artifact",
    desc: "An AI-infused artifact that reveals hidden pathways within the codebase and auto-completes the journey forward.",
  },
  {
    id: "corenode-crystal",
    icon: "crystal",
    name: "CoreNode Crystal",
    tag: "Backend / Hosting",
    type: "Key Item",
    desc: "A high-density energy source that powers the entire .nexus realm, keeping servers alive, data secure, and latency low.",
  },
  {
    id: "sprite-satchel",
    icon: "bag",
    name: "Sprite-Sheet Satchel",
    tag: "Design / Assets",
    type: "Equipment",
    desc: "An extra-dimensional bag holding infinite high-res assets, AI-generated panels, and pixel art.",
  },
];

const COLS = 4;
const ROWS = 5;
const TOTAL_SLOTS = COLS * ROWS;

export function InventoryPanel() {
  const [selectedId, setSelectedId] = useState<string | null>(ITEMS[0].id);

  const selectedItem = ITEMS.find((i) => i.id === selectedId) ?? null;

  function handleSlotClick(slotIdx: number) {
    const item = ITEMS[slotIdx];
    if (!item) return;
    setSelectedId(item.id === selectedId ? null : item.id);
  }

  return (
    <div className="inv-panel">
      {/* ── LEFT: grid ── */}
      <div className="inv-left">
        <p className="char-section-label">INVENTORY</p>
        <div className="char-box inv-grid-box">
          <div className="inv-grid">
            {Array.from({ length: TOTAL_SLOTS }).map((_, idx) => {
              const item = ITEMS[idx];
              const isSelected = item ? item.id === selectedId : false;

              return (
                <button
                  key={idx}
                  type="button"
                  className={[
                    "inv-slot",
                    item ? "inv-slot--filled" : "inv-slot--empty",
                    isSelected ? "inv-slot--selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handleSlotClick(idx)}
                  aria-label={item ? item.name : "Empty slot"}
                  aria-pressed={isSelected}
                  disabled={!item}
                >
                  {item ? (
                    <span className="inv-slot-icon" aria-hidden="true">
                      <PixelIcon name={item.icon} size={28} />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── RIGHT: detail ── */}
      <div className="inv-right">
        <p className="char-section-label">ITEM INFO</p>
        <div className="char-box inv-detail-box">
          {selectedItem ? (
            <div className="inv-detail">
              <div className="inv-detail-icon" aria-hidden="true">
                <PixelIcon name={selectedItem.icon} size={48} />
              </div>
              <div className="inv-detail-header">
                <span className="inv-detail-type">{selectedItem.type}</span>
                <h2 className="inv-detail-name">{selectedItem.name}</h2>
              </div>
              <p className="inv-detail-desc">{selectedItem.desc}</p>
              <div className="inv-detail-tag-wrap">
                <span className="inv-detail-tag">{selectedItem.tag}</span>
              </div>
            </div>
          ) : (
            <div className="inv-empty-state">
              <span className="inv-empty-cursor">▮</span>
              <p>SELECT AN ITEM</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
