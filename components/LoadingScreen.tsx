"use client";

import { useEffect, useRef, useState } from "react";

type LoadingScreenProps = { onComplete: () => void };

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const calledRef = useRef(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;

    function tick(now: number) {
      const p = Math.min(100, ((now - start) / duration) * 100);
      setProgress(p);
      if (p < 100) {
        requestAnimationFrame(tick);
      } else if (!calledRef.current) {
        calledRef.current = true;
        setTimeout(onComplete, 120);
      }
    }

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <section
      className="flex-1 flex flex-col items-center justify-center gap-5"
      aria-label="Loading"
      aria-live="polite"
    >
      <p className="font-pixel text-[clamp(0.5rem,1vw,0.65rem)] text-[#20ff00] tracking-[0.15em] animate-blink">
        Loading
      </p>

      <div
        className="w-[clamp(200px,50vw,380px)] h-[18px] bg-[rgba(60,0,100,0.8)] border-2 border-black"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div
          className="h-full bg-[#20ff00] loading-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}
