export function apiUrl(path) {
  const rawBase = (process.env.REACT_APP_API_BASE_URL || '').trim().replace(/\/+$/, '');
  let base = rawBase;

  // Guard against production builds accidentally pointing to localhost.
  // In that case, fall back to same-origin /api routes instead.
  if (rawBase && typeof window !== 'undefined') {
    try {
      const parsedBase = new URL(rawBase, window.location.origin);
      const appHost = window.location.hostname;
      const baseHost = parsedBase.hostname;
      const appIsLocal = appHost === 'localhost' || appHost === '127.0.0.1';
      const baseIsLocal = baseHost === 'localhost' || baseHost === '127.0.0.1';

      if (!appIsLocal && baseIsLocal) {
        base = '';
      }
    } catch {
      // Ignore malformed base URL and allow existing request behavior.
    }
  }

  const p = String(path || '').startsWith('/') ? String(path) : `/${path}`;
  return base ? `${base}${p}` : p;
}

