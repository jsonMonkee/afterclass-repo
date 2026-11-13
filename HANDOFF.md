# 🍌 Afterclass — Developer Handoff Briefing

Welcome to the **Afterclass** codebase. This document outlines everything that has been implemented, how the system is architected, how to run and test it locally, and the exact roadmap of tasks ready for you to pick up next.

---

## ⚡ 1. Architecture & Tech Stack

- **Framework:** Next.js 16 (App Router in `src/app/`) + React 19
- **Styling:** Tailwind CSS v4 + Arc Brutalist Design System (`#E11D48` crimson, `#881337` burgundy, `#FFFDF5` warm cream, bold 2.5px black borders, `shadow-[5px_5px_0px_#000000]`)
- **Animations & Physics:** GSAP (ScrollTrigger) & Lenis smooth scrolling
- **State & Data Layer:** React Context (`AppContext.jsx`) with local hydration, centralized data mocks in `src/data/`, and modular API route handlers in `src/app/api/`
- **Testing:** Native Node.js ESM test suite (`tests/api.test.mjs`) runnable via `npm test`

---

## 🚀 2. Recent Major Implementations

### A. Opportunities Engine (`/opportunities`)
- **Resourceify Student ID Perks (`/api/opportunities/student-perks`):**
  - Aggregator & scraper API serving verified student discounts (GitHub Student Developer Pack, JetBrains All Products, Spotify Student 50% off, Apple Education Store, Notion Plus 100% free, Figma Pro, Canva Pro, AWS Educate, Autodesk).
  - Search, category filter pills, estimated savings tracker, and "How to Claim" walkthrough modals.
- **Internal Product 1 — Job Hunter Portal:**
  - Interactive full-screen workbench drawer (`JobHunterModal.jsx`) displaying curated tech and creative internships (`src/data/jobPortalData.js`) with stipends, tech stack requirements, and 1-click apply action.
- **Internal Product 2 — AI Resume Tailor:**
  - Interactive ATS workbench (`ResumeTailorModal.jsx`) featuring target role ATS score simulation, keyword density checks, and an AI Quantified Bullet Enhancer using Google's XYZ framework.
- **Collegiate Hackathons Radar (`/api/opportunities/hackathons`):**
  - Live feed aggregating collegiate hackathons from Unstop, Devfolio, and MLH (`src/data/hackathonsData.js`) with prize pools, eligibility tags, deadline countdowns, and direct registration links.

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
- **Campus Subdomain Registry (`src/config/campuses.js` & `src/utils/campusResolver.js`):** Scalable architecture for `auk.afterclass.com`, `delhi.afterclass.com`, `jnu.afterclass.com`.
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

## 📋 5. Next Tasks / Backlog for You

Here are the highest-impact items ready for you to build:

### Task 1: Supabase / PostgreSQL Persistence
- **Current State:** API handlers currently use in-memory runtime arrays and local data files (`src/data/`).
- **Goal:** Connect a Supabase project or PostgreSQL database using Prisma or Drizzle ORM.
- **Reference:** The complete SQL schema is already defined in `FUTURE_ROADMAP.md` (tables for `campuses`, `clubs`, `dhanda_listings`, and `sponsored_ads`).

### Task 2: Razorpay / Cashfree Ad Checkout
- **Current State:** The "Promote Your Business" modal books slots with a simulated approval.
- **Goal:** Implement `POST /api/payments/create-order` and `POST /api/payments/webhook` using Razorpay standard checkout so student businesses can pay ₹299/week via UPI directly on-site.

### Task 3: Wildcard Subdomain Routing Deployment
- **Current State:** `src/utils/campusResolver.js` handles subdomain parsing from request headers.
- **Goal:** Add Next.js Edge Middleware (`middleware.js`) and configure `*.afterclass.com` on Vercel / Cloudflare DNS to automatically route subdomains to their campus context.

### Task 4: Image Upload Integration (Cloudinary or S3)
- **Current State:** Image URLs are entered via text inputs or use Unsplash placeholders.
- **Goal:** Add an upload widget in the Club Lead studio (`/admin`) and Dhanda post modal to allow student leads to upload posters and product photos directly.

### Task 5: Campus Whisper Board
- **Current State:** Community links route to Discord / WhatsApp / Telegram.
- **Goal:** Build an anonymous, rate-limited student confessions & query feed on `/whispers` with automated toxicity filtering.

---

*All tests are green. The foundation is solid. Good luck with the next sprint!*
