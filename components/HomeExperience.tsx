"use client";

import { useEffect, useState } from "react";
import { IntroMenu } from "@/components/IntroMenu";
import { IntroSlide, type IntroView } from "@/components/IntroSlide";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Logo } from "@/components/Logo";
import { SocialMedia } from "@/components/SocialMedia";

type Slide = "intro" | "loading" | "game";

export function HomeExperience() {
  const [mounted, setMounted] = useState(false);
  const [slide, setSlide] = useState<Slide>("intro");
  const [introView, setIntroView] = useState<IntroView>("character");

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030308]">
        <p className="font-pixel text-[0.5rem] text-[#20ff00] tracking-[0.15em] animate-blink">
          Booting
        </p>
      </div>
    );
  }

  const bgClass = slide === "intro" ? "bg-intro" : "bg-inner";

  return (
    /* h-screen + overflow-hidden locks the layout to exactly one viewport — no scroll */
    <div className={`h-screen overflow-hidden flex flex-col relative bg-[#030308] ${bgClass}`}>

      {/* ── Header ── */}
      <header className="shrink-0 grid grid-cols-[1fr_auto_1fr] items-center px-7 pt-3 pb-2 relative z-10">
        <Logo
          showTagline
          onClick={slide !== "intro" ? () => setSlide("intro") : undefined}
        />

        <nav className="flex justify-center items-center" aria-label="Section menu">
          {slide === "game" && (
            <IntroMenu activeView={introView} onSelect={setIntroView} />
          )}
        </nav>

        <div className="flex items-center justify-end">
          <SocialMedia />
        </div>
      </header>

      {/* Less vertical padding on intro — hero text needs the room */}
      <main
        className={[
          "flex-1 flex flex-col min-h-0 relative z-[5] px-[4vw]",
          slide === "intro" ? "pt-[1rem] pb-[1rem]" : "pt-[5rem] pb-[5rem]",
        ].join(" ")}
      >

        {slide === "intro" && (
          <IntroSlide view="intro" onEnter={() => setSlide("loading")} />
        )}

        {slide === "loading" && (
          <LoadingScreen
            onComplete={() => {
              setIntroView("character");
              setSlide("game");
            }}
          />
        )}

        {slide === "game" && (
          <IntroSlide view={introView} />
        )}

      </main>

      {/* ── Footer ── */}
      <footer className="footer-rule shrink-0 flex flex-col items-center justify-center gap-[0.6rem] px-6 pt-[0.85rem] pb-[1rem] relative z-10">
        <p className="font-logo font-bold text-[clamp(0.75rem,1.4vw,1rem)] tracking-[0.1em] text-white uppercase">
          &copy; &#123;NEXUS | PRIME&#125; {new Date().getFullYear()}
        </p>
      </footer>

    </div>
  );
}
