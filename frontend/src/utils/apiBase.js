export function apiUrl(path) {
  const base = (process.env.REACT_APP_API_BASE_URL || '').trim().replace(/\/+$/, '');
  const p = String(path || '').startsWith('/') ? String(path) : `/${path}`;
  return base ? `${base}${p}` : p;
}

