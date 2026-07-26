# Reviews API — Backend

Express + MongoDB API for the portfolio's review system.

**Status**: Production-ready. Submissions are moderated before appearing on the site.

---

## What it does

- **POST** `/api/reviews` — Anyone can submit a review (honeypot-protected, rate-limited)
- **GET** `/api/reviews` — Public: approved reviews only, newest first
- **GET** `/api/reviews/admin/pending` — Admin: pending reviews awaiting approval
- **PATCH** `/api/reviews/admin/:id` — Admin: approve, reject, or un-publish a review
- **DELETE** `/api/reviews/admin/:id` — Admin: remove a review
- **GET** `/api/reviews/admin/stats` — Admin: counts by status

All endpoints are on `http://localhost:4000` by default.

---

## Quick Start

**TL;DR:**

```bash
cp .env.example .env
# Fill in MONGODB_URI, ADMIN_TOKEN, ALLOWED_ORIGINS

npm install
npm run dev

# In another terminal:
npm run cli -- pending
```

See `QUICKSTART.md` for step-by-step setup.

---

## Setup

### 1. MongoDB

Create a free cluster at https://mongodb.com/cloud/atlas:

1. **Create cluster** (shared tier, free)
2. **Create database user** (NOT your account password)
   - Example: user=`reviews`, password=`SecurePass123`
3. **Whitelist IPs**: Allow 0.0.0.0/0 (dev); lock it down in production
4. **Get connection string**: Clusters → Connect → "Connect your application"
   - Format: `mongodb+srv://user:pass@cluster.mongodb.net/`
   - Replace `database` with `portfolio`: add `/portfolio` before the query string

### 2. Environment

```bash
cp .env.example .env
```

Fill in:

```bash
MONGODB_URI=mongodb+srv://reviews:YourPassword@cluster.mongodb.net/portfolio
ALLOWED_ORIGINS=http://localhost:5173
ADMIN_TOKEN=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
PORT=4000
```

### 3. Install & Run

```bash
npm install
npm run dev
```

Server starts on `http://localhost:4000`.

---

## API

### Public endpoints

#### GET `/api/reviews`

Approved reviews, newest first (max 60).

```bash
curl http://localhost:4000/api/reviews
```

Response:
```json
{
  "reviews": [
    {
      "_id": "...",
      "name": "Alice",
      "role": "Product Lead",
      "company": "Acme Inc",
      "rating": 5,
      "message": "Shipped fast, great communication.",
      "createdAt": "2026-07-25T12:34:56Z"
    }
  ]
}
```

#### POST `/api/reviews`

Submit a review (honeypot-protected, rate-limited to 3 per IP per hour).

```bash
curl -X POST http://localhost:4000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "role": "Product Lead",
    "company": "Acme Inc",
    "email": "alice@acme.com",
    "rating": 5,
    "message": "Shipped fast, great communication.",
    "website": ""
  }'
```

- `name` (required): 2–80 chars
- `rating` (required): 1–5
- `message` (required): 20–1000 chars
- `role`, `company`, `email`: optional
- `website`: honeypot field (always empty for humans, disqualifies bots)

Response (always says "ok", even for spam):
```json
{
  "ok": true,
  "message": "Review received and awaiting approval."
}
```

### Admin endpoints

All require `Authorization: Bearer <ADMIN_TOKEN>` header.

#### GET `/api/reviews/admin/pending`

Pending reviews (not yet approved/rejected).

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  http://localhost:4000/api/reviews/admin/pending
```

#### GET `/api/reviews/admin/stats`

Review counts by status.

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  http://localhost:4000/api/reviews/admin/stats
```

Response:
```json
{ "approved": 12, "pending": 3, "rejected": 2, "total": 17 }
```

#### PATCH `/api/reviews/admin/:id`

Approve, reject, or un-publish a review.

```bash
curl -X PATCH \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"approved"}' \
  http://localhost:4000/api/reviews/admin/REVIEW_ID
```

Valid statuses: `"approved"`, `"rejected"`, `"pending"`

#### DELETE `/api/reviews/admin/:id`

Permanently delete a review.

```bash
curl -X DELETE \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  http://localhost:4000/api/reviews/admin/REVIEW_ID
```

---

## CLI

Manage reviews from the command line.

```bash
npm run cli -- pending      # List pending reviews with IDs
npm run cli -- approve ID   # Mark as approved
npm run cli -- reject ID    # Mark as rejected
npm run cli -- remove ID    # Delete permanently
npm run cli -- list         # Show counts
```

---

## Deployment

See `DEPLOYMENT.md` for:

- Render (easiest, free tier works)
- Railway (similar to Render)
- Fly.io (runs everywhere)
- Production checklist

**TL;DR**: Push to GitHub, connect to Render, add env vars, deploy. Takes ~5 minutes.

---

## Security

### Honeypot

The `website` field is hidden from real users (CSS: `display: none`). Bots that auto-fill all fields hit it, and submissions with `website` filled are silently accepted but discarded. Looks like success to the bot, spam never hits the database.

### Rate limiting

3 submissions per IP per 60 minutes. Not a hard stop, just slows bad actors.

### Email privacy

Reviewer emails are **never** returned by the public `/api/reviews` endpoint. Only stored for abuse triage.

### Environment

- ADMIN_TOKEN must be long and random (32 bytes = 256 bits of entropy)
- ALLOWED_ORIGINS locks down CORS to your domain(s) only
- MongoDB password should be strong and unique
- Never commit `.env` (it's in `.gitignore`)

### HTTPS

Always use HTTPS in production. Self-signed certs are fine for dev.

---

## Troubleshooting

**"MONGODB_URI is not set"**  
→ Copy `.env.example` to `.env`, fill it in

**"Connection refused on :4000"**  
→ `npm run dev` might not have started. Check terminal output

**"Reviews not appearing on site"**  
→ Make sure they're marked `status: "approved"`. Use `npm run cli -- pending` to see what's waiting

**"CORS error in browser"**  
→ Check `ALLOWED_ORIGINS` includes your exact URL (protocol + domain)

**"Too many submissions" error**  
→ Rate limit: wait an hour or use a different IP. Dev: adjust `submitLimiter` in `routes/reviews.js`

**MongoDB connection timeout**  
→ Whitelist your IP in MongoDB Atlas (IP Access List). In dev, use `0.0.0.0/0`

---

## File structure

```
server/
├── src/
│   ├── index.js          # Express app, middleware, startup
│   ├── cli.js            # Command-line management tool
│   ├── models/
│   │   └── Review.js     # MongoDB schema + methods
│   └── routes/
│       └── reviews.js    # API endpoints
├── package.json
├── .env.example          # Template (copy to .env)
├── README.md             # This file
├── QUICKSTART.md         # 2-minute setup guide
└── DEPLOYMENT.md         # Production deployment options
```

---

## Next steps

1. **Local dev**: `npm run dev`, submit a review via curl or the form, approve it with the CLI
2. **Deploy**: Follow `DEPLOYMENT.md` (Render recommended, 5 minutes)
3. **Wire frontend**: Set `VITE_API_URL` env var in the portfolio build
4. **Ship**: Review submissions now go live (after approval)

---

## License

MIT. Do whatever you want with it.

---

Questions? Check `QUICKSTART.md` (setup) or `DEPLOYMENT.md` (going live).
