import React from "react";
import { motion } from "framer-motion";
import { Section, SectionHeading, Reveal } from "./ui";
import { profile } from "../data/site";

const facts = [
  { k: "Based in", v: profile.location },
  { k: "Timezone", v: profile.timezone },
  { k: "Focus", v: "MERN · Full-stack" },
  { k: "Languages", v: "English · Urdu" },
  { k: "Engagement", v: "Freelance · Contract" },
  { k: "Replies within", v: "24 hours" },
];

export default function About() {
  return (
    <Section id="about" className="border-t border-line/60">
      <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <SectionHeading
            eyebrow="About"
            title="I care about the part most people skip."
          />

          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted">
            <Reveal delay={0.1}>
              <p>
                Anyone can get a feature working on their own machine. The
                difference shows up later — when the data model has to change,
                when traffic arrives, when someone else has to read the code. I
                build for that day, not just for the demo.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                I work across the whole stack: React on the front, Node and
                Express behind it, MongoDB or PostgreSQL underneath. That means
                you're not managing a handoff between two freelancers who blame
                each other when something breaks.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p>
                Outside client work I'm usually building something to learn
                from — most of the projects on this page started that way.{" "}
                <span className="text-bone">
                  I'd rather over-communicate than leave you guessing.
                </span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* Quick facts */}
        <Reveal delay={0.2}>
          <div className="overflow-hidden rounded-2xl border border-line">
            {facts.map((fact, i) => (
              <motion.div
                key={fact.k}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-center justify-between gap-4 border-b border-line bg-ink-2 px-6 py-4 last:border-b-0"
              >
                <span className="eyebrow">{fact.k}</span>
                <span className="text-right font-display text-sm text-bone">
                  {fact.v}
                </span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
