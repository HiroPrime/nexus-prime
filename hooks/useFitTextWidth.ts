"use client";

import { useCallback, useEffect, useRef } from "react";

type FitTextWidthOptions = {
  min?: number;
  max?: number;
  /** Full-width ancestor used to cap text size (e.g. column width). */
  containerRef?: React.RefObject<HTMLElement | null>;
};

/**
 * Scales an inline text element to the largest font-size that fits inside
 * a max-width container, accounting for a bordered/padded wrapper around the text.
 */
export function useFitTextWidth<T extends HTMLElement = HTMLSpanElement>({
  min = 8,
  max = 120,
  containerRef,
}: FitTextWidthOptions = {}) {
  const ref = useRef<T>(null);

  const fit = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const maxContainer = containerRef?.current ?? el.parentElement;
    const borderEl = containerRef ? el.parentElement : el.parentElement;
    if (!maxContainer || !borderEl) return;

    const borderStyle = getComputedStyle(borderEl);
    const padX =
      parseFloat(borderStyle.paddingLeft) + parseFloat(borderStyle.paddingRight);
    const borderX =
      parseFloat(borderStyle.borderLeftWidth) +
      parseFloat(borderStyle.borderRightWidth);
    const available = maxContainer.clientWidth - padX - borderX;
    if (available <= 10) return;

    let lo = min;
    let hi = max;
    el.style.whiteSpace = "nowrap";
    el.style.display = "inline-block";

    while (lo < hi - 1) {
      const mid = Math.floor((lo + hi) / 2);
      el.style.fontSize = `${mid}px`;
      if (el.scrollWidth <= available) {
        lo = mid;
      } else {
        hi = mid;
      }
    }

    el.style.fontSize = `${lo}px`;
  }, [min, max, containerRef]);

  useEffect(() => {
    fit();
    const el = ref.current;
    if (!el) return;
    const maxContainer = containerRef?.current ?? el.parentElement;
    if (!maxContainer) return;
    const observer = new ResizeObserver(fit);
    observer.observe(maxContainer);
    return () => observer.disconnect();
  }, [fit, containerRef]);

  return ref;
}
