const express = require('express');

const router = express.Router();

const networkOrders = [];

function normalizeItems(rawItems) {
  if (!Array.isArray(rawItems)) return [];

  return rawItems
    .map((item) => {
      const name = String(item?.name || '').trim();
      const quantity = Math.max(1, Number(item?.quantity || 1));
      const unitPrice = Math.max(0, Number(item?.unitPrice || 0));
      if (!name) return null;

      return {
        name,
        quantity,
        unitPrice,
        lineTotal: Number((quantity * unitPrice).toFixed(2)),
      };
    })
    .filter(Boolean);
}

router.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'HoneySpice Kitchen API',
    modules: ['Orders API', 'AI Assistant'],
  });
});

router.post('/orders', (req, res) => {
  const customerName = String(req.body?.customerName || '').trim();
  const customerPhone = String(req.body?.customerPhone || '').trim();
  const deliveryCity = String(req.body?.deliveryCity || '').trim();
  const items = normalizeItems(req.body?.items);

  if (!customerName || !customerPhone || !deliveryCity || items.length === 0) {
    return res.status(400).json({
      message: 'customerName, customerPhone, deliveryCity and at least one item are required.',
    });
  }

  const subtotal = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));
  const order = {
    id: `hs-${Date.now()}`,
    kitchen: 'Honeyspice Kitchen',
    customerName,
    customerPhone,
    deliveryCity,
    items,
    subtotal,
    status: 'received',
    createdAt: new Date().toISOString(),
  };

  networkOrders.unshift(order);

  return res.status(201).json({
    message: 'Order received by Honeyspice Kitchen.',
    order,
  });
});

router.get('/orders', (req, res) => {
  res.json({
    total: networkOrders.length,
    orders: networkOrders,
  });
});

router.post('/assistant', (req, res) => {
  const prompt = String(req.body?.prompt || '').trim().toLowerCase();

  let response = 'Your order will be prepared by Honeyspice Kitchen in Stirling.';
  if (prompt.includes('spicy')) {
    response = 'Try our Suya Bowl or grilled spicy jollof combo for bold flavour.';
  } else if (prompt.includes('quick') || prompt.includes('fast')) {
    response = 'Honeyspice Kitchen typical prep time is 25–30 minutes.';
  } else if (prompt.includes('vegan')) {
    response = 'Recommended vegan combo: Plantain platter + spicy vegetable stew.';
  }

  res.json({ kitchen: 'Honeyspice Kitchen', response });
});

module.exports = router;
