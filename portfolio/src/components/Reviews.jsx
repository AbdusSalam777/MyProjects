import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiStar, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Section, SectionHeading, Reveal, MagneticButton, Stars } from "./ui";
import { seedTestimonials } from "../data/testimonials";
import { fetchReviews, submitReview, isApiConfigured } from "../lib/reviewsApi";
import { profile } from "../data/site";

/* -------------------------------------------------------------------------- */
/*  Review card                                                                */
/* -------------------------------------------------------------------------- */

function initialsOf(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function ReviewCard({ review, index }) {
  const date = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="mb-5 break-inside-avoid rounded-2xl border border-line bg-ink-2 p-6 transition-colors duration-500 hover:border-violet/40"
    >
      <Stars rating={review.rating} />

      <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-bone/90">
        “{review.message}”
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan font-display text-xs font-bold text-ink">
          {initialsOf(review.name)}
        </div>
        <div className="min-w-0">
          <div className="truncate font-display text-sm font-medium text-bone">
            {review.name}
          </div>
          <div className="truncate font-mono text-[11px] text-faint">
            {[review.role, review.company].filter(Boolean).join(" · ")}
            {date ? ` · ${date}` : ""}
          </div>
        </div>
      </figcaption>
    </motion.figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  Star input                                                                 */
/* -------------------------------------------------------------------------- */

function RatingInput({ value, onChange }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            className="p-0.5 transition-transform duration-200 hover:scale-125"
          >
            <FiStar
              className={`text-2xl transition-colors duration-200 ${
                n <= shown ? "fill-flame text-flame" : "text-line"
              }`}
            />
          </button>
        ))}
      </div>
      <span className="font-mono text-xs text-faint">{shown}/5</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Form                                                                       */
/* -------------------------------------------------------------------------- */

// `website` is a honeypot — hidden from real users, irresistible to bots.
// The API discards any submission that fills it in.
const EMPTY = {
  name: "",
  role: "",
  company: "",
  rating: 5,
  message: "",
  email: "",
  website: "",
};

