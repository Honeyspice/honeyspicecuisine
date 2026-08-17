import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../utils/apiBase';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      await login(data.token);
      navigate('/menu');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 0% 0%, rgba(244,106,6,0.18) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(255,139,61,0.14) 0%, transparent 50%)
          `,
        }}
      />
      <div className="relative w-[90%] max-w-[420px] rounded-[16px] bg-white px-8 py-10 shadow-lg">
        <div className="mb-6 text-center">
          <span className="text-[28px] font-extrabold tracking-tight text-[#F46A06]">HoneySpice</span>
          <p className="mt-0.5 text-[13px] font-medium text-[#888]">CUISINE</p>
        </div>

        <h1 className="text-center text-[22px] font-bold text-[#1a1a1a]">Welcome back</h1>
        <p className="mt-1 text-center text-[14px] text-[#888]">Sign in to your account</p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-center text-[13px] text-red-600">
            {error}
          </div>
        )}

        <form className="mt-7" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={values.email}
              onChange={e => setValues(v => ({ ...v, email: e.target.value }))}
              required
              className="w-full rounded-[8px] border border-[#CCCCCC] bg-white px-3 py-3 text-[14px] text-[#333] placeholder:text-[#999] focus:border-[#F46A06] focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={e => setValues(v => ({ ...v, password: e.target.value }))}
              required
              className="w-full rounded-[8px] border border-[#CCCCCC] bg-white px-3 py-3 text-[14px] text-[#333] placeholder:text-[#999] focus:border-[#F46A06] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !values.email || !values.password}
            className="mt-7 h-12 w-full rounded-[10px] bg-[#F46A06] text-[15px] font-bold text-white transition-colors hover:bg-[#D45A00] disabled:cursor-not-allowed disabled:bg-[#CCCCCC]"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <div className="mt-5 text-center">
            <Link to="/register" className="text-[14px] font-medium text-[#F46A06] hover:underline">
              No account? Register for free
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
