import React, { useEffect, useRef, useState } from "react";
import { pointerState, prefersReducedMotion } from "../lib/motionState";

/**
 * Two-part cursor: a precise dot that tracks 1:1, and a ring that lags behind
 * and swells over interactive elements.
 *
 * Only mounts for fine pointers (mouse/trackpad). Touch devices and
 * reduced-motion users keep the native cursor.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor");

    let raf = null;
    // Ring position lerps toward the pointer; dot snaps to it.
    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let scale = 1;
    let targetScale = 1;

    const tick = () => {
      const { clientX, clientY } = pointerState;
      rx += (clientX - rx) * 0.16;
      ry += (clientY - ry) * 0.16;
      scale += (targetScale - scale) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const INTERACTIVE = 'a, button, input, textarea, select, [data-cursor="hover"]';
    const onOver = (e) => {
      targetScale = e.target.closest?.(INTERACTIVE) ? 2.1 : 1;
    };
    const onDown = () => (targetScale *= 0.8);
    const onUp = () => (targetScale = targetScale > 1.5 ? 2.1 : 1);

    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-1.5 w-1.5 rounded-full bg-bone mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-9 w-9 rounded-full border border-bone/40 mix-blend-difference"
      />
    </>
  );
}
