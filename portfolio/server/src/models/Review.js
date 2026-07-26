import mongoose from "mongoose";

/**
 * A visitor-submitted review.
 *
 * Nothing reaches the public site until `status` is "approved" — the submit
 * endpoint is open to the internet, so publish-on-write would be an open door
 * for spam and abuse.
 */
const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name is too short"],
      maxlength: [80, "Name is too long"],
    },
    role: { type: String, trim: true, maxlength: 80, default: "" },
    company: { type: String, trim: true, maxlength: 80, default: "" },

    /** Kept private — used to verify the reviewer, never returned publicly. */
    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 160,
      default: "",
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be between 1 and 5"],
      max: [5, "Rating must be between 1 and 5"],
      validate: {
        validator: Number.isInteger,
        message: "Rating must be a whole number",
      },
    },

    message: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
      minlength: [20, "Review must be at least 20 characters"],
      maxlength: [1000, "Review must be under 1000 characters"],
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },

    /** Kept for abuse triage only. */
    meta: {
      ip: { type: String, default: "" },
      userAgent: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

/** Public shape — strips email and moderation metadata. */
reviewSchema.methods.toPublic = function toPublic() {
  return {
    _id: this._id,
    name: this.name,
    role: this.role,
    company: this.company,
    rating: this.rating,
    message: this.message,
    createdAt: this.createdAt,
  };
};

export default mongoose.model("Review", reviewSchema);
