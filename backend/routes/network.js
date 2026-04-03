const express = require('express');

const router = express.Router();

const partnerNodes = [
  { id: 'lagos-central', name: 'Lagos Central Kitchen', city: 'Lagos' },
  { id: 'ikeja-hub', name: 'Ikeja Fulfilment Hub', city: 'Ikeja' },
  { id: 'abuja-main', name: 'Abuja Partner Kitchen', city: 'Abuja' },
];

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

function findPartnerByCity(city) {
  const normalizedCity = String(city || '').trim().toLowerCase();
  if (!normalizedCity) return partnerNodes[0];

  return (
    partnerNodes.find((node) => node.city.toLowerCase() === normalizedCity) ||
    partnerNodes[0]
  );
}

function pickPartner(orderSource, deliveryCity) {
  const source = String(orderSource || '').trim().toLowerCase();
  if (source === 'honeyspice') {
    return partnerNodes[0];
  }
  return findPartnerByCity(deliveryCity);
}

router.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'HoneySpice Network Layer',
    modules: ['Orders API', 'AI Assistant', 'Routing Logic', 'Partner Dashboard'],
  });
});

router.post('/orders', (req, res) => {
  const customerName = String(req.body?.customerName || '').trim();
  const customerPhone = String(req.body?.customerPhone || '').trim();
  const deliveryCity = String(req.body?.deliveryCity || '').trim();
  const orderSource = String(req.body?.orderSource || '').trim().toLowerCase();
  const items = normalizeItems(req.body?.items);

  if (!customerName || !customerPhone || !deliveryCity || items.length === 0 || !orderSource) {
    return res.status(400).json({
      message:
        'orderSource, customerName, customerPhone, deliveryCity and at least one item are required.',
    });
  }

  if (!['honeyspice', 'nearby-kitchen'].includes(orderSource)) {
    return res.status(400).json({
      message: "orderSource must be either 'honeyspice' or 'nearby-kitchen'.",
    });
  }

  const subtotal = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));
  const partner = pickPartner(orderSource, deliveryCity);
  const order = {
    id: `net-${Date.now()}`,
    orderSource,
    customerName,
    customerPhone,
    deliveryCity,
    items,
    subtotal,
    status: 'received',
    partner,
    createdAt: new Date().toISOString(),
  };

  networkOrders.unshift(order);

  return res.status(201).json({
    message: 'Order received by HoneySpice network.',
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
  const city = String(req.body?.deliveryCity || '').trim();
  const orderSource = String(req.body?.orderSource || '').trim().toLowerCase();
  const partner = pickPartner(orderSource, city);

  let response = `Order routing prepared for ${partner.name}.`;
  if (orderSource === 'honeyspice') {
    response = 'You selected HoneySpice direct fulfilment. Your order will be prepared centrally.';
  }
  if (prompt.includes('spicy')) {
    response = 'Try our Suya Bowl or grilled spicy jollof combo for bold flavor.';
  } else if (prompt.includes('quick') || prompt.includes('fast')) {
    response = `Fastest route is ${partner.name} with an estimated prep time of 25 minutes.`;
  } else if (prompt.includes('vegan')) {
    response = 'Recommended vegan combo: Plantain platter + spicy vegetable stew.';
  }

  res.json({
    partner,
    response,
  });
});

router.post('/route', (req, res) => {
  const deliveryCity = String(req.body?.deliveryCity || '').trim();
  const orderSource = String(req.body?.orderSource || '').trim().toLowerCase();
  const partner = pickPartner(orderSource, deliveryCity);

  res.json({
    route: {
      deliveryCity,
      orderSource: orderSource || 'nearby-kitchen',
      partner,
      strategy: 'nearest-available-partner',
    },
  });
});

router.get('/partners/dashboard', (req, res) => {
  const totalRevenue = networkOrders.reduce((sum, order) => sum + order.subtotal, 0);
  const pending = networkOrders.filter((order) => order.status !== 'delivered').length;

  res.json({
    metrics: {
      totalOrders: networkOrders.length,
      pendingOrders: pending,
      totalRevenue: Number(totalRevenue.toFixed(2)),
    },
    partners: partnerNodes.map((partner) => ({
      ...partner,
      assignedOrders: networkOrders.filter((order) => order.partner.id === partner.id).length,
    })),
    recentOrders: networkOrders.slice(0, 10),
  });
});

module.exports = router;
