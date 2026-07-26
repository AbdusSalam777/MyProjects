# Full Stack Portfolio Setup Guide

Complete instructions for running and deploying your new portfolio site.

---

## Part 1: Running Locally

### Frontend

```bash
# From portfolio root
npm install
npm run dev
```

Open http://localhost:5173

### Backend (optional, for live reviews)

```bash
# In server/ directory
cd server
cp .env.example .env
# Edit .env with MongoDB URI and ADMIN_TOKEN
npm install
npm run dev
```

Server runs on http://localhost:4000

### Wire them together

Create `.env.local` in portfolio root:

```bash
VITE_API_URL=http://localhost:4000
```

Restart Vite. Now the review form submits to your local backend.

---

## Part 2: Customize Before Launch

### 1. Update your company list

Edit `src/data/clients.js`:

```javascript
{
  name: "Real Company Name",
  logo: "/logos/company.svg",  // Drop SVG in public/logos/
  description: "What you built, the outcome",
  role: "Your title",
  period: "2025 — Present",
  tags: ["React", "Node.js"],
  url: "https://company.com",
  featured: true  // Shows at top
}
```

### 2. Update your projects

Edit `src/data/projects.js` — yours are already there, just update descriptions if needed.

### 3. Update your profile

Edit `src/data/site.js`:
- `name`, `email`, `phone`, `location`
- `stats` (projects shipped, response time, etc.)
- `signals` (trust/credibility statements)

### 4. Update testimonials

Edit `src/data/testimonials.js` — replace placeholders with real quotes (or leave them as fallback while you gather reviews).

### 5. Add a resume

Drop a PDF at `public/resume.pdf`. The download button is already wired.

### 6. Update homepage intro

Edit `src/pages/HomePage.jsx` — the quick-nav section intro text

---

## Part 3: Deploy Frontend

### Netlify (easiest)

1. Push portfolio to GitHub
2. Go to https://app.netlify.com → New site from Git
3. Connect GitHub repo, choose main branch
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variable:
   ```
   VITE_API_URL = https://portfolio-reviews.onrender.com
   ```
   (or leave blank to use seed testimonials)
7. Deploy

Your site is live at `https://portfolio-1234.netlify.app` (custom domain available in settings)

### Vercel

1. Push to GitHub
2. Import project at https://vercel.com
3. Set `VITE_API_URL` env var
4. Deploy

---

## Part 4: Deploy Backend (optional, for live reviews)

The review form works without the backend (shows seed testimonials), but deploying the backend lets visitors actually submit reviews.

### Render (recommended)

1. Push server to GitHub (same repo or separate)
2. Go to https://dashboard.render.com → New → Web Service
3. Connect repo, configure:
   - Build: `npm install`
   - Start: `npm start`
   - Add env vars: `MONGODB_URI`, `ADMIN_TOKEN`, `ALLOWED_ORIGINS`
4. Deploy

Takes ~1 minute, lives at `https://portfolio-reviews.onrender.com` (or your name)

### Other options

- Railway: Similar to Render, same setup
- Fly.io: Runs everywhere, requires card but free tier exists
- See `server/DEPLOYMENT.md` for full details

### After deploying backend

1. Get the live API URL (e.g., `https://portfolio-reviews.onrender.com`)
2. Update `VITE_API_URL` in your frontend's build config
3. Redeploy the frontend

---

## Part 5: Managing Reviews

### Locally

```bash
cd server
npm run cli -- pending          # See what's waiting
npm run cli -- approve <id>     # Make one public
npm run cli -- list             # See counts
```

### Production

Same commands work against the deployed API with the right `.env` or using bearer token auth:

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://portfolio-reviews.onrender.com/api/reviews/admin/pending
```

---

## Checklist Before Launch

- [ ] **Company list** updated with real companies and descriptions
- [ ] **Projects** descriptions look good
- [ ] **Profile** (name, email, location) correct in `src/data/site.js`
- [ ] **Resume** PDF at `public/resume.pdf`
- [ ] **Testimonials** — either real quotes or live backend connected
- [ ] **Frontend** built and deployed to Netlify/Vercel
- [ ] **Backend** deployed (if using live reviews)
- [ ] **Env vars** set in frontend build config (`VITE_API_URL`)
- [ ] **Custom domain** set up (Netlify settings)
- [ ] **MongoDB** free cluster created
- [ ] **ADMIN_TOKEN** stored securely (not in code)

---

## Key Files to Know

### Frontend
- `src/pages/` — Route pages (Home, Work, Projects, etc.)
- `src/components/` — Reusable components
- `src/data/` — All content (clients, projects, site profile)
- `.env.local` — Local API URL (dev only)

### Backend
- `server/src/index.js` — Express app
- `server/src/models/Review.js` — MongoDB schema
- `server/src/routes/reviews.js` — API endpoints
- `server/src/cli.js` — Command-line admin tool
- `server/.env` — Database and API secrets

---

## Ongoing Maintenance

### Adding new companies

1. Edit `src/data/clients.js`
2. Drop logo in `public/logos/`
3. Redeploy frontend

### Approving reviews

```bash
cd server
npm run cli -- pending
npm run cli -- approve <id>
```

### Updating projects/skills

Edit `src/data/projects.js` or `src/data/skills.js`, commit, redeploy.

### Monthly backups

MongoDB Atlas free tier keeps 30 days of backups automatically.

---

## Troubleshooting

**Reviews form shows an error**  
→ Check `VITE_API_URL` is set and the backend is running

**Review submitted but doesn't appear**  
→ It's probably pending. Check `npm run cli -- pending` and approve it

**"Cannot find module" error**  
→ Run `npm install` in both portfolio and server directories

**CORS errors in browser**  
→ Check `ALLOWED_ORIGINS` in server `.env` includes your site URL

**Site loads but nothing renders**  
→ Open browser console (F12) → look for JavaScript errors

---

## Next: Go Live

1. Finish customization (see Part 2 above)
2. Deploy frontend to Netlify/Vercel
3. (Optional) Deploy backend to Render
4. Test reviews work end-to-end
5. Share the link!

You're ready. The site is designed to impress hirers immediately — the 3D hero, the companies grid, the detailed projects, smooth routing. Go ship it. 🚀
