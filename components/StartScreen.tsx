"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import startScreenImage from "@/Images/StartScreen.png";

const START_MENU_ITEMS = [
  { id: "START", label: "START", disabled: false },
  { id: "CONTINUE", label: "CONTINUE", disabled: true },
  { id: "QUIT", label: "QUIT", disabled: false },
] as const;

type StartMenuItem = (typeof START_MENU_ITEMS)[number]["id"];

type StartScreenProps = {
  onStart: () => void;
};

export function StartScreen({ onStart }: StartScreenProps) {
  const [activeItem, setActiveItem] = useState<StartMenuItem>("START");
  const [quitTooltip, setQuitTooltip] = useState<{
    x: number;
    y: number;
  } | null>(null);

  function handleSelect(item: StartMenuItem) {
    if (item === "CONTINUE") return;

    setActiveItem(item);

    if (item === "START") {
      onStart();
    }
  }

  function handleQuitMove(event: MouseEvent<HTMLButtonElement>) {
    setQuitTooltip({ x: event.clientX, y: event.clientY });
  }

  return (
    <section className="start-screen" aria-label="Start screen">
      <div className="start-screen-frame">
        <Image
          src={startScreenImage}
          alt="Retro landscape start screen with BasicHiro overlooking a pixel-art world"
          className="start-screen-image"
          fill
          priority
          sizes="(max-width: 1100px) 100vw, 1100px"
        />

        <nav className="start-screen-menu" aria-label="Main menu">
          {START_MENU_ITEMS.map((item) => {
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`start-screen-item${
                  isActive ? " is-active" : ""
                }${item.disabled ? " is-disabled" : ""}`}
                onClick={() => handleSelect(item.id)}
                onMouseEnter={() => {
                  if (!item.disabled) {
                    setActiveItem(item.id);
                  }
                }}
                onMouseMove={
                  item.id === "QUIT" ? handleQuitMove : undefined
                }
                onMouseLeave={
                  item.id === "QUIT" ? () => setQuitTooltip(null) : undefined
                }
                disabled={item.disabled}
                aria-current={isActive ? "true" : undefined}
                aria-disabled={item.disabled || undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {quitTooltip ? (
        <div
          className="cursor-tooltip"
          style={{
            left: quitTooltip.x + 14,
            top: quitTooltip.y + 14,
          }}
          role="tooltip"
        >
          CLOSE BROWSER?
        </div>
      ) : null}
    </section>
  );
}
