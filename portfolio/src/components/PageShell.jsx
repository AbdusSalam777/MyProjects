import React from "react";
import { motion } from "framer-motion";
import { SplitText, Reveal, Eyebrow } from "./ui";
import usePageMeta from "../lib/usePageMeta";

/**
 * Wrapper for every page except Home.
 *
 * Handles the enter/exit transition, the space under the fixed header, and
 * the page banner so headings stay consistent across routes.
 */
export default function PageShell({
  title,
  eyebrow,
  lead,
  metaTitle,
  metaDescription,
  children,
}) {
  usePageMeta(metaTitle ?? `${title} — Abdus Salam`, metaDescription);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Banner */}
      <header className="relative overflow-hidden px-5 pb-4 pt-36 sm:px-8 sm:pt-44">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet/15 blur-[130px]" />
        <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-cyan/10 blur-[130px]" />

        <div className="relative mx-auto w-full max-w-7xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <SplitText
            as="h1"
            text={title}
            className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1] tracking-[-0.03em] text-bone"
          />
          {lead && (
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {lead}
              </p>
            </Reveal>
          )}
          <div className="hairline mt-12" />
        </div>
      </header>

      {children}
    </motion.div>
  );
}
