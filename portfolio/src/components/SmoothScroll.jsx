import { useEffect } from "react";
import Lenis from "lenis";
import { scrollState, pointerState, prefersReducedMotion } from "../lib/motionState";
import { setLenis } from "../lib/smoothScroll";

/**
 * Drives Lenis smooth scrolling and keeps `scrollState` / `pointerState` in
 * sync for the Three.js loop. Renders nothing.
 *
 * Under prefers-reduced-motion Lenis is skipped entirely — native scrolling
 * stays, and we only mirror the values the scenes read.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = prefersReducedMotion();

    const updateFromScroll = (y, velocity = 0) => {
      const limit = document.documentElement.scrollHeight - window.innerHeight;
      scrollState.y = y;
      scrollState.progress = limit > 0 ? y / limit : 0;
      scrollState.heroProgress = Math.min(y / Math.max(window.innerHeight, 1), 1);
      scrollState.velocity = velocity;
    };

    let lenis = null;
    let rafId = null;
    let onNativeScroll = null;

    if (reduced) {
      onNativeScroll = () => updateFromScroll(window.scrollY);
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      updateFromScroll(window.scrollY);
    } else {
      lenis = new Lenis({
        lerp: 0.09,
        wheelMultiplier: 1,
        smoothWheel: true,
        // Native scrolling on touch feels better than an emulated one.
        syncTouch: false,
      });
      setLenis(lenis);

      lenis.on("scroll", ({ scroll, velocity }) => updateFromScroll(scroll, velocity));

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // Pointer tracking for 3D parallax and the custom cursor.
    const onPointerMove = (e) => {
      pointerState.clientX = e.clientX;
      pointerState.clientY = e.clientY;
      pointerState.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerState.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (onNativeScroll) window.removeEventListener("scroll", onNativeScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        setLenis(null);
      }
    };
  }, []);

  return null;
}
