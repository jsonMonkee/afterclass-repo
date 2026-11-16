-- Afterclass production persistence. Run this in the Supabase SQL Editor before
-- enabling the server-side database routes.
create extension if not exists pgcrypto;

create table if not exists public.campuses (
  id text primary key,
  name text not null,
  subdomain text unique not null,
  location text,
  primary_color text not null default '#E11D48',
  created_at timestamptz not null default now()
);

create table if not exists public.clubs (
  id text primary key,
  campus_id text not null references public.campuses(id),
  name text not null,
  tagline text,
  category text not null,
  members_count integer not null default 0,
  lead text,
  verified boolean not null default false,
  avatar text,
  active_events integer not null default 0,
  color text,
  open_roles text,
  tags text[] not null default '{}',
  image text,
  instagram text,
  description text,
  recruitment_status text,
  last_updated timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.dhanda_campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  campus_id text not null references public.campuses(id),
  registration_starts_at timestamptz not null,
  registration_ends_at timestamptz not null,
  reward_starts_at timestamptz not null,
  reward_ends_at timestamptz not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  constraint dhanda_campaign_dates_valid check (
    registration_starts_at < registration_ends_at and reward_starts_at < reward_ends_at
  )
);

create table if not exists public.dhanda_businesses (
  id uuid primary key default gen_random_uuid(),
  campus_id text not null references public.campuses(id),
  auth_user_id uuid unique,
  business_name text not null,
  owner_name text not null,
  owner_email text not null unique check (owner_email = lower(owner_email)),
  whatsapp text not null,
  tagline text,
  image_url text,
  email_verified_at timestamptz,
  registered_at timestamptz,
  launch_campaign_id uuid references public.dhanda_campaigns(id),
  launch_free_claimed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.dhanda_business_registrations (
  id uuid primary key default gen_random_uuid(),
  campus_id text not null references public.campuses(id),
  business_name text not null,
  owner_name text not null,
  owner_email text not null unique check (owner_email = lower(owner_email)),
  whatsapp text not null,
  tagline text,
  image_url text,
  promotion_tier text not null default 'Homepage Main Banner'
    check (promotion_tier in ('Homepage Main Banner','Category Spotlight')),
  promotion_category text,
  requested_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '30 minutes')
);
create unique index if not exists dhanda_registrations_expiry_idx
  on public.dhanda_business_registrations (expires_at);

create table if not exists public.dhanda_listings (
  id text primary key,
  campus_id text not null references public.campuses(id),
  business_id uuid references public.dhanda_businesses(id),
  title text not null,
  seller_name text not null,
  seller_email text,
  semester text,
  category text not null,
  price numeric(10,2) not null check (price >= 0),
  price_unit text,
  turnaround text,
  rating numeric(3,2) not null default 5,
  reviews_count integer not null default 0,
  badge text,
  description text,
  tags text[] not null default '{}',
  image_url text,
  verified_student boolean not null default false,
  escrow_shield boolean not null default true,
  instant_digital_download boolean not null default false,
  contact_number text,
  completed_orders integer not null default 0,
  status text not null default 'active' check (status in ('active','paused','removed')),
  created_at timestamptz not null default now()
);
create index if not exists dhanda_listings_campus_status_idx
  on public.dhanda_listings (campus_id, status, created_at desc);

create table if not exists public.dhanda_promotions (
  id uuid primary key default gen_random_uuid(),
  campus_id text not null references public.campuses(id),
  business_id uuid not null references public.dhanda_businesses(id),
  campaign_id uuid references public.dhanda_campaigns(id),
  tier text not null check (tier in ('Homepage Main Banner','Category Spotlight')),
  category text,
  status text not null check (status in ('pending_payment','scheduled','active','expired','cancelled','failed')),
  amount_paise integer not null default 0 check (amount_paise >= 0),
  business_name text not null,
  owner_name text not null,
  whatsapp text not null,
  tagline text,
  image_url text,
  discount_code text,
  is_launch_bonus boolean not null default false,
  razorpay_order_id text unique,
  razorpay_payment_id text unique,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint dhanda_promotion_dates_valid check (starts_at < ends_at)
);
create index if not exists dhanda_promotions_live_idx
  on public.dhanda_promotions (campus_id, status, starts_at, ends_at);
create unique index if not exists dhanda_promotions_launch_bonus_once
  on public.dhanda_promotions (business_id, campaign_id)
  where is_launch_bonus = true;

create table if not exists public.dhanda_payment_events (
  event_id text primary key,
  event_type text not null,
  razorpay_order_id text,
  razorpay_payment_id text,
  payload jsonb not null,
  received_at timestamptz not null default now()
);

-- Environment-gated API persistence check. Keep RLS enabled and expose no
-- browser policies; only the server-side FastAPI secret key can access it.
create table if not exists public.api_smoke_test_records (
  id uuid primary key default gen_random_uuid(),
  message text not null check (char_length(message) between 1 and 500),
  created_at timestamptz not null default now()
);
create index if not exists api_smoke_test_records_created_at_idx
  on public.api_smoke_test_records (created_at desc);

