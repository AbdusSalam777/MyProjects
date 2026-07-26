import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

import reviewsRouter from "./routes/reviews.js";

const app = express();
const PORT = process.env.PORT || 4000;

/* ----------------------------- Middleware -------------------------------- */

app.set("trust proxy", 1); // Correct client IPs behind Render/Railway/Fly.
app.use(helmet());
app.use(express.json({ limit: "16kb" }));

/**
 * Only the origins you list may call this API. Set ALLOWED_ORIGINS to a
 * comma-separated list, e.g.
 *   ALLOWED_ORIGINS=https://abdus.dev,http://localhost:5173
 */
const allowed = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Same-origin/server-side requests send no Origin header.
      if (!origin) return callback(null, true);
      if (allowed.length === 0 || allowed.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
  })
);

/* ------------------------------- Routes ---------------------------------- */

app.get("/health", (_req, res) =>
  res.json({
    ok: true,
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  })
);

app.use("/api/reviews", reviewsRouter);

app.use((_req, res) => res.status(404).json({ error: "Not found." }));

// eslint-disable-next-line no-unused-vars -- Express needs the 4-arg signature.
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

/* ------------------------------- Startup --------------------------------- */

async function start() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Copy .env.example to .env first.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }

  app.listen(PORT, () => console.log(`Reviews API listening on :${PORT}`));
}

start();
