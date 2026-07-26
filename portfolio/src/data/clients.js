/**
 * ⚠️  PLACEHOLDER DATA — REPLACE BEFORE YOU GO LIVE
 *
 * Every company below is invented scaffolding so you can see the layout.
 * Swap in the real agencies, companies and clients you've worked with, and
 * delete any you can't back up — a short honest list beats a long fake one.
 *
 * ── How to add a company ──────────────────────────────────────────────────
 *
 * 1. Drop the logo file into  public/logos/  (SVG is best, PNG with a
 *    transparent background also works). Aim for a wide-ish logo.
 * 2. Add an entry below.
 *
 *    name        – company / agency / client name          (required)
 *    logo        – "/logos/acme.svg", or null for a generated monogram
 *    description – 1–2 sentences: what they do, what you built, the outcome
 *    role        – what you were engaged as
 *    period      – e.g. "2025 — Present"
 *    tags        – tech or discipline chips
 *    url         – their website, or null
 *    featured    – true pins it to the top and enlarges the card
 *
 * The monogram fallback means a missing logo still looks deliberate — you can
 * add companies now and the logo files later.
 */

export const companies = [
  {
    name: "Placeholder Agency One",
    logo: null,
    description:
      "Replace this with a real description: what the company does, what you built for them, and the outcome it produced. Two sentences is plenty.",
    role: "Contract Full-Stack Developer",
    period: "2025 — Present",
    tags: ["React", "Node.js", "MongoDB"],
    url: null,
    featured: true,
  },
  {
    name: "Placeholder Studio Two",
    logo: null,
    description:
      "Replace this line. Describe the engagement and the result — a number or a concrete outcome reads far better than adjectives.",
    role: "Front-End Developer",
    period: "2024 — 2025",
    tags: ["React", "Tailwind CSS", "Figma"],
    url: null,
    featured: true,
  },
  {
    name: "Placeholder Client Three",
    logo: null,
    description:
      "Replace this with the real project scope and what changed for the client afterwards.",
    role: "Freelance Developer",
    period: "2024",
    tags: ["Express", "PostgreSQL", "REST API"],
    url: null,
    featured: false,
  },
  {
    name: "Placeholder Client Four",
    logo: null,
    description: "Replace this with the real project scope and outcome.",
    role: "Freelance Developer",
    period: "2023 — 2024",
    tags: ["JavaScript", "Firebase"],
    url: null,
    featured: false,
  },
];

/**
 * Names for the scrolling logo wall. Text wordmarks by design — they render
 * crisply at any size and never break the way mismatched logo PNGs do.
 */
export const clientLogos = companies.map((c) => c.name);