-- Complete registration and grant the launch offer in one database transaction.
create or replace function public.complete_dhanda_business_registration(
  p_owner_email text,
  p_auth_user_id uuid
) returns table (
  business_id uuid,
  registered_at timestamptz,
  launch_bonus_id uuid,
  reward_starts_at timestamptz,
  reward_ends_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_registration public.dhanda_business_registrations;
  v_business public.dhanda_businesses;
  v_campaign public.dhanda_campaigns;
  v_promotion public.dhanda_promotions;
  v_campaign_id uuid;
begin
  select * into v_registration
  from public.dhanda_business_registrations
  where lower(owner_email) = lower(p_owner_email)
    and expires_at > now()
  for update;
  if not found then
    raise exception 'Registration details expired. Please register again.';
  end if;

  select * into v_campaign
  from public.dhanda_campaigns
  where enabled = true
    and now() >= registration_starts_at
    and now() < registration_ends_at
    and campus_id = v_registration.campus_id
  order by registration_starts_at desc
  limit 1;
  if found then
    v_campaign_id := v_campaign.id;
  end if;

  insert into public.dhanda_businesses (
    campus_id, auth_user_id, business_name, owner_name, owner_email, whatsapp,
    tagline, image_url, email_verified_at, registered_at, launch_campaign_id
  ) values (
    v_registration.campus_id, p_auth_user_id, v_registration.business_name,
    v_registration.owner_name, lower(v_registration.owner_email), v_registration.whatsapp,
    v_registration.tagline, v_registration.image_url, now(), now(),
    v_campaign_id
  ) on conflict do nothing;

  select * into v_business
  from public.dhanda_businesses
  where lower(owner_email) = lower(p_owner_email)
  for update;
  if v_business.auth_user_id is distinct from p_auth_user_id then
    raise exception 'This email is already linked to another account.';
  end if;

  if v_business.launch_campaign_id is not null then
    insert into public.dhanda_promotions (
      campus_id, business_id, campaign_id, tier, category, status, amount_paise,
      business_name, owner_name, whatsapp, tagline, image_url, is_launch_bonus,
      starts_at, ends_at
    ) values (
      v_business.campus_id, v_business.id, v_business.launch_campaign_id,
      v_registration.promotion_tier, v_registration.promotion_category,
      'scheduled', 0, v_business.business_name, v_business.owner_name,
      v_business.whatsapp, v_business.tagline, v_business.image_url, true,
      (select reward_starts_at from public.dhanda_campaigns where id = v_business.launch_campaign_id),
      (select reward_ends_at from public.dhanda_campaigns where id = v_business.launch_campaign_id)
    ) on conflict do nothing returning * into v_promotion;

    if v_promotion.id is null then
      select * into v_promotion
      from public.dhanda_promotions
      where business_id = v_business.id
        and campaign_id = v_business.launch_campaign_id
        and is_launch_bonus = true;
    end if;
  end if;

  delete from public.dhanda_business_registrations where id = v_registration.id;

  return query select
    v_business.id,
    v_business.registered_at,
    v_promotion.id,
    (select c.reward_starts_at from public.dhanda_campaigns c where c.id = v_business.launch_campaign_id),
    (select c.reward_ends_at from public.dhanda_campaigns c where c.id = v_business.launch_campaign_id);
end;
$$;

revoke all on function public.complete_dhanda_business_registration(text,uuid) from public, anon, authenticated;
grant execute on function public.complete_dhanda_business_registration(text,uuid) to service_role;

-- RLS is enabled with no public policies. All reads/writes go through server
-- routes that perform authorization before using the server-only secret key.
alter table public.campuses enable row level security;
alter table public.clubs enable row level security;
alter table public.dhanda_campaigns enable row level security;
alter table public.dhanda_businesses enable row level security;
alter table public.dhanda_business_registrations enable row level security;
alter table public.dhanda_listings enable row level security;
alter table public.dhanda_promotions enable row level security;
alter table public.dhanda_payment_events enable row level security;
alter table public.api_smoke_test_records enable row level security;

insert into public.campuses (id, name, subdomain, location, primary_color)
values ('auk','Amity University Kolkata','auk','Newtown, Kolkata, West Bengal','#E11D48')
on conflict (id) do nothing;

-- Launch month and reward month are calendar months. If this migration is run
-- in November, November registrations receive one selected promotion tier in
-- December. Adjust before opening registrations if the launch date changes.
insert into public.dhanda_campaigns (
  slug, campus_id, registration_starts_at, registration_ends_at,
  reward_starts_at, reward_ends_at
)
values (
  'launch-month-free-promotion','auk',
  date_trunc('month', now()), date_trunc('month', now()) + interval '1 month',
  date_trunc('month', now()) + interval '1 month', date_trunc('month', now()) + interval '2 months'
)
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'afterclass-images', 'afterclass-images', true, 10485760,
  array['image/jpeg','image/png','image/webp']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
