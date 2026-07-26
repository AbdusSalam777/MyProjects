import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Reveal, TiltCard } from "./ui";
import { companies } from "../data/clients";

/** Initials fallback used when a company has no logo file yet. */
function Monogram({ name }) {
  const initials = name
    .replace(/[^a-zA-Z ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-violet/25 to-cyan/15 font-display text-sm font-bold text-bone">
      {initials}
    </div>
  );
}

/**
 * Logo with graceful degradation: if the image 404s (path typo, file not
 * uploaded yet) we fall back to the monogram instead of a broken-image icon.
 */
function CompanyLogo({ company }) {
  const [failed, setFailed] = useState(false);

  if (!company.logo || failed) return <Monogram name={company.name} />;

  return (
    <div className="flex h-12 items-center">
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        onError={() => setFailed(true)}
        loading="lazy"
        className="max-h-12 w-auto max-w-[10rem] object-contain"
      />
    </div>
  );
}

function CompanyCard({ company, index }) {
  const featured = company.featured;

  const card = (
    <TiltCard
      intensity={featured ? 3 : 4}
      className={`group h-full overflow-hidden rounded-2xl border border-line bg-ink-2 transition-colors duration-500 hover:border-violet/40 ${
        featured ? "p-8" : "p-6"
      }`}
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <CompanyLogo company={company} />
          {company.url && (
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 group-hover:border-violet/50 group-hover:text-bone">
              <FiArrowUpRight />
            </span>
          )}
        </div>

        <h3
          className={`mt-6 font-display font-semibold tracking-tight text-bone ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {company.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-sm text-cyan">{company.role}</span>
          <span className="h-1 w-1 rounded-full bg-line" />
          <span className="font-mono text-xs text-faint">{company.period}</span>
          {featured && (
            <span className="rounded-full border border-flame/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-flame">
              Featured
            </span>
          )}
        </div>

        <p
          className={`mt-4 leading-relaxed text-muted ${
            featured ? "text-base" : "text-sm"
          }`}
        >
          {company.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {company.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-ink-3 px-3 py-1 font-mono text-[11px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </TiltCard>
  );

  return (
    <Reveal delay={index * 0.07} className={featured ? "lg:col-span-3" : "lg:col-span-2"}>
      {company.url ? (
        <a
          href={company.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {card}
        </a>
      ) : (
        card
      )}
    </Reveal>
  );
}

export default function Companies() {
  const featured = companies.filter((c) => c.featured);
  const rest = companies.filter((c) => !c.featured);

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-6">
        {featured.map((company, i) => (
          <CompanyCard key={company.name} company={company} index={i} />
        ))}
        {rest.map((company, i) => (
          <CompanyCard
            key={company.name}
            company={company}
            index={featured.length + i}
          />
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 rounded-xl border border-flame/25 bg-flame/[0.07] px-4 py-3 text-center font-mono text-[11px] leading-relaxed text-flame/90">
          Dev note (delete once real): these companies are placeholders. Edit
          src/data/clients.js — drop logo files into public/logos/ and set the
          logo path. Missing logos fall back to a monogram automatically.
        </p>
      </Reveal>
    </>
  );
}
