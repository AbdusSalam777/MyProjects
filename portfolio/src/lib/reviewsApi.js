/**
 * Client for the reviews API (see /server).
 *
 * Set VITE_API_URL in .env.local to point at your deployed backend. If it's
 * unset or unreachable the UI falls back to seed testimonials rather than
 * showing an error — a portfolio should never look broken because a side
 * service is down.
 */

const BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";

/** True when a backend URL has been configured at build time. */
export const isApiConfigured = Boolean(BASE);

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      ...options,
    });

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new ApiError(
        body.error || `Request failed (${res.status})`,
        res.status
      );
    }
    return body;
  } finally {
    clearTimeout(timeout);
  }
}

/** Approved reviews, newest first. Returns [] when no backend is configured. */
export async function fetchReviews() {
  if (!isApiConfigured) return [];
  const data = await request("/api/reviews");
  return Array.isArray(data.reviews) ? data.reviews : [];
}

/**
 * Submit a review. It lands in the database as `pending` and only appears on
 * the site once approved — this endpoint is public, so anything else would be
 * an open door for spam.
 */
export async function submitReview(payload) {
  if (!isApiConfigured) {
    throw new ApiError(
      "Reviews aren't connected yet. Please email me instead.",
      0
    );
  }
  return request("/api/reviews", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export { ApiError };
