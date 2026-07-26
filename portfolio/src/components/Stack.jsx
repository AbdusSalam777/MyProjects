import React from "react";
import { motion } from "framer-motion";
import { Section, SectionHeading, Reveal, Marquee } from "./ui";
import { stackGroups, marqueeStack } from "../data/skills";

function SkillTile({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group flex items-center gap-3 rounded-xl border border-line bg-ink-2 px-4 py-3.5 transition-colors duration-300 hover:border-violet/40"
    >
      <Icon
        className="shrink-0 text-xl transition-transform duration-300 group-hover:scale-110"
        style={{ color: item.color }}
      />
      <span className="font-display text-sm text-muted transition-colors duration-300 group-hover:text-bone">
        {item.name}
      </span>
    </motion.div>
  );
}

export default function Stack() {
  return (
    <Section id="stack" className="border-t border-line/60">
      {/* Tech marquee */}
      <Reveal className="mb-20">
        <Marquee reverse className="border-y border-line py-6">
          {marqueeStack.map((tech, i) => (
            <span key={`${tech}-${i}`} className="flex items-center whitespace-nowrap">
              <span className="px-8 font-display text-lg text-faint sm:text-xl">
                {tech}
              </span>
              <span className="h-1 w-1 rounded-full bg-violet" />
            </span>
          ))}
        </Marquee>
      </Reveal>

      <SectionHeading
        eyebrow="Toolkit"
        title="The stack I reach for, and why."
        lead="No percentage bars — those measure nothing. Here's what I actually use in production, grouped by the job it does."
      />

      <div className="mt-16 space-y-12">
        {stackGroups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 0.05}>
            <div className="grid gap-6 border-t border-line pt-8 lg:grid-cols-[16rem_1fr]">
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-bone">
                  {group.title}
                </h3>
                <p className="mt-1.5 text-sm text-faint">{group.caption}</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((item, i) => (
                  <SkillTile key={item.name} item={item} index={i} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
