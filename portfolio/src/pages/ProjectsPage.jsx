import React from "react";
import PageShell from "../components/PageShell";
import Projects from "../components/Projects";

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      eyebrow="Portfolio"
      lead="Every one of these is live. Click through and click around — nothing here is a mockup."
      metaTitle="My Projects — Abdus Salam"
      metaDescription="15+ full-stack and frontend projects. Built with React, Node.js, MongoDB and more."
    >
      <Projects />
    </PageShell>
  );
}
