"use client";

import { Fragment } from "react";

const SOCIALS = [
  { name: "X", link: "x" as const, href: "https://x.com/basic_hiro" },
  { name: "LinkedIn", link: "linkedin" as const, href: "https://www.linkedin.com/in/jacobclovell" },
] as const;

async function trackThenOpen(link: "linkedin" | "x", href: string) {
  try {
    await fetch("/api/track/social", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ link }),
    });
  } catch {
    // best-effort
  }
  window.open(href, "_blank", "noopener,noreferrer");
}

export function SocialMedia() {
  return (
    <section className="flex items-center" aria-label="Social media links">
      <div className="flex items-center gap-2">
        {SOCIALS.map((social, index) => (
          <Fragment key={social.name}>
            {index > 0 && (
              <span
                className="font-pixel text-white text-[clamp(0.5rem,0.85vw,0.65rem)] max-lg:text-[clamp(0.55rem,3.2vw,0.78rem)] mx-[0.3rem]"
                aria-hidden="true"
              >
                |
              </span>
            )}
            <button
              type="button"
              onClick={() => void trackThenOpen(social.link, social.href)}
              className="font-pixel text-[clamp(0.5rem,0.85vw,0.65rem)] max-lg:text-[clamp(0.55rem,3.2vw,0.78rem)] tracking-[0.1em] text-white uppercase bg-transparent border-0 cursor-pointer p-0"
            >
              {social.name}
            </button>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
