import { Fragment } from "react";

const SOCIALS = [
  { name: "X",        href: "https://x.com/basic_hiro" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jacobclovell" },
] as const;

export function SocialMedia() {
  return (
    <section className="flex items-center" aria-label="Social media links">
      <div className="flex items-center gap-2">
        {SOCIALS.map((social, index) => (
          <Fragment key={social.name}>
            {index > 0 && (
              <span
                className="font-pixel text-white text-[clamp(0.5rem,0.85vw,0.65rem)] mx-[0.3rem]"
                aria-hidden="true"
              >
                |
              </span>
            )}
            <a
              href={social.href}
              className="font-pixel text-[clamp(0.5rem,0.85vw,0.65rem)] tracking-[0.1em] text-white no-underline uppercase"
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.name}
            </a>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
