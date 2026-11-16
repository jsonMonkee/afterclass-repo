import nextEnv from '@next/env';
const { loadEnvConfig } = nextEnv;
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'node:url';
import { campusClubs } from '../../frontend/src/data/amityData.js';
import { dhandaListings, sponsoredBanners } from '../../frontend/src/data/dhandaData.js';

loadEnvConfig(fileURLToPath(new URL('..', import.meta.url)));

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SECRET_KEY in backend/.env before seeding.');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
});

const campus = {
  id: 'auk',
  name: 'Amity University Kolkata',
  subdomain: 'auk',
  location: 'Newtown, Kolkata, West Bengal',
  primary_color: '#E11D48'
};

async function upsert(table, rows, conflict = 'id') {
  if (!rows.length) return;
  const { error } = await supabase.from(table).upsert(rows, { onConflict: conflict });
  if (error) throw new Error(`${table}: ${error.message}`);
  console.log(`Seeded ${rows.length} ${table} rows.`);
}

await upsert('campuses', [campus]);
await upsert('clubs', campusClubs.map(club => ({
  id: club.id,
  campus_id: 'auk',
  name: club.name,
  tagline: club.tagline,
  category: club.category,
  members_count: club.membersCount,
  lead: club.lead,
  verified: club.verified,
  avatar: club.avatar,
  active_events: club.activeEvents,
  color: club.color,
  open_roles: club.openRoles,
  tags: club.tags,
  image: club.image,
  instagram: club.instagram,
  description: club.description,
  recruitment_status: 'RECRUITING NOW'
})));

await upsert('dhanda_listings', dhandaListings.map(item => ({
  id: item.id,
  campus_id: 'auk',
  title: item.title,
  seller_name: item.seller,
  semester: item.semester,
  category: item.category,
  price: item.price,
  price_unit: item.priceUnit,
  turnaround: item.turnaround,
  rating: item.rating,
  reviews_count: item.reviewsCount,
  badge: item.badge,
  description: item.description,
  tags: item.tags,
  image_url: item.imageUrl || null,
  verified_student: item.verifiedAmityEmail,
  escrow_shield: item.escrowShield,
  instant_digital_download: Boolean(item.instantDigitalDownload),
  contact_number: item.contactNumber,
  completed_orders: item.completedOrders,
  status: 'active'
})));

const seedBusinesses = sponsoredBanners.map((banner, index) => {
  const suffix = index + 1;
  return {
    id: `00000000-0000-4000-8000-${String(suffix).padStart(12, '0')}`,
    campus_id: 'auk',
    business_name: banner.businessName,
    owner_name: banner.owner,
    owner_email: `showcase-${suffix}@afterclass.invalid`,
    whatsapp: banner.whatsapp,
    tagline: banner.tagline,
    image_url: banner.image,
    email_verified_at: new Date().toISOString(),
    registered_at: new Date().toISOString()
  };
});
await upsert('dhanda_businesses', seedBusinesses);

const now = Date.now();
const showcasePromotions = sponsoredBanners.map((banner, index) => ({
  id: `00000000-0000-4000-8000-${String(index + 101).padStart(12, '0')}`,
  campus_id: 'auk',
  business_id: seedBusinesses[index].id,
  tier: 'Homepage Main Banner',
  status: 'active',
  amount_paise: 29900,
  business_name: banner.businessName,
  owner_name: banner.owner,
  whatsapp: banner.whatsapp,
  tagline: banner.tagline,
  image_url: banner.image,
  discount_code: banner.discountCode,
  starts_at: new Date(now - 86400000).toISOString(),
  ends_at: new Date(now + 365 * 86400000).toISOString()
}));
await upsert('dhanda_promotions', showcasePromotions);

console.log('Seed complete. Showcase promotions use reserved .invalid emails and are not login accounts.');
