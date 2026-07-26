import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Section, SectionHeading, Reveal, Marquee, MagneticButton } from "./ui";
import Companies from "./Companies";
import Stats from "./Stats";
import { clientLogos } from "../data/clients";

export default function Work() {
  return (
    <Section id="work">
      <SectionHeading
        eyebrow="Selected engagements"
        title="Agencies, companies and clients I've built for."
        lead="Contract and freelance work — the teams who brought me in, what I shipped, and what it changed."
      />

      {/* Logo wall */}
      <Reveal delay={0.1} className="mt-14">
        <Marquee className="border-y border-line py-7">
          {clientLogos.map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="whitespace-nowrap px-10 font-display text-xl font-medium text-faint transition-colors duration-300 hover:text-bone sm:text-2xl"
            >
              {logo}
            </span>
          ))}
        </Marquee>
      </Reveal>

      {/* Company cards */}
      <div className="mt-16">
        <Companies />
      </div>

      {/* Numbers */}
      <div className="mt-20">
        <Stats />
      </div>

      {/* Onward */}
      <Reveal delay={0.1}>
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-muted">
            Worked with me before? I'd love to hear how it went.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <MagneticButton to="/reviews" variant="outline">
              Leave a review
            </MagneticButton>
            <MagneticButton to="/contact">
              Start a project <FiArrowUpRight />
            </MagneticButton>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
