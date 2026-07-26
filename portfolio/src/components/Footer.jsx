import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Marquee } from "./ui";
import { scrollToTop } from "../lib/smoothScroll";
import { profile, socials } from "../data/site";

const navLinks = [
  { path: "/work", label: "Work" },
  { path: "/projects", label: "Projects" },
  { path: "/services", label: "Services" },
  { path: "/reviews", label: "Reviews" },
  { path: "/contact", label: "Contact" },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative border-t border-line bg-ink">
      {/* Oversized wordmark marquee */}
      <div className="border-b border-line py-10">
        <Marquee>
          <span className="whitespace-nowrap px-8 font-display text-[clamp(3rem,10vw,7rem)] font-semibold tracking-tight text-ink-3">
            Available for freelance work
          </span>
          <span className="px-8 font-serif text-[clamp(3rem,10vw,7rem)] italic text-violet/30">
            —
          </span>
        </Marquee>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet to-cyan font-display text-sm font-bold text-ink">
                A
              </span>
              <span className="font-display text-base font-semibold text-bone">
                {profile.handle}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {profile.name} — {profile.role} based in {profile.location},
              building web products end to end for clients worldwide.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs text-muted">
                {profile.availableText}
              </span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <div className="eyebrow">Navigate</div>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted transition-colors duration-300 hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere */}
          <div>
            <div className="eyebrow">Elsewhere</div>
            <ul className="mt-5 space-y-2.5">
              {[
                { icon: FiGithub, label: "GitHub", href: socials.github },
                { icon: FiLinkedin, label: "LinkedIn", href: socials.linkedin },
                { icon: FiMail, label: profile.email, href: socials.email },
              ].map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors duration-300 hover:text-bone"
                  >
                    <Icon className="shrink-0" />
                    <span className="truncate">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 sm:flex-row">
          <p className="font-mono text-xs text-faint">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-faint">
            Built with React, Three.js &amp; Tailwind
          </p>
          <button
            onClick={() => {
              navigate("/");
              scrollToTop();
            }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-display text-xs text-muted transition-colors duration-300 hover:border-violet/50 hover:text-bone"
          >
            Back to top <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
