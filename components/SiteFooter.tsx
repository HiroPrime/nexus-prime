export function SiteFooter() {
  return (
    <footer className="footer-rule shrink-0 flex flex-col items-center justify-center gap-[0.35rem] px-4 pt-[0.5rem] pb-[max(0.55rem,env(safe-area-inset-bottom,0px))] relative z-10 bg-transparent">
      <p className="font-logo font-bold text-[clamp(0.65rem,2.8vw,1rem)] max-lg:text-[clamp(0.75rem,3.2vw,1rem)] tracking-[0.1em] text-white uppercase text-center">
        &copy; &#123;NEXUS | PRIME&#125; {new Date().getFullYear()}
      </p>
    </footer>
  );
}