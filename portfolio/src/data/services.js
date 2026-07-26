/**
 * Freelance offer: what you sell, how you work, and the answers hirers
 * look for before they message you.
 */

export const services = [
  {
    id: "web-app",
    title: "Full-Stack Web Apps",
    blurb:
      "End-to-end product builds on the MERN stack — auth, database design, REST APIs, dashboards and a polished front end.",
    deliverables: [
      "React front end",
      "Node/Express API",
      "MongoDB or PostgreSQL schema",
      "Auth & role-based access",
      "Deploy + handover docs",
    ],
    from: "$600",
    timeline: "3–6 weeks",
  },
  {
    id: "frontend",
    title: "Front-End Development",
    blurb:
      "Pixel-accurate, responsive interfaces from your Figma file — accessible, fast, and built to a component system you can extend.",
    deliverables: [
      "Figma → React build",
      "Responsive to 320px",
      "Reusable component library",
      "Lighthouse 90+ scores",
      "Motion & micro-interactions",
    ],
    from: "$300",
    timeline: "1–3 weeks",
  },
  {
    id: "api",
    title: "APIs & Integrations",
    blurb:
      "REST APIs, third-party integrations, payment and email flows, and the database work that keeps them fast under load.",
    deliverables: [
      "REST API design",
      "Stripe / payment flows",
      "Email & webhook handling",
      "Query optimisation",
      "Postman collection",
    ],
    from: "$250",
    timeline: "1–2 weeks",
  },
  {
    id: "rescue",
    title: "Fixes & Maintenance",
    blurb:
      "Inherited a codebase that's breaking? I audit, stabilise and document it — then keep it running on a monthly retainer.",
    deliverables: [
      "Codebase audit",
      "Bug triage & fixes",
      "Performance profiling",
      "Dependency upgrades",
      "Monthly retainer option",
    ],
    from: "$40/hr",
    timeline: "Ongoing",
  },
];

export const process = [
  {
    step: "01",
    title: "Discovery",
    blurb:
      "A call to pin down scope, users and constraints. You leave with a written brief and a fixed quote — no surprise invoices later.",
  },
  {
    step: "02",
    title: "Architecture",
    blurb:
      "Data models, API surface and screen flow agreed up front. Decisions get documented so nothing is trapped in my head.",
  },
  {
    step: "03",
    title: "Build",
    blurb:
      "Weekly demos on a live staging URL. You see progress as it happens and can redirect early, when changes are still cheap.",
  },
  {
    step: "04",
    title: "Ship & support",
    blurb:
      "Deployed, monitored and documented. Two weeks of free post-launch fixes, with a retainer if you want me to stay on.",
  },
];

export const faq = [
  {
    q: "How do you price work?",
    a: "Fixed price for well-defined scope, hourly for open-ended or maintenance work. You get the number before I start, and it doesn't move unless the scope does.",
  },
  {
    q: "What are your working hours?",
    a: "I'm in Lahore (UTC+5) and overlap comfortably with Europe and the US East Coast. I reply to messages within 24 hours, usually much faster.",
  },
  {
    q: "Who owns the code?",
    a: "You do — completely, on final payment. Everything lives in your repository, and I hand over deployment access and documentation at the end.",
  },
  {
    q: "Can you work with my existing team?",
    a: "Yes. I'm comfortable in shared repositories with code review, ticket workflows and whatever stack conventions you already run.",
  },
  {
    q: "What if I only need part of a project?",
    a: "That's common. I take on front-end-only builds, API work, or specific features inside a larger product without needing to own the whole thing.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Happily — send yours over, or I can provide a simple mutual one.",
  },
];
