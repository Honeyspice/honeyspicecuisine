import React from 'react';
import { askNetworkAssistant, createNetworkOrder } from '../utils/honeyspiceNetwork';
import Menu from './Menu';

const EMPTY_ITEM = { name: '', quantity: 1, unitPrice: 0 };

export default function Order() {
  const [orderSource, setOrderSource] = React.useState('honeyspice');
  const [form, setForm] = React.useState({
    customerName: '',
    customerPhone: '',
    deliveryCity: '',
  });
  const [items, setItems] = React.useState([EMPTY_ITEM]);
  const [prompt, setPrompt] = React.useState('');
  const [assistantMessage, setAssistantMessage] = React.useState('');
  const [result, setResult] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const isSourceSelected = Boolean(orderSource);

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const updateItem = (index, key, value) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        return { ...item, [key]: value };
      })
    );
  };

  const addItem = () => setItems((prev) => [...prev, EMPTY_ITEM]);
  const removeItem = (index) => setItems((prev) => prev.filter((_, i) => i !== index));

  const handleAssistant = async () => {
    setError('');
    try {
      const data = await askNetworkAssistant({
        prompt,
        deliveryCity: form.deliveryCity,
        orderSource,
      });
      setAssistantMessage(data.response || '');
    } catch (err) {
      setError(err.message || 'Unable to reach assistant');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isSourceSelected) {
      setError('Select where you want to order from before submitting.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    setResult(null);

    try {
      const payload = {
        orderSource,
        ...form,
        items: items.map((item) => ({
          name: String(item.name || '').trim(),
          quantity: Number(item.quantity || 1),
          unitPrice: Number(item.unitPrice || 0),
        })),
      };
      const data = await createNetworkOrder(payload);
      setResult(data.order || null);
    } catch (err) {
      setError(err.message || 'Order failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-[#111827]">Start Your Order</h1>
      <p className="mt-2 text-sm text-[#4B5563]">
        Choose a fulfilment option, then continue with menu selection or AI-assisted nearby routing.
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-[#6B7280]">
        <span className="rounded-full bg-[#F3F4F6] px-3 py-1">1. Choose source</span>
        <span className="rounded-full bg-[#F3F4F6] px-3 py-1">2. Select meals</span>
        <span className="rounded-full bg-[#F3F4F6] px-3 py-1">3. Confirm order</span>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            setOrderSource('honeyspice');
            setAssistantMessage('');
            setPrompt('');
          }}
          className={[
            'rounded-xl border p-4 text-left transition',
            orderSource === 'honeyspice'
              ? 'border-[#F59E0B] bg-[#FFFBEB]'
              : 'border-[#E5E7EB] bg-white hover:border-[#D1D5DB]',
          ].join(' ')}
        >
          <p className="text-sm font-semibold text-[#111827]">Order Direct (HoneySpice)</p>
          <p className="mt-1 text-sm text-[#4B5563]">
            Central kitchen fulfilment using the original HoneySpice menu.
          </p>
        </button>
        <button
          type="button"
          onClick={() => setOrderSource('nearby-kitchen')}
          className={[
            'rounded-xl border p-4 text-left transition',
            orderSource === 'nearby-kitchen'
              ? 'border-[#F59E0B] bg-[#FFFBEB]'
              : 'border-[#E5E7EB] bg-white hover:border-[#D1D5DB]',
          ].join(' ')}
        >
          <p className="text-sm font-semibold text-[#111827]">Order Nearby (AI-assisted)</p>
          <p className="mt-1 text-sm text-[#4B5563]">
            AI picks the closest partner kitchen and helps with faster routing.
          </p>
        </button>
      </div>

      {orderSource === 'honeyspice' && (
        <div className="mt-6">
          <Menu />
        </div>
      )}

      {orderSource !== 'honeyspice' && (
      <form className="mt-6 rounded-xl border border-[#E5E7EB] p-5" onSubmit={handleSubmit}>
        <div className="grid gap-3 md:grid-cols-3">
          <input
            className="rounded-lg border border-[#D1D5DB] p-3"
            placeholder="Customer name"
            value={form.customerName}
            onChange={(event) => setField('customerName', event.target.value)}
          />
          <input
            className="rounded-lg border border-[#D1D5DB] p-3"
            placeholder="Customer phone"
            value={form.customerPhone}
            onChange={(event) => setField('customerPhone', event.target.value)}
          />
          <input
            className="rounded-lg border border-[#D1D5DB] p-3"
            placeholder="Delivery city"
            value={form.deliveryCity}
            onChange={(event) => setField('deliveryCity', event.target.value)}
          />
        </div>

        <div className="mt-4 space-y-3">
          {items.map((item, index) => (
            <div className="grid gap-2 md:grid-cols-4" key={`${item.name}-${index}`}>
              <input
                className="rounded-lg border border-[#D1D5DB] p-3 md:col-span-2"
                placeholder="Food item name"
                value={item.name}
                onChange={(event) => updateItem(index, 'name', event.target.value)}
              />
              <input
                className="rounded-lg border border-[#D1D5DB] p-3"
                type="number"
                min="1"
                placeholder="Qty"
                value={item.quantity}
                onChange={(event) => updateItem(index, 'quantity', event.target.value)}
              />
              <div className="flex gap-2">
                <input
                  className="w-full rounded-lg border border-[#D1D5DB] p-3"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Unit price"
                  value={item.unitPrice}
                  onChange={(event) => updateItem(index, 'unitPrice', event.target.value)}
                />
                {items.length > 1 && (
                  <button
                    type="button"
                    className="rounded-lg border border-[#EF4444] px-3 text-[#EF4444]"
                    onClick={() => removeItem(index)}
                  >
                    X
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm"
            onClick={addItem}
          >
            + Add item
          </button>
        </div>

        {orderSource === 'nearby-kitchen' && (
          <div className="mt-6 rounded-lg border border-[#E5E7EB] p-4">
            <h2 className="text-lg font-semibold">AI Assistant</h2>
            <div className="mt-2 flex flex-col gap-2 md:flex-row">
              <input
                className="w-full rounded-lg border border-[#D1D5DB] p-3"
                placeholder="Ask AI for meal or nearest-kitchen advice..."
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
              />
              <button
                type="button"
                className="rounded-lg bg-[#111827] px-4 py-2 text-white"
                onClick={handleAssistant}
              >
                Ask AI
              </button>
            </div>
            {assistantMessage && <p className="mt-3 text-sm text-[#374151]">{assistantMessage}</p>}
          </div>
        )}

        {error && <p className="mt-4 text-sm text-[#DC2626]">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting || !isSourceSelected}
          className="mt-6 rounded-lg bg-[#F59E0B] px-4 py-2 font-semibold text-[#111827] disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : 'Coming soon'}
        </button>
      </form>
      )}

      {result && (
        <div className="mt-6 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-4">
          <p className="text-sm font-semibold text-[#166534]">Order submitted</p>
          <p className="mt-1 text-sm text-[#166534]">
            ID: {result.id} | Routed to: {result.partner?.name} | Source: {result.orderSource}
          </p>
        </div>
      )}
    </div>
  );
}