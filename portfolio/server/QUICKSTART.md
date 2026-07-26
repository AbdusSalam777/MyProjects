# Quick Start

Get the reviews API running locally in 2 minutes.

## 1. Setup

```bash
cd server
cp .env.example .env
```

Edit `.env`:
- For **MONGODB_URI**: Create a free MongoDB Atlas cluster at https://mongodb.com/cloud/atlas
  - Create a database user (not your account password)
  - Get the connection string from "Connect" → "Connect your application"
  - Paste it here, replace `<password>` with your DB user password
  - Should look like: `mongodb+srv://user:pass@cluster.mongodb.net/portfolio`

- For **ADMIN_TOKEN**: Open a terminal and run:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
  Paste the output into `.env`

- For **ALLOWED_ORIGINS**: Set to `http://localhost:5173` (your dev frontend)

## 2. Run

```bash
npm install
npm run dev
```

You'll see:
```
MongoDB connected
Reviews API listening on :4000
```

## 3. Test

In another terminal:

```bash
# Check health
curl http://localhost:4000/health

# Get approved reviews (empty at first)
curl http://localhost:4000/api/reviews

# Submit a test review
curl -X POST http://localhost:5173/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "role": "Product Lead",
    "company": "Acme Inc",
    "email": "alice@acme.com",
    "rating": 5,
    "message": "Abdus shipped our feature faster than any contractor we've hired. Highly recommend."
  }'

# Check pending reviews
npm run cli -- pending

# Approve the review (copy ID from output above)
npm run cli -- approve <ID>

# See it live
curl http://localhost:4000/api/reviews
```

## 4. Wire it to the frontend

Create `.env.local` in the portfolio root:

```bash
VITE_API_URL=http://localhost:4000
```

Restart your Vite dev server (`npm run dev` in the portfolio directory).

Now when you submit a review form on the site, it goes to your local backend instead of the fallback.

## 5. Deploy

When ready to ship:

1. Push both directories (portfolio + server) to GitHub
2. Deploy server to Render/Railway/Fly (see `DEPLOYMENT.md`)
3. Get the live API URL (e.g., `https://portfolio-reviews.onrender.com`)
4. Set `VITE_API_URL` in your Netlify/Vercel build config
5. Redeploy the frontend

## Managing reviews in production

```bash
npm run cli -- pending          # See what's waiting
npm run cli -- approve <id>     # Make one public
npm run cli -- list             # See counts
```

Or use the API directly:

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://portfolio-reviews.onrender.com/api/reviews/admin/pending
```

---

**Need help?** See `README.md` for full docs, or `DEPLOYMENT.md` for production setup.
