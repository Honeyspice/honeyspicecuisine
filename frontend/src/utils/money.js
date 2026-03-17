export function formatGBP(amount) {
  const value = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(value);
}

