"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Binary-searches the largest base font-size for a container whose children
 * use em-relative sizing so the whole block fits without overflow.
 */
export function useFitContainerFontSize(
  { min = 12, max = 48, deps = [] as unknown[] }: { min?: number; max?: number; deps?: unknown[] } = {}
) {
  const ref = useRef<HTMLDivElement>(null);

  const fit = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const availableH = el.clientHeight;
    const availableW = el.clientWidth;
    if (availableH <= 20 || availableW <= 20) return;

    let lo = min;
    let hi = max;

    // Reset before measuring so scrollHeight reflects the new content block.
    el.style.fontSize = `${min}px`;

    while (lo < hi - 1) {
      const mid = Math.floor((lo + hi) / 2);
      el.style.fontSize = `${mid}px`;
      if (el.scrollHeight <= availableH && el.scrollWidth <= availableW) {
        lo = mid;
      } else {
        hi = mid;
      }
    }

    el.style.fontSize = `${lo}px`;
  }, [min, max]);

  useEffect(() => {
    // Double rAF so layout is settled after quest content swaps (e.g. reward block).
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => fit());
    });
    const el = ref.current;
    if (!el) return () => cancelAnimationFrame(id);

    const observer = new ResizeObserver(() => fit());
    observer.observe(el);
    return () => {
      cancelAnimationFrame(id);
      observer.disconnect();
    };
    // Re-fit when content changes (e.g. selected quest)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fit, ...deps]);

  return ref;
}
