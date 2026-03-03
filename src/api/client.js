const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function getApiUrl(path = '') {
  const base = API_BASE.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export function getAuthHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiRequest(path, options = {}) {
  const url = path.startsWith('http') ? path : getApiUrl(path);
  const token = typeof window !== 'undefined' && window.localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(token),
    ...options.headers,
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const err = new Error(res.statusText || 'Request failed');
    err.status = res.status;
    try {
      err.body = await res.json();
    } catch {
      err.body = null;
    }
    throw err;
  }
  return res.json();
}
