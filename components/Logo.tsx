type LogoProps = {
  showTagline?: boolean;
  onClick?: () => void;
};

export function Logo({ showTagline = true, onClick }: LogoProps) {
  return (
    <div
      className={[
        "flex flex-col gap-[0.15rem] select-none w-fit",
        onClick ? "cursor-pointer transition-opacity hover:opacity-80" : "",
      ].join(" ")}
      aria-label="Nexus Prime — home"
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      {/* {NEXUS | PRIME} */}
      <div className="flex items-baseline font-logo font-extrabold text-[clamp(1.1rem,2.5vw,1.7rem)] tracking-[0.03em] leading-none">
        <span className="text-white">&#123;</span>
        <span className="text-white font-black">NEXUS</span>
        <span className="text-white/55 px-[0.1em]"> | </span>
        <span className="text-white font-black">PRIME</span>
        <span className="text-white">&#125;</span>
      </div>

      {showTagline && (
        <p className="font-pixel text-[clamp(0.42rem,0.8vw,0.55rem)] tracking-[0.1em] text-[#fe9dfe] mt-[0.25rem] text-left">
          Development Portfolio
        </p>
      )}
    </div>
  );
}
