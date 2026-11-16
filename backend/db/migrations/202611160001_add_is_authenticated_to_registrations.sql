-- Migration: Add is_authenticated and authenticated_at to dhanda_business_registrations
-- Run this in the Supabase SQL Editor

ALTER TABLE public.dhanda_business_registrations 
ADD COLUMN IF NOT EXISTS is_authenticated boolean NOT NULL DEFAULT false;

ALTER TABLE public.dhanda_business_registrations 
ADD COLUMN IF NOT EXISTS authenticated_at timestamptz;

-- Update the complete_dhanda_business_registration function so it marks the row as authenticated
-- instead of deleting it, keeping an audit trail of authenticated vs unauthenticated registrations.
CREATE OR REPLACE FUNCTION public.complete_dhanda_business_registration(
  p_owner_email text,
  p_auth_user_id uuid
)
RETURNS TABLE (
  business_id uuid,
  registered_at timestamptz,
  launch_bonus_id uuid,
  reward_starts_at timestamptz,
  reward_ends_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_registration public.dhanda_business_registrations;
  v_business public.dhanda_businesses;
  v_campaign public.dhanda_campaigns;
  v_promotion public.dhanda_promotions;
  v_campaign_id uuid;
BEGIN
  SELECT * INTO v_registration
  FROM public.dhanda_business_registrations
  WHERE lower(owner_email) = lower(p_owner_email)
    AND expires_at > now()
  FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Registration details expired. Please register again.';
  END IF;

  SELECT * INTO v_campaign
  FROM public.dhanda_campaigns
  WHERE enabled = true
    AND now() >= registration_starts_at
    AND now() < registration_ends_at
    AND campus_id = v_registration.campus_id
  ORDER BY registration_starts_at DESC
  LIMIT 1;
  IF FOUND THEN
    v_campaign_id := v_campaign.id;
  END IF;

  INSERT INTO public.dhanda_businesses (
    campus_id, auth_user_id, business_name, owner_name, owner_email, whatsapp,
    tagline, image_url, email_verified_at, registered_at, launch_campaign_id
  ) VALUES (
    v_registration.campus_id, p_auth_user_id, v_registration.business_name,
    v_registration.owner_name, lower(v_registration.owner_email), v_registration.whatsapp,
    v_registration.tagline, v_registration.image_url, now(), now(),
    v_campaign_id
  ) ON CONFLICT DO NOTHING;

  SELECT * INTO v_business
  FROM public.dhanda_businesses
  WHERE lower(owner_email) = lower(p_owner_email)
  FOR UPDATE;
  IF v_business.auth_user_id IS DISTINCT FROM p_auth_user_id THEN
    RAISE EXCEPTION 'This email is already linked to another account.';
  END IF;

  IF v_business.launch_campaign_id IS NOT NULL THEN
    INSERT INTO public.dhanda_promotions (
      campus_id, business_id, campaign_id, tier, category, status, amount_paise,
      business_name, owner_name, whatsapp, tagline, image_url, is_launch_bonus,
      starts_at, ends_at
    ) VALUES (
      v_business.campus_id, v_business.id, v_business.launch_campaign_id,
      v_registration.promotion_tier, v_registration.promotion_category,
      'scheduled', 0, v_business.business_name, v_business.owner_name,
      v_business.whatsapp, v_business.tagline, v_business.image_url, true,
      (SELECT c.reward_starts_at FROM public.dhanda_campaigns c WHERE c.id = v_business.launch_campaign_id),
      (SELECT c.reward_ends_at FROM public.dhanda_campaigns c WHERE c.id = v_business.launch_campaign_id)
    ) ON CONFLICT DO NOTHING RETURNING * INTO v_promotion;

    IF v_promotion.id IS NULL THEN
      SELECT * INTO v_promotion
      FROM public.dhanda_promotions
      WHERE business_id = v_business.id
        AND campaign_id = v_business.launch_campaign_id
        AND is_launch_bonus = true;
    END IF;
  END IF;

  -- Mark the registration as authenticated with timestamp instead of deleting
  UPDATE public.dhanda_business_registrations
  SET is_authenticated = true, authenticated_at = now()
  WHERE id = v_registration.id;

  RETURN QUERY SELECT
    v_business.id,
    v_business.registered_at,
    v_promotion.id,
    (SELECT c.reward_starts_at FROM public.dhanda_campaigns c WHERE c.id = v_business.launch_campaign_id),
    (SELECT c.reward_ends_at FROM public.dhanda_campaigns c WHERE c.id = v_business.launch_campaign_id);
END;
$$;
