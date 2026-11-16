'use client';

import { createClient } from '@supabase/supabase-js';

let browserClient;

export async function uploadImage(file, scope, options = {}) {
  const authorization = options.token ? { Authorization: `Bearer ${options.token}` } : {};
  const signResponse = await fetch('/api/uploads/sign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authorization,
      ...(options.clubId ? { 'x-club-id': options.clubId } : {})
    },
    body: JSON.stringify({ scope, fileType: file.type, fileSize: file.size })
  });

  const signed = await signResponse.json();
  if (!signResponse.ok || !signed.success) {
    throw new Error(signed.error || signed.detail || 'Could not prepare the upload.');
  }

  // 1. Cloudinary Direct CDN Upload (25 GB free storage, auto WebP optimization)
  if (signed.provider === 'cloudinary') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', signed.uploadPreset);
    if (signed.folder) formData.append('folder', signed.folder);

    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`,
      { method: 'POST', body: formData }
    );
    const cloudData = await cloudRes.json();
    if (!cloudRes.ok || !cloudData.secure_url) {
      throw new Error(cloudData.error?.message || 'Cloudinary upload failed.');
    }
    return cloudData.secure_url;
  }

  // 2. Development / Demo Mock Fallback
  if (signed.provider === 'mock') {
    return signed.publicUrl;
  }

  // 3. Supabase Storage Signed Upload
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    if (signed.publicUrl) return signed.publicUrl;
    throw new Error('Public Supabase URL and publishable key are not configured.');
  }

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
