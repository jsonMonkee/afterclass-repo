# 🍌 Afterclass — Future Architecture & Product Roadmap

**Document:** Engineering & Business Roadmap  
**Team:** Wyrcan.io & Amity Afterclass Core Team  
**Scope:** Scaling from Amity University Kolkata (`auk.afterclass.com`) to 50+ collegiate campuses nationwide.

---

## 1. Multi-Tenant Subdomain Infrastructure (`auk.afterclass.com`, etc.)

Currently, the codebase contains the centralized campus registry in [`src/config/campuses.js`](file:///c:/Users/abhir/OneDrive/Documents/afterclass/src/config/campuses.js) and the hostname resolver in [`src/utils/campusResolver.js`](file:///c:/Users/abhir/OneDrive/Documents/afterclass/src/utils/campusResolver.js).

### Production Multi-Tenant Setup:
1. **Wildcard DNS:**
   - Configure DNS record: `*.afterclass.com -> CNAME cname.vercel-dns.com` (or Cloudflare proxy).
2. **Next.js Edge Middleware (`middleware.js`):**
   ```javascript
   import { NextResponse } from 'next/server';
   import { resolveCampusFromHost } from './src/utils/campusResolver';

   export function middleware(request) {
     const host = request.headers.get('host');
     const campus = resolveCampusFromHost(host);

     const response = NextResponse.next();
     response.headers.set('x-afterclass-campus', campus.id);
     return response;
   }

   export const config = {
     matcher: ['/((?!_next|api|favicon.ico).*)']
   };
   ```
3. **Data Segregation:**
   - Database queries will scope all records (`events`, `clubs`, `notices`, `dhanda`) by `campus_id` (e.g. `WHERE campus_id = 'auk'`).

---

## 2. Monetization & Payment Gateway Integration

### Monetization Channels:
| Revenue Stream | Model | Projected Yield |
| :--- | :--- | :--- |
| **Homepage Sponsored Banners** | Flat fee: ₹299 / week | ₹12,000 / month / campus |
| **Category Pinned Spotlight Cards** | Flat fee: ₹149 / week | ₹18,000 / month / campus |
| **Instant Digital Asset Downloads** | 10% platform fee on notes & solved PYQ packs | ₹5,000 / month / campus |
| **Afterclass Escrow Shield** | 2.5% transaction protection fee on orders > ₹1,000 | ₹10,000 / month / campus |

### Payment Gateway Architecture (Razorpay / Cashfree):
- Route: `POST /api/payments/create-order`
  - Generates Razorpay order for ad slot or notes download.
- Route: `POST /api/payments/webhook`
  - Verifies HMAC SHA256 signature and activates the sponsored banner slot automatically in the database.

---

## 3. Database Architecture (Supabase / PostgreSQL Schema)

When migrating from mock in-memory data to production persistence:

```sql
-- 1. CAMPUSES TABLE
CREATE TABLE campuses (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  subdomain VARCHAR(50) UNIQUE NOT NULL,
  location TEXT,
  primary_color VARCHAR(10) DEFAULT '#E11D48',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CLUBS TABLE
CREATE TABLE clubs (
  id VARCHAR(50) PRIMARY KEY,
  campus_id VARCHAR(20) REFERENCES campuses(id),
  name VARCHAR(150) NOT NULL,
  category VARCHAR(80) NOT NULL,
  tagline TEXT,
  description TEXT,
  open_roles TEXT,
  recruitment_status VARCHAR(50),
  members_count INT DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DHANDA (MARKETPLACE) TABLE
CREATE TABLE dhanda_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campus_id VARCHAR(20) REFERENCES campuses(id),
  seller_name VARCHAR(100) NOT NULL,
  seller_email VARCHAR(150) NOT NULL,
  title VARCHAR(200) NOT NULL,
  category VARCHAR(80) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  turnaround VARCHAR(50),
  description TEXT,
  whatsapp_number VARCHAR(20),
  escrow_shield BOOLEAN DEFAULT TRUE,
  verified_student BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SPONSORED ADS TABLE
CREATE TABLE sponsored_ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campus_id VARCHAR(20) REFERENCES campuses(id),
  business_name VARCHAR(150) NOT NULL,
  owner_name VARCHAR(100) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  tier VARCHAR(50) NOT NULL,
  image_url TEXT,
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) DEFAULT 'ACTIVE'
);
```

---

## 4. The Campus Whisper Board (Anonymous Student Commons)

### Concept:
A moderated, rate-limited anonymous micro-bulletin where students can ask questions ("Has Prof. X released mid-term marks?", "Anyone selling sem 5 lab manuals?") without administrative surveillance.

### Technical & Safety Strategy:
1. **Zero Logging of Identity:** Content is indexed with one-way salted hashes to prevent doxxing.
2. **AI Toxicity Guard:** Gemini / Cloudflare AI worker filters hate speech, profanity, and targeted harassment prior to insertion.
3. **Upvote / Downvote Dynamics:** Community consensus buries low-signal noise.

---

## 5. Free-Tier Optimization Strategy

To keep infrastructure cost at ₹0 until substantial ad revenue:
1. **Frontend & Next.js Routes:** Hosted on Vercel Hobby / Cloudflare Pages.
2. **Chat Communities:** Hosted on Discord & Telegram (zero server RAM overhead).
3. **Media Storage:** Cloudinary free tier or Supabase Storage (1GB free).
4. **Scrapers:** Incremental Static Regeneration (ISR) with 6-hour caching to prevent unnecessary API overhead.
