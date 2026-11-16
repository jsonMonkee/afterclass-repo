# 🍌 Afterclass — Developer Handoff Briefing

Welcome to the **Afterclass** codebase. This document outlines everything that has been implemented, how the system is architected, how to run and test it locally, and the exact roadmap of tasks ready for you to pick up next.

---

## Current implementation update (November 2026)

The Dhanda launch work now has production-oriented persistence and provider integration points. The project uses a separate Next.js frontend and FastAPI backend:

- `frontend/` contains the Next.js application. `backend/` contains FastAPI modules, database migrations, and Python dependencies.
- `backend/db/migrations/202611140001_initial_afterclass.sql` creates campus, club, Dhanda business, registration, listing, promotion, payment-event, and API smoke-test tables; enables RLS; creates the launch campaign; and provisions a public-read `afterclass-images` bucket with signed uploads.
- Auth, clubs, Dhanda businesses/listings/promotions, opportunities, uploads, and payment webhooks are handled by FastAPI under `/api/v1`. The Next.js frontend contains no API route handlers; rewrites preserve existing frontend URLs.
- The business-promotion flow verifies the owner email through Supabase Auth. A verified business registered during the first calendar month automatically receives one selected promotion tier for the following full calendar month. The database enforces one launch bonus per business; scheduled promotions activate on the first live promotion read during the reward month.
- Paid weekly promotion orders are created server-side through Razorpay, verified against Razorpay’s payment API and checkout signature, and activated only after capture. `/api/payments/webhook` verifies the raw-body signature and records events idempotently.
- Club leads and verified Dhanda businesses can upload JPG, PNG, or WebP images (10 MB maximum) through two-hour signed Supabase Storage upload URLs. The service role key is kept in server-only code.
- Auth session tokens are HMAC-signed. The legacy demo accounts are disabled in production unless `AFTERCLASS_ENABLE_DEMO_ACCOUNTS=true` is explicitly set.

### Supabase setup

1. Copy `frontend/.env.example` to `frontend/.env.local` and `backend/.env.example` to `backend/.env`.
2. Put `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, and `SUPABASE_PUBLISHABLE_KEY` in `backend/.env`. Replace the `AUTH_SESSION_SECRET` placeholder with a long random value.
3. Run `backend/db/migrations/202611140001_initial_afterclass.sql` once in the Supabase SQL Editor. The launch campaign dates are based on the calendar month when the migration runs; run it before launch and adjust the date values if the public launch month differs.
4. From the repository root run `npm install`, create a Python virtual environment, and install `python -m pip install -e "backend[dev]"`.
5. Run `npm run db:seed` to import starter campus, clubs, listings, and showcase promotions.
6. Start FastAPI with `npm run backend:dev` and Next.js with `npm run dev` in a second terminal. The API docs are at `http://localhost:8100/docs`.

### Razorpay and uploads

Razorpay can be configured later by adding `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, and `NEXT_PUBLIC_RAZORPAY_KEY_ID`. Configure the dashboard webhook URL as `/api/payments/webhook` and subscribe to `order.paid` and `payment.captured`. Until these values are set, paid checkout fails with a clear “not configured” response; registrations and launch-month offers continue to work.

Supabase Storage is the selected image provider to reuse the configured Supabase project. The migration creates the bucket, but the upload flow still requires both the server secret and the public URL/publishable key in the local and deployed environment.

The migration and seed were added to the repository but have not been applied to the remote Supabase project from this workspace. Do not enable production traffic until the migration, Auth email delivery, and environment variables are configured.

---

## ⚡ 1. Architecture & Tech Stack

- **Frontend framework:** Next.js 16 (App Router in `frontend/src/app/`) + React 19
- **Backend framework:** FastAPI modules in `backend/app/modules/`
- **Styling:** Tailwind CSS v4 + Arc Brutalist Design System (`#E11D48` crimson, `#881337` burgundy, `#FFFDF5` warm cream, bold 2.5px black borders, `shadow-[5px_5px_0px_#000000]`)
- **Animations & Physics:** GSAP (ScrollTrigger) & Lenis smooth scrolling
- **State & Data Layer:** React Context (`frontend/src/context/AppContext.jsx`) with local hydration, UI fixtures in `frontend/src/data/`, and domain APIs in FastAPI (`backend/app/modules/`)
- **Testing:** Native Node.js ESM test suite (`tests/api.test.mjs`) runnable via `npm test`

---

## 🚀 2. Recent Major Implementations

### A. Opportunities Engine (`/opportunities`)
- **Resourceify Student ID Perks (`/api/opportunities/student-perks`):**
  - Aggregator & scraper API serving verified student discounts (GitHub Student Developer Pack, JetBrains All Products, Spotify Student 50% off, Apple Education Store, Notion Plus 100% free, Figma Pro, Canva Pro, AWS Educate, Autodesk).
  - Search, category filter pills, estimated savings tracker, and "How to Claim" walkthrough modals.
- **Internal Product 1 — Job Hunter Portal:**
  - Interactive full-screen workbench drawer (`JobHunterModal.jsx`) displaying curated tech and creative internships (`frontend/src/data/jobPortalData.js`) with stipends, tech stack requirements, and 1-click apply action.
- **Internal Product 2 — AI Resume Tailor:**
  - Interactive ATS workbench (`ResumeTailorModal.jsx`) featuring target role ATS score simulation, keyword density checks, and an AI Quantified Bullet Enhancer using Google's XYZ framework.
- **Collegiate Hackathons Radar (`/api/opportunities/hackathons`):**
  - Live feed aggregating collegiate hackathons from Unstop, Devfolio, and MLH (`frontend/src/data/hackathonsData.js`) with prize pools, eligibility tags, deadline countdowns, and direct registration links.

