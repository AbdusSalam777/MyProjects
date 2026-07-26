/**
 * Mutable motion state shared between the DOM and the Three.js render loop.
 *
 * Scroll and pointer values change on nearly every frame. Routing them through
 * React state would re-render the tree 60×/second, so they live in plain
 * objects instead: the DOM listeners write, `useFrame` reads. No re-renders.
 */

export const scrollState = {
  /** Absolute scroll offset in px. */
  y: 0,
  /** 0→1 across the whole document. */
  progress: 0,
  /** 0→1 across the first viewport (the hero). */
  heroProgress: 0,
  /** Signed scroll speed; used to skew/steer motion. */
  velocity: 0,
};

export const pointerState = {
  /** Normalised −1→1, origin at viewport centre. */
  x: 0,
  y: 0,
  /** Raw client px, for the custom cursor. */
  clientX: 0,
  clientY: 0,
};

/** True when the visitor has asked the OS for less animation. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Coarse pointer or narrow screen — used to scale the 3D work down. */
export function isLowPowerDevice() {
  if (typeof window === "undefined") return true;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;
  const fewCores =
    typeof navigator !== "undefined" &&
    navigator.hardwareConcurrency !== undefined &&
    navigator.hardwareConcurrency <= 4;
  return coarse || narrow || fewCores;
}
