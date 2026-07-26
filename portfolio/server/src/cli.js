#!/usr/bin/env node
import "dotenv/config";
import mongoose from "mongoose";
import Review from "./models/Review.js";

const cmd = process.argv[2];
const id = process.argv[3];

async function connect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set in .env");
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

async function pending() {
  await connect();
  const reviews = await Review.find({ status: "pending" }).sort({ createdAt: -1 });
  if (reviews.length === 0) {
    console.log("No pending reviews.");
    return;
  }
  reviews.forEach((r, i) => {
    console.log(
      `\n[${i + 1}] ${r.name} ${r.company ? `@ ${r.company}` : ""} (${r.role})`
    );
    console.log(`    ⭐ ${r.rating}/5`);
    console.log(`    "${r.message.slice(0, 80)}..."`);
    console.log(`    ID: ${r._id}`);
    console.log(`    Email: ${r.email || "(not provided)"}`);
  });
  console.log(`\nTotal: ${reviews.length} pending`);
}

async function approve(reviewId) {
  if (!reviewId) {
    console.error("Usage: npm run cli -- approve <id>");
    process.exit(1);
  }
  await connect();
  const review = await Review.findByIdAndUpdate(
    reviewId,
    { status: "approved" },
    { new: true }
  );
  if (!review) {
    console.error("Review not found.");
    process.exit(1);
  }
  console.log(`✓ Approved: ${review.name} (${review.rating}⭐)`);
}

async function reject(reviewId) {
  if (!reviewId) {
    console.error("Usage: npm run cli -- reject <id>");
    process.exit(1);
  }
  await connect();
  const review = await Review.findByIdAndUpdate(
    reviewId,
    { status: "rejected" },
    { new: true }
  );
  if (!review) {
    console.error("Review not found.");
    process.exit(1);
  }
  console.log(`✗ Rejected: ${review.name}`);
}

async function remove(reviewId) {
  if (!reviewId) {
    console.error("Usage: npm run cli -- remove <id>");
    process.exit(1);
  }
  await connect();
  const review = await Review.findByIdAndDelete(reviewId);
  if (!review) {
    console.error("Review not found.");
    process.exit(1);
  }
  console.log(`🗑️  Deleted: ${review.name}`);
}

async function list() {
  await connect();
  const approved = await Review.countDocuments({ status: "approved" });
  const pending = await Review.countDocuments({ status: "pending" });
  const rejected = await Review.countDocuments({ status: "rejected" });
  console.log(`
Reviews status:
  ✓ Approved:  ${approved}
  ⏳ Pending:   ${pending}
  ✗ Rejected:  ${rejected}
  ───────────
     Total:   ${approved + pending + rejected}
  `);
}

(async () => {
  try {
    switch (cmd) {
      case "pending":
        await pending();
        break;
      case "approve":
        await approve(id);
        break;
      case "reject":
        await reject(id);
        break;
      case "remove":
        await remove(id);
        break;
      case "list":
        await list();
        break;
      default:
        console.log(`
Reviews CLI

Commands:
  npm run cli -- list                List review counts
  npm run cli -- pending             Show pending reviews with IDs
  npm run cli -- approve <id>        Approve a review
  npm run cli -- reject <id>         Reject a review
  npm run cli -- remove <id>         Delete a review

Set MONGODB_URI and ADMIN_TOKEN in .env first.
        `);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
})();
