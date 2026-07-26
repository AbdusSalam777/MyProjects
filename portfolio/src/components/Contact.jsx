import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiClock,
  FiCopy,
  FiCheck,
  FiGithub,
  FiLinkedin,
  FiArrowUpRight,
  FiDownload,
} from "react-icons/fi";
import { Section, Reveal, SplitText, MagneticButton, Eyebrow } from "./ui";
import { profile, socials } from "../data/site";

function DetailRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-4 rounded-xl border border-line bg-ink-2 px-5 py-4 transition-colors duration-300 hover:border-violet/40">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-3 text-cyan">
        <Icon />
      </span>
      <div className="min-w-0">
        <div className="eyebrow">{label}</div>
        <div className="mt-0.5 truncate text-sm text-bone">{value}</div>
      </div>
      {href && <FiArrowUpRight className="ml-auto shrink-0 text-faint" />}
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context or denied) — the mailto link and
      // the visible address are still there, so nothing is actually lost.
    }
  };

  return (
    <Section id="contact" className="border-t border-line/60">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-violet/15 blur-[130px]" />

      <div className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Contact</Eyebrow>
          </div>

          <SplitText
            text="Let's build something worth shipping."
            className="mt-6 font-display text-[clamp(2.25rem,6.5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.03em] text-bone"
          />

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted">
              Tell me what you're building and where it's stuck. I reply to every
              message within 24 hours — usually the same day.
            </p>
          </Reveal>

          {/* Email pill */}
          <Reveal delay={0.3}>
            <div className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-3 sm:flex-row">
              <a
                href={`mailto:${profile.email}`}
                className="group flex w-full flex-1 items-center justify-center gap-3 rounded-full border border-line bg-ink-2 px-6 py-4 transition-colors duration-300 hover:border-violet/50"
              >
                <FiMail className="text-cyan" />
                <span className="font-display text-sm text-bone sm:text-base">
                  {profile.email}
                </span>
              </a>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="flex h-[3.4rem] w-full items-center justify-center gap-2 rounded-full border border-line bg-ink-2 px-6 text-sm text-muted transition-colors duration-300 hover:border-violet/50 hover:text-bone sm:w-auto"
              >
                {copied ? (
                  <>
                    <FiCheck className="text-emerald-400" /> Copied
                  </>
                ) : (
                  <>
                    <FiCopy /> Copy
                  </>
                )}
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href={`mailto:${profile.email}`}>
                Start a project <FiArrowUpRight />
              </MagneticButton>
              <MagneticButton variant="outline" href={profile.resume} download>
                <FiDownload /> Download CV
              </MagneticButton>
            </div>
            <p className="mt-3 font-mono text-[11px] text-faint">
              CV button expects a file at public/resume.pdf
            </p>
          </Reveal>
        </div>

        {/* Details */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-2">
          <Reveal delay={0.1}>
            <DetailRow
              icon={FiMapPin}
              label="Based in"
              value={profile.location}
            />
          </Reveal>
          <Reveal delay={0.15}>
            <DetailRow icon={FiClock} label="Timezone" value={profile.timezone} />
          </Reveal>
          <Reveal delay={0.2}>
            <DetailRow
              icon={FiPhone}
              label="Phone"
              value={profile.phone}
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
            />
          </Reveal>
          <Reveal delay={0.25}>
            <DetailRow
              icon={FiMail}
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
          </Reveal>
        </div>

        {/* Socials */}
        <Reveal delay={0.3}>
          <div className="mt-10 flex justify-center gap-3">
            {[
              { icon: FiGithub, href: socials.github, label: "GitHub" },
              { icon: FiLinkedin, href: socials.linkedin, label: "LinkedIn" },
              { icon: FiMail, href: socials.email, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -4 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ink-2 text-muted transition-colors duration-300 hover:border-violet/50 hover:text-bone"
              >
                <Icon className="text-lg" />
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
