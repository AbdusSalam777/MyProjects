import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { Section, SectionHeading, Reveal, TiltCard } from "./ui";
import { projects, categories } from "../data/projects";

/**
 * Generated cover art. There are no screenshots in public/ yet, so each
 * project gets a deterministic gradient + grid motif keyed to its accent
 * colour. Set `image` on a project to swap in a real screenshot.
 */
function Cover({ project, tall = false }) {
  const initials = project.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.name} interface`}
        loading="lazy"
        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
          tall ? "min-h-[22rem]" : "min-h-[13rem]"
        }`}
      />
    );
  }

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${
        tall ? "min-h-[22rem]" : "min-h-[13rem]"
      }`}
      style={{
        background: `radial-gradient(120% 120% at 20% 0%, ${project.accent}38 0%, transparent 55%), linear-gradient(160deg, #0b0b12 0%, #12121c 100%)`,
      }}
    >
      {/* Grid motif */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(80% 80% at 50% 40%, #000, transparent)",
          WebkitMaskImage: "radial-gradient(80% 80% at 50% 40%, #000, transparent)",
        }}
      />
      {/* Drifting orb */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-40 w-40 rounded-full blur-3xl"
        style={{ background: project.accent, opacity: 0.35 }}
      />
      <span
        className="relative font-display font-bold tracking-tight"
        style={{
          fontSize: tall ? "7rem" : "4rem",
          color: project.accent,
          opacity: 0.9,
        }}
      >
        {initials}
      </span>
    </div>
  );
}

function TechChips({ tech, max = 4 }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tech.slice(0, max).map((t) => (
        <span
          key={t}
          className="rounded-full border border-line bg-ink-3 px-2.5 py-1 font-mono text-[11px] text-muted"
        >
          {t}
        </span>
      ))}
      {tech.length > max && (
        <span className="rounded-full border border-line bg-ink-3 px-2.5 py-1 font-mono text-[11px] text-faint">
          +{tech.length - max}
        </span>
      )}
    </div>
  );
}

function ProjectLinks({ project }) {
  return (
    <div className="flex items-center gap-3">
      <a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-bone px-4 py-2 font-display text-xs font-medium text-ink transition-transform duration-300 hover:scale-105"
      >
        Live site <FiArrowUpRight />
      </a>
      {project.code && (
        <a
          href={project.code}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 font-display text-xs text-muted transition-colors duration-300 hover:border-violet/50 hover:text-bone"
        >
          <FiGithub /> Code
        </a>
      )}
    </div>
  );
}

/** Large alternating showcase row for featured work. */
function FeaturedProject({ project, index }) {
  const flipped = index % 2 === 1;

  return (
    <Reveal>
      <div className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className={`overflow-hidden rounded-3xl border border-line ${flipped ? "lg:order-2" : ""}`}>
          <Cover project={project} tall />
        </div>

        <div className={flipped ? "lg:order-1" : ""}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-violet">{project.year}</span>
            <span className="h-px w-8 bg-line" />
            <span className="font-mono text-xs text-faint">{project.category}</span>
          </div>

          <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
            {project.name}
          </h3>

          <p className="mt-4 max-w-lg leading-relaxed text-muted">
            {project.description}
          </p>

          <ul className="mt-6 space-y-2">
            {project.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: project.accent }}
                />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <TechChips tech={project.tech} max={5} />
          </div>

          <div className="mt-7">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/** Compact card for the filtered grid. */
function ProjectCard({ project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard className="group h-full overflow-hidden rounded-2xl border border-line bg-ink-2 transition-colors duration-500 hover:border-violet/40">
        <div className="relative z-10 flex h-full flex-col">
          <div className="overflow-hidden border-b border-line">
            <Cover project={project} />
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold tracking-tight text-bone">
                {project.name}
              </h3>
              <span className="mt-1 shrink-0 font-mono text-[11px] text-faint">
                {project.year}
              </span>
            </div>

            <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted">
              {project.description}
            </p>

            <div className="mt-4">
              <TechChips tech={project.tech} max={3} />
            </div>

            <div className="mt-5 flex items-center gap-3 pt-1">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-display text-xs font-medium text-bone transition-colors hover:text-cyan"
              >
                Live <FiArrowUpRight />
              </a>
              {project.code && (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-display text-xs text-muted transition-colors hover:text-bone"
                >
                  <FiGithub /> Code
                </a>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const featured = useMemo(() => projects.filter((p) => p.featured), []);
  const rest = useMemo(() => projects.filter((p) => !p.featured), []);

  const filtered = useMemo(
    () => (filter === "All" ? rest : rest.filter((p) => p.category === filter)),
    [filter, rest]
  );

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Selected projects"
        title="Things I've designed, built and shipped."
        lead="Every one of these is live. Click through and click around — nothing here is a mockup."
      />

      {/* Featured */}
      <div className="mt-20 space-y-24">
        {featured.map((project, i) => (
          <FeaturedProject key={project.name} project={project} index={i} />
        ))}
      </div>

      {/* Filters */}
      <Reveal className="mt-28">
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-bone">
            More work
          </h3>
          <div className="inline-flex rounded-full border border-line bg-ink-2 p-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`relative rounded-full px-4 py-2 font-display text-xs transition-colors duration-300 ${
                  filter === c ? "text-ink" : "text-muted hover:text-bone"
                }`}
              >
                {filter === c && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-bone"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Grid */}
      <motion.div
        layout
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
