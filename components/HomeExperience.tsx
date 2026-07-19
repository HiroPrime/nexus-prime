"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { IntroMenu } from "@/components/IntroMenu";
import { IntroSlide, type IntroView } from "@/components/IntroSlide";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Logo } from "@/components/Logo";
import { NexusAuthModal, NexusAuthTrigger } from "@/components/NexusAuthModal";
import { SiteFooter } from "@/components/SiteFooter";
import { SocialMedia } from "@/components/SocialMedia";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type Slide = "intro" | "loading" | "game";

export function HomeExperience() {
  const [mounted, setMounted] = useState(false);
  const [slide, setSlide] = useState<Slide>("intro");
  const [introView, setIntroView] = useState<IntroView>("character");
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

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
  const isGame = slide === "game";
  const authEnabled = isSupabaseConfigured();

  return (
    /* h-screen + overflow-hidden locks the layout to exactly one viewport — no scroll */
    <div className={`h-[100dvh] overflow-hidden flex flex-col relative bg-[#030308] ${bgClass}`}>
      {authEnabled && (
        <NexusAuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          user={user}
          onUserChange={setUser}
        />
      )}

      {/* ── Header ── */}
      <header className="shrink-0 grid grid-cols-[1fr_auto_1fr] items-center px-7 pt-3 pb-2 relative z-10 max-lg:grid-cols-[1fr_auto] max-lg:px-4 max-lg:pt-2 max-lg:pb-1.5">
        <Logo
          showTagline
          onClick={slide !== "intro" ? () => setSlide("intro") : undefined}
        />

        {/* Desktop nav — unchanged at lg+ */}
        <nav
          className="hidden lg:flex justify-center items-center"
          aria-label="Section menu"
        >
          {isGame && (
            <IntroMenu activeView={introView} onSelect={setIntroView} />
          )}
        </nav>

        <div className="flex items-center justify-end gap-3 max-lg:col-start-2">
          {authEnabled && (
            <NexusAuthTrigger user={user} onOpen={() => setAuthOpen(true)} />
          )}
          <SocialMedia />
        </div>
      </header>

      <main
        className={[
          "flex-1 flex flex-col min-h-0 relative z-[5] px-[4vw]",
          slide === "intro" ? "pt-[1rem] pb-[1rem]" : "pt-[clamp(1rem,3vh,2.5rem)] pb-[0.75rem]",
          slide === "intro"
            ? "max-lg:px-4 max-lg:pt-3 max-lg:pb-3"
            : "max-lg:px-3 max-lg:pt-2 max-lg:pb-2",
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

      {/* ── Mobile / tablet tab bar — lifted above footer ── */}
      {isGame && (
        <div className="lg:hidden shrink-0 z-20 mb-1">
          <IntroMenu
            variant="tabbar"
            activeView={introView}
            onSelect={setIntroView}
          />
        </div>
      )}

      {/* ── Footer — viewport bottom, background visible ── */}
      {(slide === "intro" || slide === "game") && <SiteFooter />}

    </div>
  );
}
