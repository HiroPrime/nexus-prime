import { CharacterPanel } from "@/components/CharacterPanel";
import { EquipmentInventoryPanel } from "@/components/EquipmentInventoryPanel";
import { AbilitiesPanel } from "@/components/AbilitiesPanel";
import { QuestLogPanel } from "@/components/QuestLogPanel";
import { PlayfulText } from "@/components/PlayfulText";

export type IntroView =
  | "intro"
  | "character"
  | "equipment"
  | "abilities"
  | "questlog";

type IntroSlideProps = {
  view: IntroView;
  onEnter?: () => void;
};

export function IntroSlide({ view, onEnter }: IntroSlideProps) {
  if (view === "character") {
    return (
      <section
        className="flex-1 flex w-full min-h-0 overflow-hidden max-lg:overflow-y-auto animate-slide-enter"
        aria-label="Character screen"
      >
        <CharacterPanel />
      </section>
    );
  }

  if (view === "equipment") {
    return (
      <section
        className="flex-1 flex w-full min-h-0 overflow-hidden max-lg:overflow-y-auto animate-slide-enter"
        aria-label="Equipment and Inventory"
      >
        <EquipmentInventoryPanel />
      </section>
    );
  }

  if (view === "abilities") {
    return (
      <section
        className="flex-1 flex w-full min-h-0 overflow-hidden max-lg:overflow-y-auto animate-slide-enter"
        aria-label="Abilities"
      >
        <AbilitiesPanel />
      </section>
    );
  }

  if (view === "questlog") {
    return (
      <section
        className="flex-1 flex w-full min-h-0 overflow-hidden max-lg:overflow-y-auto animate-slide-enter"
        aria-label="Quest log"
      >
        <QuestLogPanel />
      </section>
    );
  }

  return (
    <section
      className="flex-1 flex items-center justify-start w-full min-h-0 overflow-visible max-lg:items-center max-lg:justify-center max-lg:px-2"
      aria-label="Welcome"
    >
      <div className="flex flex-col gap-[clamp(0.6rem,1.8vh,1.1rem)] max-w-[min(480px,90vw)] w-full overflow-visible py-[clamp(0.25rem,1vh,0.75rem)] max-lg:max-w-full max-lg:items-center max-lg:text-center">
        <h1 className="type-heading text-[clamp(1.4rem,4.5vh,3.5rem)] leading-[1.5] text-white overflow-visible [text-shadow:3px_3px_0_rgba(0,0,0,0.7)]">
          <span className="block">
            <PlayfulText>IMAGINE WHAT</PlayfulText>
          </span>
          <span className="block">
            <PlayfulText>WE COULD</PlayfulText>
          </span>
          <span className="block">
            <PlayfulText className="text-[#fe9dfe]">CREATE</PlayfulText>
          </span>
        </h1>

        <div className="bg-[rgba(80,0,130,0.82)] border-2 border-black px-[1.2rem] py-[0.75rem] type-body text-[clamp(1rem,2vh,1.35rem)] max-lg:text-[clamp(1.15rem,3.8vw,1.45rem)] leading-[1.5] text-white/90 w-fit">
          <p>
            Hi, I&apos;m <span className="text-[#20ff00]">BasicHiro</span>
          </p>
          <p>and this is my portfolio.</p>
        </div>

        <button
          className="w-fit max-lg:mx-auto bg-[#20ff00] text-black font-pixel text-[clamp(0.4rem,0.9vh,0.55rem)] tracking-[0.08em] px-5 py-2.5 border-2 border-black transition-opacity hover:opacity-85 active:opacity-85"
          type="button"
          onClick={onEnter}
        >
          Explore My World
        </button>
      </div>
    </section>
  );
}
