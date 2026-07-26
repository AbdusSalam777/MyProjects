import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import { scrollToTop } from "../lib/smoothScroll";
import { profile } from "../data/site";

const links = [
  { path: "/work", label: "Work" },
  { path: "/projects", label: "Projects" },
  { path: "/services", label: "Services" },
  { path: "/reviews", label: "Reviews" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line/70 bg-ink/70 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Wordmark */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            aria-label="Home"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet to-cyan font-display text-sm font-bold text-ink">
              A
            </span>
            <span className="font-display text-base font-semibold tracking-tight text-bone">
              {profile.handle}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  isActive(link.path) ? "text-bone" : "text-muted hover:text-bone"
                }`}
              >
                {isActive(link.path) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ink-3"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden items-center gap-1.5 rounded-full bg-bone px-5 py-2.5 font-display text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
            >
              Hire me
              <FiArrowUpRight className="text-base" />
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-bone md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-2 px-8">
              {[...links, { path: "/contact", label: "Contact" }].map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line/60 py-5 text-left"
                >
                  <Link
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-semibold tracking-tight text-bone"
                  >
                    <span className="mr-3 font-mono text-xs text-violet">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.a
                href={`mailto:${profile.email}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10 text-sm text-muted"
              >
                {profile.email}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
