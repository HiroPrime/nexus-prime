"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Scales text to the largest font-size that fits inside a container's
 * inner width and height (accounting for padding).
 */
export function useFitTextBox(
  { min = 10, max = 96 }: { min?: number; max?: number } = {}
) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const fit = useCallback(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const style = getComputedStyle(container);
    const padX =
      parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const padY =
      parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const availableW = container.clientWidth - padX;
    const availableH = container.clientHeight - padY;
    if (availableW <= 10 || availableH <= 10) return;

    let lo = min;
    let hi = max;
    text.style.whiteSpace = "nowrap";
    text.style.lineHeight = "1";

    while (lo < hi - 1) {
      const mid = Math.floor((lo + hi) / 2);
      text.style.fontSize = `${mid}px`;
      if (text.scrollWidth <= availableW && text.scrollHeight <= availableH) {
        lo = mid;
      } else {
        hi = mid;
      }
    }

    text.style.fontSize = `${lo}px`;
  }, [min, max]);

  useEffect(() => {
    fit();
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, [fit]);

  return { containerRef, textRef };
}

/**
 * Finds one font-size so `measureText` fills a sample box; all items share it.
 */
export function useUniformFitFontSize(
  sampleBoxRef: React.RefObject<HTMLElement | null>,
  measureText: string,
  { min = 14, max = 72 }: { min?: number; max?: number } = {}
) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(min);

  const fit = useCallback(() => {
    const box = sampleBoxRef.current;
    const measure = measureRef.current;
    if (!box || !measure) return;

    const style = getComputedStyle(box);
    const padX =
      parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const padY =
      parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const availableW = box.clientWidth - padX;
    const availableH = box.clientHeight - padY;
    if (availableW <= 10 || availableH <= 10) return;

    measure.textContent = measureText;
    measure.style.whiteSpace = "nowrap";
    measure.style.lineHeight = "1";

    let lo = min;
    let hi = max;

    while (lo < hi - 1) {
      const mid = Math.floor((lo + hi) / 2);
      measure.style.fontSize = `${mid}px`;
      if (
        measure.scrollWidth <= availableW &&
        measure.scrollHeight <= availableH
      ) {
        lo = mid;
      } else {
        hi = mid;
      }
    }

    setFontSize(lo);
  }, [sampleBoxRef, measureText, min, max]);

  useEffect(() => {
    fit();
    const box = sampleBoxRef.current;
    if (!box) return;
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [fit, sampleBoxRef]);

  return { fontSize, measureRef };
}
