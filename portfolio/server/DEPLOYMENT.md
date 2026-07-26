# Deployment Guide

Deploy the reviews API to the cloud in minutes. Choose your platform.

## Prerequisites

1. A MongoDB Atlas cluster (free tier: https://www.mongodb.com/cloud/atlas)
2. An ADMIN_TOKEN (generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
3. Your site's URL (e.g., `https://abdus.dev`)

## Render

Fastest and cheapest — free tier has enough for a small-scale API.

### Setup

1. Push this repo to GitHub
2. Go to https://dashboard.render.com → New → Web Service
3. Connect your GitHub repo
4. Configure:
   - **Name**: `portfolio-reviews`
   - **Runtime**: Node
   - **Build command**: `npm install`
   - **Start command**: `npm start`
   - **Plan**: Free (fine for hobby projects)

5. Add environment variables:
   ```
   MONGODB_URI = mongodb+srv://user:pass@cluster.mongodb.net/portfolio
   ALLOWED_ORIGINS = https://abdus.dev,https://www.abdus.dev
   ADMIN_TOKEN = (your long random string)
   PORT = (leave blank, Render assigns it)
   NODE_ENV = production
   ```

6. Deploy — it's live in ~1 minute

### After deploy

Render gives you a URL like `https://portfolio-reviews.onrender.com`. Set this as `VITE_API_URL` in your frontend build config (Netlify env vars).

Test it:
```bash
curl https://portfolio-reviews.onrender.com/health
```

---

## Railway

Similar to Render, also generous free tier.

### Setup

1. Go to https://railway.app → New Project → Deploy from GitHub
2. Select this repo
3. Go to Variables and add:
   ```
   MONGODB_URI
   ALLOWED_ORIGINS
   ADMIN_TOKEN
   ```
4. Go to Settings → Generate Domain
5. Your API is live at the assigned domain

---

## Fly.io

Runs everywhere, great uptime. Requires a credit card (but free tier exists).

### Setup

1. Install flyctl: `curl -L https://fly.io/install.sh | sh`
2. `fly auth login`
3. `cd server && fly launch`
   - Fly detects Node automatically
   - Choose a region close to your users
4. Set secrets:
   ```bash
   fly secrets set MONGODB_URI="mongodb+srv://..."
   fly secrets set ALLOWED_ORIGINS="https://abdus.dev"
   fly secrets set ADMIN_TOKEN="your-token"
   ```
5. `fly deploy`

Your API runs at `https://portfolio-reviews.fly.dev` (or your chosen app name).

---

## Vercel

If you're already using Vercel for the frontend, deploy the backend as a function-based API.

**Note**: This requires restructuring the backend into Vercel Functions. Use Render/Railway/Fly instead for a simpler setup.

---

## MongoDB Atlas Setup

Free tier is plenty:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster (shared)
3. Create a database user (NOT your account password)
4. Whitelist IP: 0.0.0.0/0 (allows any IP; production should be more restrictive)
5. Get the connection string (looks like `mongodb+srv://user:pass@cluster.mongodb.net/`)
6. Replace `database` with `portfolio` in the string, e.g.:
   ```
   mongodb+srv://user:pass@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

---

## Managing Reviews

### Via CLI

```bash
npm run cli -- pending          # See pending reviews
npm run cli -- approve <id>     # Approve one
npm run cli -- reject <id>      # Reject one
npm run cli -- remove <id>      # Delete one
npm run cli -- list             # See counts
```

### Via curl (if you have ADMIN_TOKEN)

List pending:
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  https://portfolio-reviews.onrender.com/api/reviews/admin/pending
```

Approve:
```bash
curl -X PATCH -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"approved"}' \
  https://portfolio-reviews.onrender.com/api/reviews/admin/REVIEW_ID
```

---

## Testing Locally

```bash
cd server
cp .env.example .env
# Edit .env with a real MongoDB URI and ADMIN_TOKEN

npm run dev
# Server runs on :4000

# In another terminal, test:
curl http://localhost:4000/health

# Submit a test review:
curl -X POST http://localhost:4000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Reviewer",
    "role": "Client",
    "company": "Acme",
    "email": "test@example.com",
    "rating": 5,
    "message": "This is a test review from the command line."
  }'

# Approve it:
npm run cli -- pending
npm run cli -- approve <id>

# See approved reviews:
curl http://localhost:4000/api/reviews
```

---

## Frontend Integration

Set `VITE_API_URL` in your frontend's `.env.local` or build config:

```bash
# .env.local
VITE_API_URL=https://portfolio-reviews.onrender.com
```

Then rebuild and redeploy the frontend. The review form now submits to your live API instead of falling back to seed data.

---

## Troubleshooting

**"Connection refused" on localhost:4000**  
→ Start the server: `npm run dev`

**"MONGODB_URI is not set"**  
→ Copy `.env.example` to `.env` and fill in the URI

**"Reviews not appearing on the site"**  
→ Make sure they're marked `approved` (use CLI), and `VITE_API_URL` is set correctly

**CORS errors in the browser**  
→ Check `ALLOWED_ORIGINS` includes your site's exact URL (https vs http, www or not)

**"Honeypot" submissions getting through**  
→ The honeypot field name is `website` — check the form isn't accidentally filling it

---

## Security checklist

- [ ] ADMIN_TOKEN is long and random
- [ ] MongoDB password is strong and unique
- [ ] ALLOWED_ORIGINS only lists your site(s)
- [ ] `.env` is in `.gitignore` (never commit credentials)
- [ ] Email addresses are not returned by the public endpoint
- [ ] Rate limiting is active (3 submissions per IP per hour)
