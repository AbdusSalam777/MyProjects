/**
 * Lenis instance holder + navigation helpers.
 *
 * Kept outside React so any component (nav, buttons, footer) can request a
 * scroll without prop-drilling a ref through the tree.
 */

let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

/** Scroll to a section id, accounting for the fixed header. */
export function scrollToSection(id, offset = -72) {
  const target = typeof id === "string" && id.startsWith("#") ? id : `#${id}`;
  const el = document.querySelector(target);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.4 });
  } else {
    // Reduced-motion / Lenis-disabled path.
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "auto" });
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 1.2 });
  else window.scrollTo({ top: 0, behavior: "auto" });
}
