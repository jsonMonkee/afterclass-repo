'use client';

import { createClient } from '@supabase/supabase-js';

let browserClient;

export async function uploadImage(file, scope, options = {}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Public Supabase URL and publishable key are not configured.');

  const authorization = options.token ? { Authorization: `Bearer ${options.token}` } : {};
  const signResponse = await fetch('/api/uploads/sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authorization, ...(options.clubId ? { 'x-club-id': options.clubId } : {}) },
    body: JSON.stringify({ scope, fileType: file.type, fileSize: file.size })
  });
  const signed = await signResponse.json();
  if (!signResponse.ok || !signed.success) throw new Error(signed.error || 'Could not prepare the upload.');

  if (!browserClient) {
    browserClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
    });
  }

  const { error } = await browserClient.storage
    .from(signed.bucket)
    .uploadToSignedUrl(signed.path, signed.token, file, { contentType: file.type, upsert: false });
  if (error) throw new Error('Image upload failed. Please try again.');
  return signed.publicUrl;
}
