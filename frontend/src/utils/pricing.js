export function computeFees(subtotal) {
  const st = Math.max(0, subtotal || 0);

  // Simple UK-style structure (can be tuned later):
  // - Delivery: free over £100, otherwise £3.99
  // - Service fee: 5% capped at £2.99
  const deliveryFee = st >= 100 ? 0 : 3.99;
  const serviceFee = Math.min(2.99, st * 0.05);
  const total = st + deliveryFee + serviceFee;

  return { deliveryFee, serviceFee, total };
}

