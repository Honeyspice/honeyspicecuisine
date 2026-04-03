import React from 'react';
import { getPartnerDashboard } from '../utils/honeyspiceNetwork';

export default function PartnerDashboard() {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const loadDashboard = React.useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getPartnerDashboard();
      setData(response);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#111827]">Partner Dashboard</h1>
        <button
          type="button"
          className="rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm"
          onClick={loadDashboard}
        >
          Refresh
        </button>
      </div>

      {loading && <p className="mt-4 text-sm text-[#4B5563]">Loading dashboard...</p>}
      {error && <p className="mt-4 text-sm text-[#DC2626]">{error}</p>}

      {data && !loading && (
        <>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-[#E5E7EB] p-4">
              <p className="text-sm text-[#6B7280]">Total Orders</p>
              <p className="mt-2 text-2xl font-semibold">{data.metrics?.totalOrders || 0}</p>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] p-4">
              <p className="text-sm text-[#6B7280]">Pending Orders</p>
              <p className="mt-2 text-2xl font-semibold">{data.metrics?.pendingOrders || 0}</p>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] p-4">
              <p className="text-sm text-[#6B7280]">Total Revenue</p>
              <p className="mt-2 text-2xl font-semibold">GBP {data.metrics?.totalRevenue || 0}</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[#E5E7EB] p-4">
            <h2 className="text-lg font-semibold">Partner Nodes</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {(data.partners || []).map((partner) => (
                <div className="rounded-lg bg-[#F9FAFB] p-3" key={partner.id}>
                  <p className="font-medium">{partner.name}</p>
                  <p className="text-sm text-[#6B7280]">{partner.city}</p>
                  <p className="mt-1 text-sm">Assigned: {partner.assignedOrders}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
