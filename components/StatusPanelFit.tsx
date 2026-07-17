"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type StatusPanelFitProps = {
  children: ReactNode;
};

export function StatusPanelFit({ children }: StatusPanelFitProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const shell = shellRef.current;
    const content = contentRef.current;
    if (!shell || !content) return;

    const update = () => {
      const slide = shell.closest(".intro-slide--status");
      if (!slide) {
        setScale(1);
        return;
      }

      const available = slide.clientHeight - 12;
      const natural = content.scrollHeight;
      if (available <= 0 || natural <= 0) return;

      const next = Math.min(1, available / natural);
      setScale(Math.max(0.55, next));
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(shell);
    observer.observe(content);

    const slide = shell.closest(".intro-slide");
    if (slide) {
      observer.observe(slide);
    }

    const mutationObserver = slide
      ? new MutationObserver(update)
      : null;
    if (slide && mutationObserver) {
      mutationObserver.observe(slide, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => {
      observer.disconnect();
      mutationObserver?.disconnect();
    };
  }, []);

  return (
    <div ref={shellRef} className="status-panel-fit">
      <div
        ref={contentRef}
        className="status-panel-fit-inner"
        style={{ zoom: scale }}
      >
        {children}
      </div>
    </div>
  );
}
