// Single source of truth for the backend origin.
//
// There used to be two conventions. `AuthContext` read REACT_APP_API_URL with a
// silent `|| 'http://localhost:5000'` fallback, while this module read
// REACT_APP_API_BASE_URL. Only the second is set in production, so the auth
// code compiled down to the bare localhost literal and every login, register,
// profile and meal plan request on the live site was fired at localhost:5000.
//
// One variable name now, REACT_APP_API_BASE_URL, and one resolution path.

const RAW_BASE = (process.env.REACT_APP_API_BASE_URL || '').trim().replace(/\/+$/, '');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Local development convenience only. The backend runs on 5000 by default, so an
// unset variable on a dev machine should still work. This is deliberately NOT
// applied in production, which is the bug this module exists to prevent.
const DEV_FALLBACK = 'http://localhost:5000';

function isLocalHostname(hostname) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

// Returns a human readable reason the API base is unusable, or null if it is fine.
// Only ever non-null in a production build.
function describeMisconfiguration() {
  if (!IS_PRODUCTION) return null;
  if (!RAW_BASE) return 'REACT_APP_API_BASE_URL is not set';
  try {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost';
    const parsed = new URL(RAW_BASE, origin);
    if (isLocalHostname(parsed.hostname)) {
      return `REACT_APP_API_BASE_URL points at ${parsed.hostname}, which is unreachable from a deployed site`;
    }
  } catch {
    return `REACT_APP_API_BASE_URL is not a valid URL: ${RAW_BASE}`;
  }
  return null;
}

const MISCONFIGURATION = describeMisconfiguration();
const RESOLVED_BASE = RAW_BASE || (IS_PRODUCTION ? '' : DEV_FALLBACK);

// Surface it immediately on load as well as on first request, so a broken deploy
// is obvious in the console even before anyone tries to sign in.
if (MISCONFIGURATION && typeof console !== 'undefined') {
  console.error(
    `[HoneySpice] Backend API is misconfigured: ${MISCONFIGURATION}. ` +
      'Set REACT_APP_API_BASE_URL to the backend origin and redeploy the frontend.'
  );
}

export const isApiConfigured = () => MISCONFIGURATION === null;

// The resolved origin, with no trailing slash. Empty string means same origin.
export const apiBase = () => RESOLVED_BASE;

// Build a full API URL. Throws in production when the base is missing or points
// at localhost, so requests fail loudly with a clear configuration error rather
// than silently disappearing.
export function apiUrl(path) {
  if (MISCONFIGURATION) {
    throw new Error(
      `HoneySpice backend is not configured: ${MISCONFIGURATION}. ` +
        'Set REACT_APP_API_BASE_URL to the backend origin, for example ' +
        'https://honeyspicecuisine.onrender.com, and redeploy the frontend.'
    );
  }
  const p = String(path || '').startsWith('/') ? String(path) : `/${path}`;
  return RESOLVED_BASE ? `${RESOLVED_BASE}${p}` : p;
}
