/**
 * Automated Test Suite for Afterclass APIs
 * Runs directly with Node.js: `node tests/api.test.mjs`
 * Verifies Opportunities scrapers, Dhanda marketplace, Auth RBAC, and Clubs APIs.
 */

import assert from 'node:assert/strict';

// Import route handlers directly
import { GET as getPerks } from '../src/app/api/opportunities/student-perks/route.js';
import { GET as getHackathons } from '../src/app/api/opportunities/hackathons/route.js';
import { GET as getDhanda, POST as postDhanda } from '../src/app/api/dhanda/route.js';
import { GET as getPromotions, POST as postPromotion } from '../src/app/api/dhanda/promotions/route.js';
import { POST as authLogin } from '../src/app/api/auth/login/route.js';
import { GET as authSession } from '../src/app/api/auth/session/route.js';
import { GET as getClubs, PATCH as patchClub } from '../src/app/api/clubs/route.js';
import { authenticate } from '../src/utils/auth.js';

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
    failed++;
  }
}

async function runTests() {
  console.log('\n🍌 Running Afterclass Automated API Test Suite...\n');

  // --- 1. STUDENT PERKS (RESOURCIFY) TESTS ---
  console.log('--- 1. Resourceify Student ID Perks API ---');
  await test('GET /api/opportunities/student-perks returns verified student perks', async () => {
    const req = new Request('http://localhost:3000/api/opportunities/student-perks');
    const res = await getPerks(req);
    const json = await res.json();
    assert.equal(res.status, 200);
    assert.equal(json.success, true);
    assert.ok(json.count > 5, 'Should return multiple perks');
    assert.ok(json.data.some(p => p.id === 'perk-github-pack'), 'Should include GitHub pack');
  });

  await test('GET /api/opportunities/student-perks filters by category and search', async () => {
    const req = new Request('http://localhost:3000/api/opportunities/student-perks?category=Developer+Tools&search=JetBrains');
    const res = await getPerks(req);
    const json = await res.json();
    assert.equal(res.status, 200);
    assert.equal(json.success, true);
    assert.equal(json.data[0].provider, 'JetBrains');
  });

  // --- 2. HACKATHONS (UNSTOP/DEVFOLIO) TESTS ---
  console.log('\n--- 2. Unstop & Devfolio Collegiate Hackathons API ---');
  await test('GET /api/opportunities/hackathons returns active hackathons', async () => {
    const req = new Request('http://localhost:3000/api/opportunities/hackathons');
    const res = await getHackathons(req);
    const json = await res.json();
    assert.equal(res.status, 200);
    assert.equal(json.success, true);
    assert.ok(json.count >= 4);
    assert.ok(json.data.some(h => h.platform === 'Unstop'));
  });

  await test('GET /api/opportunities/hackathons filters by tag and search', async () => {
    const req = new Request('http://localhost:3000/api/opportunities/hackathons?tag=Robotics&search=Flipkart');
    const res = await getHackathons(req);
    const json = await res.json();
    assert.equal(res.status, 200);
    assert.equal(json.data.length, 1);
    assert.ok(json.data[0].title.includes('Flipkart GRiD'));
  });

  // --- 3. DHANDA MARKETPLACE TESTS ---
  console.log('\n--- 3. Afterclass Dhanda Student Marketplace API ---');
  await test('GET /api/dhanda returns student listings', async () => {
    const req = new Request('http://localhost:3000/api/dhanda');
    const res = await getDhanda(req);
    const json = await res.json();
    assert.equal(res.status, 200);
    assert.ok(json.data.length >= 5);
  });

  await test('POST /api/dhanda creates a new gig under Afterclass Escrow Shield', async () => {
    const req = new Request('http://localhost:3000/api/dhanda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Custom PCB Soldering & IoT Firmware Flashing',
        seller: 'Devansh K.',
        semester: 'ECE 3rd Year',
        category: 'Tech & Code',
        price: 500,
        priceUnit: 'per board',
        turnaround: '24 Hours',
        contactNumber: '919830099999',
        tags: ['IoT', 'ESP32', 'Soldering']
      })
    });
    const res = await postDhanda(req);
    const json = await res.json();
    assert.equal(res.status, 201);
    assert.equal(json.success, true);
    assert.equal(json.data.title, 'Custom PCB Soldering & IoT Firmware Flashing');
    assert.equal(json.data.escrowShield, true);
  });

  await test('GET & POST /api/dhanda/promotions handles sponsored frontpage banners', async () => {
    const getReq = new Request('http://localhost:3000/api/dhanda/promotions');
    const getRes = await getPromotions(getReq);
    const getJson = await getRes.json();
    assert.equal(getRes.status, 200);
    assert.ok(getJson.banners.length >= 2);
    assert.ok(getJson.pricingTiers.length >= 2);

    const postReq = new Request('http://localhost:3000/api/dhanda/promotions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessName: 'ByteBite Midnight Maggi & Cold Coffee',
        owner: 'Siddharth V.',
        tagline: 'Delivered hot to hostel gates in 15 mins',
        whatsapp: '919830055555',
        tier: 'Homepage Main Banner'
      })
    });
    const postRes = await postPromotion(postReq);
    const postJson = await postRes.json();
    assert.equal(postRes.status, 201);
    assert.equal(postJson.success, true);
    assert.equal(postJson.data.businessName, 'ByteBite Midnight Maggi & Cold Coffee');
  });

  // --- 4. AUTH & RBAC TESTS ---
  console.log('\n--- 4. Authentication & RBAC Security Tests ---');
  await test('POST /api/auth/login rejects invalid credentials', async () => {
    const req = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'fake_user', password: 'wrong_password' })
    });
    const res = await authLogin(req);
    assert.equal(res.status, 401);
  });

  let turingToken = null;
  let superadminToken = null;

  await test('POST /api/auth/login succeeds for Club Lead and returns signed session token', async () => {
    const req = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'club_turing', password: 'password123' })
    });
    const res = await authLogin(req);
    const json = await res.json();
    assert.equal(res.status, 200);
    assert.equal(json.user.role, 'club_lead');
    assert.equal(json.user.clubId, 'turing-club');
    assert.ok(json.token);
    turingToken = json.token;
  });

  await test('POST /api/auth/login succeeds for Superadmin', async () => {
    const req = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'superadmin', password: 'wyrcan_superadmin_2026' })
    });
    const res = await authLogin(req);
    const json = await res.json();
    assert.equal(res.status, 200);
    assert.equal(json.user.role, 'superadmin');
    superadminToken = json.token;
  });

  await test('GET /api/auth/session verifies active session via Bearer Token', async () => {
    const req = new Request('http://localhost:3000/api/auth/session', {
      headers: { 'Authorization': `Bearer ${turingToken}` }
    });
    const res = await authSession(req);
    const json = await res.json();
    assert.equal(res.status, 200);
    assert.equal(json.authenticated, true);
    assert.equal(json.user.username, 'club_turing');
  });

  // --- 5. CLUBS API & RBAC ACCESS TESTS ---
  console.log('\n--- 5. Clubs API & RBAC Authorization Tests ---');
  await test('GET /api/clubs returns all campus societies', async () => {
    const res = await getClubs();
    const json = await res.json();
    assert.equal(res.status, 200);
    assert.ok(json.count >= 5);
  });

  await test('PATCH /api/clubs rejects unauthenticated requests with 401', async () => {
    const req = new Request('http://localhost:3000/api/clubs', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clubId: 'turing-club', openRoles: 'New Hackathon Core Leads' })
    });
    const res = await patchClub(req);
    assert.equal(res.status, 401);
  });

  await test('PATCH /api/clubs rejects unauthorized club lead trying to modify another club with 403', async () => {
    const req = new Request('http://localhost:3000/api/clubs', {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${turingToken}` // Turing lead attempting to modify Cadence club
      },
      body: JSON.stringify({ clubId: 'cadence', openRoles: 'Hacked Roles' })
    });
    const res = await patchClub(req);
    assert.equal(res.status, 403);
  });

  await test('PATCH /api/clubs permits authorized club lead to update their own club', async () => {
    const req = new Request('http://localhost:3000/api/clubs', {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${turingToken}`
      },
      body: JSON.stringify({ 
        clubId: 'turing-club', 
        openRoles: 'AI Agent Researchers & Genesis Hack Volunteers',
        recruitmentStatus: 'CORE RECRUITMENT LIVE'
      })
    });
    const res = await patchClub(req);
    const json = await res.json();
    assert.equal(res.status, 200);
    assert.equal(json.success, true);
    assert.equal(json.data.openRoles, 'AI Agent Researchers & Genesis Hack Volunteers');
  });

  // --- SUMMARY ---
  console.log('\n======================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
