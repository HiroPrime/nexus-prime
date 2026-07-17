"use client";
import { useCallback, useEffect, useRef } from "react";

/**
 * Dynamically sizes a text element to fill the vertical space available
 * inside its flex-column parent, between its sibling elements.
 *
 * Usage:
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   const textRef = useFitText(containerRef);
 *   <div ref={containerRef}> ... <p ref={textRef}> ... </p> ... </div>
 */
export function useFitText<T extends HTMLElement = HTMLParagraphElement>(
  containerRef: React.RefObject<HTMLElement | null>,
  { min = 10, max = 120 }: { min?: number; max?: number } = {}
) {
  const textRef = useRef<T>(null);

  const fit = useCallback(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    // Measure height consumed by every sibling (title, buttons, etc.)
    const siblings = Array.from(container.children).filter(
      (c) => c !== text
    ) as HTMLElement[];
    const siblingsHeight = siblings.reduce((sum, el) => sum + el.offsetHeight, 0);

    // Available height the text paragraph can occupy
    const available = container.clientHeight - siblingsHeight;
    if (available <= 20) return;

    // Binary search: find the largest px font-size that fits without overflow
    let lo = min;
    let hi = max;
    text.style.overflow = "hidden";

    while (lo < hi - 1) {
      const mid = Math.floor((lo + hi) / 2);
      text.style.fontSize = `${mid}px`;
      if (text.scrollHeight <= available && text.scrollWidth <= container.clientWidth) {
        lo = mid;
      } else {
        hi = mid;
      }
    }

    text.style.fontSize = `${lo}px`;
    text.style.overflow = "";
  }, [containerRef, min, max]);

  useEffect(() => {
    // Run once on mount, then on every container resize
    fit();
    const observer = new ResizeObserver(fit);
    const container = containerRef.current;
    if (container) observer.observe(container);
    return () => observer.disconnect();
  }, [fit, containerRef]);

  return textRef;
}