### B. Afterclass Dhanda Marketplace (`/dhanda`)
- **Campus Freelance & Commerce Commons:**
  - Designed specifically to solve the *Uber disintermediation problem* (where buyers and sellers bypass transaction fees on WhatsApp).
  - **Monetization Strategy:**
    1. **Sponsored Frontpage Banners (`/api/dhanda/promotions`):** Flat-fee high-visibility slots (Homepage Main Banner at ₹299/week, Category Spotlight at ₹149/week).
    2. **Afterclass Shield Escrow:** Buyer funds locked safely until assignments, custom cakes, or code projects are delivered and approved.
    3. **Verified Amity Badge:** Student identity verification via `@amity.edu` emails.
    4. **Instant Digital Assets:** Instant download micro-transactions for lecture notes and solved exam question papers.
  - Interactive listing browser, "Post a Dhanda" modal, "Promote Your Business" modal, and direct WhatsApp lead generator.

### C. Authentication & Role-Based Access Control (RBAC)
- **Zero Barrier for Students:** Normal students browse everything without logging in.
- **Portal Login (`/login`):**
  - Instant 1-tap demo credentials switcher for three privileged roles:
    1. `club_lead` (`club_turing` / `password123`): Club Management Studio.
    2. `dhanda_vendor` (`vendor_ananya` / `password123`): Dhanda Seller Workbench.
    3. `superadmin` (`superadmin` / `wyrcan_superadmin_2026`): Developer override and platform moderation.
  - Endpoints: `POST /api/auth/login`, `GET /api/auth/session`, `POST /api/auth/logout`.
- **Club Management Studio (`/admin`):**
  - Club leads can edit their society bio, tagline, open recruitment roles, and recruitment status (`PATCH /api/clubs`) with live preview cards.
- **Dhanda Seller Portal (`/dhanda/portal`):**
  - Student vendor workbench to track leads, active orders, and promotional status.

### D. District UI Redesign for Clubs (`/clubs`)
- Replaced generic AI pastel gradient bubbles with authentic **Arc Brutalist District UI** cards (`DistrictClubCard.jsx`).
- Solid black borders, high-contrast offset shadows, custom society identities (Turing electric blue, Cadence neon purple, NatyaRang theater red, E-Cell amber), and live recruitment ribbons.

### E. Dia AI 2.0 (`DiaChatbot.jsx`)
- Upgraded the floating campus chatbot into a high-utility companion:
  - **75% Attendance Bunk Calculator:** Sliders calculate safe skippable classes or needed consecutive attendances to maintain 75%.
  - **Canteen Radar:** Food spots, prices, and timings (Ground floor mess dosa, Amiphoria coffee, Gate 2 Kadambagachhi tapri).
  - **Emergency Dialer:** Quick contact numbers for Security, Medical Room, and the Proctorial Board.

### F. Multi-College Architecture & Community Hub
- **Campus Subdomain Registry (`frontend/src/config/campuses.js` & `frontend/src/utils/campusResolver.js`):** Scalable architecture for `auk.afterclass.com`, `delhi.afterclass.com`, `jnu.afterclass.com`.
- **Free-Tier Community Setup (`CommunityModal.jsx`):** Offloads real-time chatter to official WhatsApp, Discord, and Telegram groups to keep server hosting 100% free with zero memory leaks.

---

## 🛠️ 3. How to Run & Test

```bash
# 1. Install dependencies
npm install

# 2. Run automated API integration tests (15/15 passing)
npm test

# 3. Start local Next.js dev server on port 3000
npm run dev

# 4. Verify production build
npm run build
```

---

## 🔑 4. Demo Accounts for Local Testing

| Role | Username | Password | Access Route | Permissions |
| :--- | :--- | :--- | :--- | :--- |
| **Club Leader** | `club_turing` | `password123` | `/admin` | Edit Turing Club bio, open roles, auditions |
| **Club Leader (Cadence)** | `club_cadence` | `password123` | `/admin` | Edit Cadence Music Society profile |
| **Dhanda Vendor** | `vendor_ananya` | `password123` | `/dhanda/portal` | Manage bakery gigs, view orders and leads |
| **Superadmin (Dev)** | `superadmin` | `wyrcan_superadmin_2026` | `/admin` | Platform-wide verification, ad approvals, logs |

---

## 📋 5. Setup remaining after code

### Supabase persistence

The application code and migration are ready. Apply `backend/db/migrations/202611140001_initial_afterclass.sql` in the configured Supabase project, copy the frontend and backend environment examples, then run `npm run db:seed`. Follow `backend/db/README.md` to verify API writes. API fixture reads are development-only; production database reads/writes fail closed if Supabase is not configured.

### Razorpay

The server order creation, payment verification, and webhook receiver are implemented. Add the Razorpay test keys first, set the Dashboard webhook URL to `/api/payments/webhook`, configure `order.paid` and `payment.captured`, and test a full payment before switching to live keys.

### Supabase Storage

The migration provisions the public-read `afterclass-images` bucket. Apply it and set the Supabase URL, publishable key, and server secret in local/deployment environments before testing club and Dhanda image uploads.

### Still on the product roadmap

- Wildcard subdomain deployment for `*.afterclass.com`.
- Campus Whisper Board with rate limits and moderation.
- Real student order escrow and payouts; the current Escrow Shield interface is still a pilot concept, not a payment escrow implementation.

The API suite currently contains 18 checks. It passed locally during the implementation turn; no remote Supabase migration or live Razorpay charge was run because project credentials were not present in this workspace.

---

*All tests are green. The foundation is solid. Good luck with the next sprint!*
