import React, { Suspense, lazy, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { MagneticButton } from "./ui";
import { scrollToSection } from "../lib/smoothScroll";
import { profile, signals } from "../data/site";

// Three.js is the heaviest thing on the page — keep it out of the initial
// bundle so the headline paints immediately.
const HeroScene = lazy(() => import("../three/HeroScene"));

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Content drifts up and dissolves as the next section arrives.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-32 sm:px-8"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-violet/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-cyan/10 blur-[140px]" />

      {/* 3D scene — right half on desktop, full-bleed backdrop on mobile */}
      <motion.div
        style={{ opacity: canvasOpacity }}
        className="pointer-events-none absolute inset-0 z-0 opacity-40 lg:left-[38%] lg:opacity-100"
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </motion.div>

      {/* Foreground */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl"
      >
        <div className="max-w-3xl">
          {/* Availability */}
          {profile.available && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-2/60 px-4 py-2 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-xs tracking-wide text-bone">
                {profile.availableText}
              </span>
            </motion.div>
          )}

          {/* Headline */}
          <h1 className="font-display text-[clamp(2.75rem,9vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.03em]">
            {["Full-stack", "developer"].map((word, i) => (
              <span key={word} className="reveal-mask block">
                <motion.span
                  className="block text-bone"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.95,
                    delay: 0.25 + i * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="reveal-mask block">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.95, delay: 0.43, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-serif italic text-gradient">who ships.</span>
              </motion.span>
            </span>
          </h1>

          {/* Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            I'm <span className="text-bone">{profile.name}</span> — I build MERN
            applications end to end, from database schema to the last pixel, and
            hand them over documented, deployed and yours.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton onClick={() => scrollToSection("contact")}>
              Start a project
              <FiArrowUpRight className="text-base" />
            </MagneticButton>
            <MagneticButton variant="outline" onClick={() => scrollToSection("projects")}>
              View work
            </MagneticButton>
          </motion.div>

          {/* Trust signals */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 flex flex-wrap gap-x-6 gap-y-2"
          >
            {signals.map((s) => (
              <li key={s} className="flex items-center gap-2 font-mono text-xs text-faint">
                <span className="h-1 w-1 rounded-full bg-violet" />
                {s}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToSection("work")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-label="Scroll to next section"
      >
        <span className="eyebrow">Scroll</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted"
        >
          <FiArrowDown />
        </motion.span>
      </motion.button>
    </section>
  );
}
