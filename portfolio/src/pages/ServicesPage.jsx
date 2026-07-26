import React from "react";
import PageShell from "../components/PageShell";
import Services from "../components/Services";
import Faq from "../components/Faq";

export default function ServicesPage() {
  return (
    <PageShell
      title="Services & Process"
      eyebrow="What I offer"
      lead="Clear scope, a fixed number before we start, and code you own outright at the end."
      metaTitle="Services — Abdus Salam"
      metaDescription="Full-stack builds, front-end development, APIs, and maintenance. Fixed pricing, no surprises."
    >
      <Services />
      <Faq />
    </PageShell>
  );
}
