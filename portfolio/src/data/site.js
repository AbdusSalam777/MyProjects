/**
 * Global site content. Edit here — components read from this file.
 */

export const profile = {
  name: "Abdus Salam",
  handle: "Abdus.dev",
  role: "Full-Stack Developer",
  tagline: "MERN specialist building fast, reliable web products",
  location: "Lahore, Pakistan",
  timezone: "PKT (UTC+5)",
  email: "abdusalam0381@gmail.com",
  phone: "+92 312 459 7594",
  /** Drop a PDF at public/resume.pdf to enable the download button. */
  resume: "/resume.pdf",
  available: true,
  availableText: "Available for new projects",
};

export const socials = {
  github: "https://github.com/AbdusSalam777",
  linkedin: "https://www.linkedin.com/in/abdus-salam-a42a57341/",
  email: `mailto:${profile.email}`,
};

/**
 * Headline numbers. Keep these honest — hirers check.
 * `suffix` renders straight after the number.
 */
export const stats = [
  { value: 15, suffix: "+", label: "Projects shipped" },
  { value: 100, suffix: "%", label: "On-time delivery" },
  { value: 24, suffix: "h", label: "Avg. response time" },
  { value: 3, suffix: "+", label: "Years writing code" },
];

/**
 * Trust signals shown under the hero. Short, scannable, no fluff.
 */
export const signals = [
  "Fixed-price or hourly",
  "Source code always yours",
  "NDA friendly",
  "Post-launch support included",
];
