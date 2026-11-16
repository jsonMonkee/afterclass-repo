# 🍌 Afterclass — Amity University Kolkata

> *"Amity placement cell aur official WhatsApp groups se thak chuke ho? Welcome to Afterclass, bsdk."*

Afterclass is the high-energy, Arc-inspired student commons for **Amity University Kolkata**. Built because official campus portals look like they were coded in 2004 by someone's chacha on dial-up internet, and important fest notices get buried under 500 "Good Morning beta" forwards in unmoderated groups.

Made with pure adrenaline, Red Arc energy (`#E11D48`), and zero corporate BS by the bhaiyas at **[wyrcan.io](https://wyrcan.io)**.

---

## ⚡ What is this?

- **Campus Societies & Clubs Directory** — All student collectives (Turing, Cadence, E-Cell, NatyaRang) with live recruitment callouts and actual working links.
- **Official (Unfiltered) Campus Gazette** — Verified circulars posted without botla admin gatekeeping. Sealed by real students.
- **Off-Campus Opportunities** — Real hackathons and gigs jo actually portfolio mein count hote hain. Amity placement cell ki tarah 1.5 LPA sales roles chipka ke "100% placed" nahi chillate hum.
- **Choto Bantu AI 2.0 🍌** — Campus AI companion jo batayega fest kab hai, auditions kahan hain, aur canteen mein kya khana layak hai.
- **Kinetic Arc UI** — Smooth scalloped edges, Lenis smooth scrolling, GSAP kinetic reveal typography, and pure red-blooded aesthetics.

---

## 🛠️ Tech Stack (Khaandaani Setup)

- **Frontend:** Next.js 16 (App Router + Turbopack), in `frontend/`
- **Backend:** FastAPI (Python), in `backend/`
- **Database:** Supabase Postgres, accessed by the backend using a server-only key
- **Styling:** Tailwind CSS + Custom Arc Design Tokens (`#E11D48`, `#881337`, `#FFFDF5`)
- **Animation:** GSAP (`ScrollTrigger`), Lenis Smooth Scroll
- **Icons:** Lucide React
- **Built by:** [wyrcan.io](https://wyrcan.io) team

---

## 🚀 Local Run (Aukaat Setup)

Clone karo, install maaro, aur chalao:

```powershell
# 1. Clone repository
git clone https://github.com/Wyrcan-io/afterclass.git
cd afterclass

# 2. Dependencies install karo (node_modules ka vajan 300MB+)
npm install

# 3. Configure the frontend
Copy-Item frontend/.env.example frontend/.env.local
# 4. Configure the backend
Copy-Item backend/.env.example backend/.env
# Add Supabase URL and server secret key to backend/.env.
# Replace the AUTH_SESSION_SECRET placeholder in backend/.env with a long random value.
# Run backend/db/migrations/202611140001_initial_afterclass.sql in Supabase SQL Editor.
# Seed the starter campus/clubs/listings after the migration:
npm run db:seed

# 5. Install and run the API in one terminal
python -m venv backend/.venv
backend/.venv/Scripts/python.exe -m pip install -e "backend[dev]"
npm run backend:dev

# 6. Run the frontend in another terminal
npm run dev
```

Frontend: `http://localhost:3000`
FastAPI docs: `http://localhost:8100/docs`

The root `npm install` installs the frontend workspace. All server credentials belong in `backend/.env`; only the Supabase publishable key, Supabase URL, backend path, and Razorpay checkout public key belong in `frontend/.env.local`. Every API request is handled by FastAPI and proxied by Next.js rewrites. For a direct API write/read check, follow [`backend/db/README.md`](backend/db/README.md). Razorpay can be configured later; Supabase Auth email delivery is required for Dhanda business verification. See [`HANDOFF.md`](HANDOFF.md) for feature details.

---

## 🤝 Contribution

Agar tum Amity ke student ho aur code karna aata hai (chatgpt se copy-paste nahi, actual code), PR bhej do. Faltu styling bugs daale toh reject maar denge.

---

**Built with ♥ and red bull for Amity by Amitians.**  
*Afterclass nahi kiya toh kya kiya?*
