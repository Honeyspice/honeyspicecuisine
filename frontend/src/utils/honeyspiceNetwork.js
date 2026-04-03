import { apiUrl } from './apiBase';

async function parseJson(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Network request failed');
  }
  return data;
}

export async function createNetworkOrder(payload) {
  const response = await fetch(apiUrl('/api/network/orders'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseJson(response);
}

export async function askNetworkAssistant(payload) {
  const response = await fetch(apiUrl('/api/network/assistant'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return parseJson(response);
}

export async function getPartnerDashboard() {
  const response = await fetch(apiUrl('/api/network/partners/dashboard'));
  return parseJson(response);
}
