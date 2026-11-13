/**
 * Authentication and Role-Based Access Control (RBAC) Utility
 * Supports 3 specialized non-student roles:
 * - club_lead: Can manage club profile, events, announcements
 * - dhanda_vendor: Can manage gigs, book promotions
 * - superadmin: Platform developers (Wyrcan) with full override
 */

export const DEMO_ACCOUNTS = [
  {
    username: 'club_turing',
    password: 'password123',
    role: 'club_lead',
    name: 'Turing Club Lead',
    clubId: 'turing-club',
    clubName: 'Amity Turing Club',
    email: 'lead.turing@amity.edu'
  },
  {
    username: 'club_cadence',
    password: 'password123',
    role: 'club_lead',
    name: 'Cadence Music Lead',
    clubId: 'cadence',
    clubName: 'Cadence — The Music Society',
    email: 'lead.cadence@amity.edu'
  },
  {
    username: 'vendor_ananya',
    password: 'password123',
    role: 'dhanda_vendor',
    name: 'Ananya S. (Crumb Theory)',
    businessName: 'The Crumb Theory Bakery',
    email: 'ananya.crumb@amity.edu'
  },
  {
    username: 'superadmin',
    password: 'wyrcan_superadmin_2026',
    role: 'superadmin',
    name: 'Wyrcan Platform Engineer',
    email: 'dev@wyrcan.io'
  }
];

export function authenticate(username, password) {
  const account = DEMO_ACCOUNTS.find(
    acc => acc.username.toLowerCase() === username.trim().toLowerCase() && acc.password === password
  );

  if (!account) return null;

  // Generate lightweight signature token
  const payload = {
    username: account.username,
    role: account.role,
    name: account.name,
    email: account.email,
    clubId: account.clubId || null,
    clubName: account.clubName || null,
    businessName: account.businessName || null,
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  };

  const token = Buffer.from(JSON.stringify(payload)).toString('base64');
  return { user: payload, token };
}

export function verifyToken(token) {
  if (!token) return null;
  try {
    const jsonStr = Buffer.from(token, 'base64').toString('utf-8');
    const data = JSON.parse(jsonStr);
    if (data.exp && data.exp > Date.now()) {
      return data;
    }
    return null;
  } catch (e) {
    return null;
  }
}
