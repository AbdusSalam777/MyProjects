import React from "react";
import { Reveal, Counter } from "./ui";
import { stats } from "../data/site";

/** Headline numbers band. */
export default function Stats() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 0.08}>
          <div className="h-full bg-ink-2 px-6 py-8">
            <div className="font-display text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-2 text-sm text-muted">{stat.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
