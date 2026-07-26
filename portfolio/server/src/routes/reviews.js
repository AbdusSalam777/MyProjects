import express from "express";
import rateLimit from "express-rate-limit";
import Review from "../models/Review.js";

const router = express.Router();

/** Three submissions per IP per hour is generous for a real reviewer. */
const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions. Please try again later." },
});

/** Requires the ADMIN_TOKEN bearer token. */
function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    return res.status(503).json({ error: "Moderation is not configured." });
  }
  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (token !== expected) {
    return res.status(401).json({ error: "Unauthorised." });
  }
  next();
}

/* -------------------------------------------------------------------------- */
/*  Public                                                                     */
/* -------------------------------------------------------------------------- */

/** GET /api/reviews — approved reviews, newest first. */
router.get("/", async (_req, res, next) => {
  try {
    const reviews = await Review.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .limit(60);
    res.json({ reviews: reviews.map((r) => r.toPublic()) });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/reviews — submit a review for moderation.
 * Always responds with the same success message so the endpoint can't be
 * used to probe which submissions were silently dropped.
 */
router.post("/", submitLimiter, async (req, res, next) => {
  try {
    const { name, role, company, email, rating, message, website } = req.body ?? {};

    // Honeypot: real users never fill a hidden field. Accept, then discard.
    if (website) {
      return res.status(201).json({ ok: true, message: "Review received." });
    }

    const review = new Review({
      name,
      role,
      company,
      email,
      rating,
      message,
      status: "pending",
      meta: {
        ip: req.ip ?? "",
        userAgent: (req.get("user-agent") ?? "").slice(0, 300),
      },
    });

    await review.save();

    res.status(201).json({
      ok: true,
      message: "Review received and awaiting approval.",
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const first = Object.values(err.errors)[0];
      return res.status(400).json({ error: first?.message ?? "Invalid review." });
    }
    next(err);
  }
});

/* -------------------------------------------------------------------------- */
/*  Admin / Moderation                                                         */
/* -------------------------------------------------------------------------- */

/** GET /api/reviews/admin/pending — everything awaiting a decision. */
router.get("/admin/pending", requireAdmin, async (_req, res, next) => {
  try {
    const reviews = await Review.find({ status: "pending" }).sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (err) {
    next(err);
  }
});

/** GET /api/reviews/admin/stats — review counts by status. */
router.get("/admin/stats", requireAdmin, async (_req, res, next) => {
  try {
    const approved = await Review.countDocuments({ status: "approved" });
    const pending = await Review.countDocuments({ status: "pending" });
    const rejected = await Review.countDocuments({ status: "rejected" });
    res.json({ approved, pending, rejected, total: approved + pending + rejected });
  } catch (err) {
    next(err);
  }
});

/** PATCH /api/reviews/admin/:id — { status: "approved" | "rejected" }. */
router.patch("/admin/:id", requireAdmin, async (req, res, next) => {
  try {
    const { status } = req.body ?? {};
    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!review) return res.status(404).json({ error: "Review not found." });
    res.json({ ok: true, review });
  } catch (err) {
    next(err);
  }
});

/** DELETE /api/reviews/admin/:id */
router.delete("/admin/:id", requireAdmin, async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found." });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