function ReviewForm({ onClose, onSubmitted }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [serverError, setServerError] = useState("");

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (form.message.trim().length < 20)
      next.message = "A little more detail, please — at least 20 characters.";
    if (form.message.trim().length > 1000)
      next.message = "Please keep it under 1000 characters.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "That email doesn't look right.";
    if (form.rating < 1 || form.rating > 5) next.rating = "Pick a rating.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    setServerError("");
    try {
      await submitReview({
        name: form.name.trim(),
        role: form.role.trim(),
        company: form.company.trim(),
        rating: Number(form.rating),
        message: form.message.trim(),
        email: form.email.trim(),
        website: form.website,
      });
      setStatus("done");
      onSubmitted?.();
    } catch (err) {
      setStatus("error");
      setServerError(err.message || "Something went wrong. Please try again.");
    }
  };

  const field =
    "w-full rounded-xl border border-line bg-ink-3 px-4 py-3 text-sm text-bone placeholder:text-faint transition-colors duration-300 focus:border-violet focus:outline-none";

  if (status === "done") {
    return (
      <div className="py-10 text-center">
        <FiCheckCircle className="mx-auto text-5xl text-emerald-400" />
        <h3 className="mt-5 font-display text-2xl font-semibold text-bone">
          Thank you — that means a lot.
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Your review has been sent for a quick check and will appear on the
          site shortly. I read every one of these.
        </p>
        <button
          onClick={onClose}
          className="mt-7 rounded-full bg-bone px-6 py-2.5 font-display text-sm font-medium text-ink transition-transform hover:scale-105"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!isApiConfigured && (
        <div className="flex items-start gap-3 rounded-xl border border-flame/30 bg-flame/10 p-4">
          <FiAlertCircle className="mt-0.5 shrink-0 text-flame" />
          <p className="text-xs leading-relaxed text-bone/90">
            The reviews backend isn't connected yet. Set{" "}
            <code className="font-mono text-flame">VITE_API_URL</code> in your
            .env file, or{" "}
            <a
              href={`mailto:${profile.email}?subject=Review%20for%20Abdus`}
              className="underline decoration-flame/50 underline-offset-2"
            >
              email your review instead
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="rv-name" className="eyebrow mb-2 block">
            Your name *
          </label>
          <input
            id="rv-name"
            className={field}
            value={form.name}
            onChange={set("name")}
            placeholder="Jane Cooper"
            autoFocus
          />
          {errors.name && <p className="mt-1.5 text-xs text-flame">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="rv-role" className="eyebrow mb-2 block">
            Role
          </label>
          <input
            id="rv-role"
            className={field}
            value={form.role}
            onChange={set("role")}
            placeholder="Product Manager"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="rv-company" className="eyebrow mb-2 block">
            Company
          </label>
          <input
            id="rv-company"
            className={field}
            value={form.company}
            onChange={set("company")}
            placeholder="Acme Studio"
          />
        </div>

        <div>
          <label htmlFor="rv-email" className="eyebrow mb-2 block">
            Email (never published)
          </label>
          <input
            id="rv-email"
            type="email"
            className={field}
            value={form.email}
            onChange={set("email")}
            placeholder="you@company.com"
          />
          {errors.email && <p className="mt-1.5 text-xs text-flame">{errors.email}</p>}
        </div>
      </div>

      {/* Honeypot — visually hidden, off the tab order, ignored by humans. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="rv-website">Leave this field empty</label>
        <input
          id="rv-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={set("website")}
        />
      </div>

      <div>
        <span className="eyebrow mb-2 block">Rating *</span>
        <RatingInput
          value={form.rating}
          onChange={(n) => setForm((f) => ({ ...f, rating: n }))}
        />
      </div>

      <div>
        <label htmlFor="rv-message" className="eyebrow mb-2 block">
          Your review *
        </label>
        <textarea
          id="rv-message"
          rows={5}
          className={`${field} resize-none`}
          value={form.message}
          onChange={set("message")}
          placeholder="What did we build together, and how did it go?"
        />
        <div className="mt-1.5 flex items-center justify-between">
          {errors.message ? (
            <p className="text-xs text-flame">{errors.message}</p>
          ) : (
            <span />
          )}
          <span className="font-mono text-[11px] text-faint">
            {form.message.length}/1000
          </span>
        </div>
      </div>

      {status === "error" && (
        <div className="flex items-start gap-3 rounded-xl border border-flame/30 bg-flame/10 p-4">
          <FiAlertCircle className="mt-0.5 shrink-0 text-flame" />
          <p className="text-xs leading-relaxed text-bone/90">{serverError}</p>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 border-t border-line pt-5">
        <p className="font-mono text-[11px] leading-relaxed text-faint">
          Reviews are checked before publishing.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-bone px-6 py-3 font-display text-sm font-medium text-ink transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit review"}
          <FiSend />
        </button>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*  Modal                                                                      */
/* -------------------------------------------------------------------------- */

function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/80 p-4 backdrop-blur-md sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Leave a review"
            className="my-8 w-full max-w-2xl rounded-3xl border border-line bg-ink-2 p-6 shadow-2xl sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-bone">
                  Leave a review
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  If we've worked together, I'd love to hear how it went.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-bone"
              >
                <FiX />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export default function Reviews() {
  const [reviews, setReviews] = useState(seedTestimonials);
  const [open, setOpen] = useState(false);
  const [usingSeed, setUsingSeed] = useState(true);

  const load = async () => {
    try {
      const live = await fetchReviews();
      if (live.length > 0) {
        setReviews(live);
        setUsingSeed(false);
      }
    } catch {
      // Backend down or not configured — seed data stays. Never surface this
      // to a visitor; it isn't their problem.
    }
  };

  useEffect(() => {
    load();
  }, []);

  const summary = useMemo(() => {
    if (reviews.length === 0) return { avg: 0, count: 0 };
    const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    return { avg: total / reviews.length, count: reviews.length };
  }, [reviews]);

  return (
    <Section id="reviews" className="border-t border-line/60">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people say after working with me."
          lead="Unfiltered feedback from the people who signed the brief."
        />

        <Reveal delay={0.15}>
          <div className="flex items-center gap-5 rounded-2xl border border-line bg-ink-2 px-6 py-5">
            <div>
              <div className="font-display text-4xl font-semibold text-bone">
                {summary.avg.toFixed(1)}
              </div>
              <Stars rating={Math.round(summary.avg)} />
            </div>
            <div className="h-12 w-px bg-line" />
            <div className="text-sm text-muted">
              from
              <br />
              <span className="font-display text-bone">
                {summary.count} review{summary.count === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {usingSeed && (
        <Reveal className="mt-8">
          <p className="rounded-xl border border-flame/25 bg-flame/[0.07] px-4 py-3 font-mono text-[11px] leading-relaxed text-flame/90">
            Dev note (delete once live): these are placeholder testimonials from
            src/data/testimonials.js. Replace them with real quotes — approved
            reviews from your API take over automatically.
          </p>
        </Reveal>
      )}

      {/* Masonry columns keep uneven quote lengths from leaving big gaps. */}
      <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {reviews.map((review, i) => (
          <ReviewCard key={review._id || i} review={review} index={i} />
        ))}
      </div>

      {/* CTA */}
      <Reveal className="mt-12">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-ink-2 to-ink-3 px-8 py-12 text-center">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-cyan/15 blur-[100px]" />

          <div className="relative">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-bone sm:text-3xl">
              Worked with me before?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              Leave a review — it takes a minute, and it genuinely helps the next
              client decide.
            </p>
            <div className="mt-8 flex justify-center">
              <MagneticButton onClick={() => setOpen(true)}>
                <FiStar /> Write a review
              </MagneticButton>
            </div>
          </div>
        </div>
      </Reveal>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ReviewForm onClose={() => setOpen(false)} onSubmitted={load} />
      </Modal>
    </Section>
  );
}
