import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";

/** Router Link with motion props attached — used by MagneticButton. */
const MotionLink = motion.create(Link);

/* -------------------------------------------------------------------------- */
/*  Text                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Headline that rises word-by-word out of a clipping mask as it enters view.
 * Each word is its own overflow-hidden row, so the text appears to be pushed
 * up from behind a solid edge rather than simply fading.
 */
export function SplitText({ text, className = "", delay = 0, as: Tag = "h2" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="reveal-mask inline-block align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.75,
              delay: delay + i * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Generic fade-and-rise on scroll into view. */
export function Reveal({ children, delay = 0, y = 28, className = "", once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Small mono eyebrow with a leading rule. */
export function Eyebrow({ children, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-8 bg-gradient-to-r from-violet to-cyan" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

/** Standard section header: eyebrow, split headline, optional lead paragraph. */
export function SectionHeading({ eyebrow, title, lead, align = "left", className = "" }) {
  const centred = align === "center";
  return (
    <div
      className={`${centred ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && (
        <div className={centred ? "flex justify-center" : ""}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <SplitText
        text={title}
        className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-bone sm:text-5xl lg:text-6xl"
      />
      {lead && (
        <Reveal delay={0.15}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Interaction                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Button that leans toward the cursor while hovered, then springs back.
 *
 * Renders a router <Link> for `to`, an <a> for `href` (external links and
 * mailto:), and a <button> otherwise.
 */
export function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  className = "",
  strength = 0.35,
  ...rest
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-display text-sm font-medium tracking-wide transition-colors duration-300";

  const variants = {
    primary:
      "bg-bone text-ink hover:bg-white shadow-[0_0_40px_-12px_rgba(110,91,255,0.9)]",
    outline:
      "border border-line text-bone hover:border-violet/60 hover:text-white",
    flame: "bg-flame text-ink hover:brightness-110 shadow-[0_0_40px_-12px_rgba(255,107,61,0.7)]",
  };

  const Tag = to ? MotionLink : href ? motion.a : motion.button;
  const linkProps = to ? { to } : href ? { href } : {};

  return (
    <Tag
      ref={ref}
      {...linkProps}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${variants[variant]} ${className}`}
      data-cursor="hover"
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Sheen sweep on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </Tag>
  );
}

/**
 * Card that tilts toward the cursor in 3D and feeds `--mx`/`--my` to the
 * `.spotlight` gradient defined in index.css.
 */
export function TiltCard({ children, className = "", intensity = 6 }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * intensity * 2);
    rx.set(-(py - 0.5) * intensity * 2);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={`spotlight ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Display                                                                    */
/* -------------------------------------------------------------------------- */

/** Counts up from zero the first time it scrolls into view. */
export function Counter({ value, suffix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/** Five-star rating display. `size` is a Tailwind text size class. */
export function Stars({ rating = 5, size = "text-sm" }) {
  return (
    <div className={`flex gap-0.5 ${size}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? "text-flame" : "text-line"}>
          ★
        </span>
      ))}
    </div>
  );
}

/**
 * Infinite horizontal marquee. Children are rendered twice so the loop is
 * seamless; the CSS animation translates exactly −50%.
 */
export function Marquee({ children, reverse = false, className = "" }) {
  return (
    <div className={`fade-x overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Section wrapper with consistent rhythm and a scroll-target id. */
export function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}
