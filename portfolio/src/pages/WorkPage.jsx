import React from "react";
import { Section } from "../components/ui";
import PageShell from "../components/PageShell";
import Companies from "../components/Companies";
import Stats from "../components/Stats";
import Work from "../components/Work";

export default function WorkPage() {
  return (
    <PageShell
      title="Companies & Clients"
      eyebrow="Selected engagements"
      lead="Contract and freelance work — the teams who brought me in, what I shipped, and what it changed."
      metaTitle="My Work — Abdus Salam"
      metaDescription="Agencies, companies and clients I've worked with. Contract and freelance engagements across the MERN stack."
    >
      <Section className="border-t border-line/60">
        <Companies />
      </Section>
      <Section className="border-t border-line/60">
        <Stats />
      </Section>
      <Work />
    </PageShell>
  );
}
