import Image from "next/image";
import type { IntroView } from "@/components/IntroSlide";

const NAV_ITEMS = [
  { view: "character" as IntroView, icon: "/pixel-icons/nav-campfire.png", label: "Character" },
  { view: "equipment"  as IntroView, icon: "/pixel-icons/nav-armor.png",   label: "Equipment" },
  { view: "abilities"  as IntroView, icon: "/pixel-icons/nav-star.png",    label: "Abilities" },
  { view: "questlog"   as IntroView, icon: "/pixel-icons/nav-gem.png",     label: "Quests" },
];

type IntroMenuProps = {
  activeView: IntroView;
  onSelect: (view: IntroView) => void;
  variant?: "header" | "tabbar";
};

export function IntroMenu({
  activeView,
  onSelect,
  variant = "header",
}: IntroMenuProps) {
  if (variant === "tabbar") {
    return (
      <nav
        className="flex w-full items-stretch border-t-2 border-b-2 border-black bg-[rgba(139,48,211,0.96)] backdrop-blur-sm"
        aria-label="Section menu"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.view;
          return (
            <button
              key={item.view}
              type="button"
              className={[
                "flex-1 flex items-center justify-center py-3 px-1 min-h-[3.25rem]",
                "border-r-2 border-black last:border-r-0 transition-colors",
                isActive
                  ? "bg-[rgba(139,48,211,1)]"
                  : "bg-[rgba(139,48,211,0.75)] active:bg-[rgba(139,48,211,1)]",
              ].join(" ")}
              onClick={() => onSelect(item.view)}
              aria-pressed={isActive}
              aria-label={item.label}
            >
              <Image
                src={item.icon}
                alt=""
                width={36}
                height={36}
                className="w-9 h-9"
                style={{ imageRendering: "pixelated" }}
                unoptimized
              />
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-[2px]" aria-label="Section menu">
      {NAV_ITEMS.map((item) => {
        const isActive = activeView === item.view;
        return (
          <button
            key={item.view}
            type="button"
            className={[
              "flex flex-col items-center justify-center p-[0.45rem_0.55rem] border-2 border-black transition-colors",
              isActive
                ? "bg-[rgba(139,48,211,1)]"
                : "bg-[rgba(139,48,211,0.75)] hover:bg-[rgba(139,48,211,1)]",
            ].join(" ")}
            onClick={() => onSelect(item.view)}
            aria-pressed={isActive}
            title={item.label}
            aria-label={item.label}
          >
            <Image
              src={item.icon}
              alt={item.label}
              width={48}
              height={48}
              style={{ imageRendering: "pixelated" }}
              unoptimized
            />
          </button>
        );
      })}
    </nav>
  );
}
