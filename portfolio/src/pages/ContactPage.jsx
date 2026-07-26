import React from "react";
import PageShell from "../components/PageShell";
import Contact from "../components/Contact";

export default function ContactPage() {
  return (
    <PageShell
      title="Get In Touch"
      eyebrow="Contact"
      lead="Tell me what you're building and where it's stuck."
      metaTitle="Contact — Abdus Salam"
      metaDescription="Email, phone, location. I reply within 24 hours."
    >
      <Contact />
    </PageShell>
  );
}
