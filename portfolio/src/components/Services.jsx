import React from "react";
import { FiCheck, FiArrowUpRight } from "react-icons/fi";
import { Section, SectionHeading, Reveal, TiltCard, MagneticButton } from "./ui";
import { services, process } from "../data/services";
import { scrollToSection } from "../lib/smoothScroll";

function ServiceCard({ service, index }) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <TiltCard
        intensity={4}
        className="group h-full overflow-hidden rounded-2xl border border-line bg-ink-2 p-7 transition-colors duration-500 hover:border-violet/40"
      >
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-xl font-semibold tracking-tight text-bone">
              {service.title}
            </h3>
            <span className="shrink-0 font-mono text-xs text-violet">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted">{service.blurb}</p>

          <ul className="mt-6 space-y-2.5">
            {service.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm text-muted">
                <FiCheck className="mt-0.5 shrink-0 text-cyan" />
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
            <div>
              <div className="eyebrow">Starting at</div>
              <div className="mt-1 font-display text-2xl font-semibold text-bone">
                {service.from}
              </div>
            </div>
            <div className="text-right">
              <div className="eyebrow">Typical</div>
              <div className="mt-1 font-mono text-sm text-muted">
                {service.timeline}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}

export default function Services() {
  return (
    <Section id="services" className="border-t border-line/60">
      <SectionHeading
        eyebrow="What I do"
        title="Hire me for the whole build, or just the hard part."
        lead="Clear scope, a fixed number before we start, and code you own outright at the end."
      />

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>

      <Reveal className="mt-8">
        <p className="text-center font-mono text-xs text-faint">
          Prices are starting points — send me the scope and I'll send back a
          firm quote.
        </p>
      </Reveal>

      {/* ---------------------------------------------------------------- */}
      {/*  Process — sticky heading, scrolling steps                        */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-36 grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="How it works"
            title="A process built to remove surprises."
            lead="You always know what's happening, what it costs, and what's next."
          />
          <Reveal delay={0.2}>
            <div className="mt-8">
              <MagneticButton variant="outline" onClick={() => scrollToSection("contact")}>
                Book a discovery call
                <FiArrowUpRight />
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          {/* Spine */}
          <div className="absolute left-[1.4rem] top-2 h-full w-px bg-gradient-to-b from-violet via-cyan to-transparent" />

          <div className="space-y-12">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.06}>
                <div className="relative flex gap-6">
                  <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-ink-2 font-mono text-xs text-cyan">
                    {step.step}
                  </div>
                  <div className="pt-1.5">
                    <h4 className="font-display text-xl font-semibold tracking-tight text-bone">
                      {step.title}
                    </h4>
                    <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-muted">
                      {step.blurb}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
