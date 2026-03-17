const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

function requireStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    const err = new Error('Stripe is not configured (missing STRIPE_SECRET_KEY)');
    err.status = 500;
    throw err;
  }
  return new Stripe(key);
}

router.post('/create-checkout-session', async (req, res, next) => {
  try {
    const stripe = requireStripe();
    const { items, customer } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const line_items = items.map((i) => {
      const quantity = Math.max(1, Number(i.quantity || 1));
      const unit_amount = Math.round(Number(i.price || 0) * 100);

      return {
        quantity,
        price_data: {
          currency: 'gbp',
          unit_amount,
          product_data: {
            name: String(i.name || 'Item'),
          },
        },
      };
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${frontendUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/checkout/cancel`,
      customer_email: customer?.email ? String(customer.email) : undefined,
      metadata: {
        source: 'honeyspice-web',
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
});

router.get('/checkout-session/:id', async (req, res, next) => {
  try {
    const stripe = requireStripe();
    const id = String(req.params.id || '').trim();
    if (!id) return res.status(400).json({ message: 'Missing session id' });

    const session = await stripe.checkout.sessions.retrieve(id);
    res.json({
      id: session.id,
      status: session.status, // 'complete' when finished
      payment_status: session.payment_status, // 'paid' when paid
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email || session.customer_email || null,
      metadata: session.metadata || {},
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

