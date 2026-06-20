"use client";

import { useEffect } from "react";
import { ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Recomputes ScrollTrigger positions after the page settles. The display fonts
 * (Saira Condensed etc.) load after mount and reflow tall headlines, which
 * leaves trigger start/end pixels stale — so scroll-in reveals can get stuck in
 * their hidden state. Refreshing on rAF, on `load`, and after `fonts.ready`
 * fixes the cached positions. Renders nothing.
 */
export default function ScrollRefresh() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const refresh = () => ScrollTrigger.refresh();

    const id = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}
