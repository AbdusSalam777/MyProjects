import React from "react";
import PageShell from "../components/PageShell";
import Reviews from "../components/Reviews";

export default function ReviewsPage() {
  return (
    <PageShell
      title="Reviews & Testimonials"
      eyebrow="Social proof"
      lead="Unfiltered feedback from people who signed the brief."
      metaTitle="Testimonials — Abdus Salam"
      metaDescription="Read what clients say about working with me on their MERN projects."
    >
      <Reviews />
    </PageShell>
  );
}
