const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1'
).replace(/\/$/, '');

export function apiFetch(path, options = {}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return fetch(`${API_BASE_URL}${normalizedPath}`, {
    credentials: 'include',
    ...options,
  });
}
