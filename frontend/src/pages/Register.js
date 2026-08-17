import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../utils/apiBase';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(apiUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      await login(data.token);
      navigate('/menu');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F46A06 0%, #FF8D3D 50%, #D45A00 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: 'white', borderRadius: 20, padding: '48px 40px', width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#F46A06', letterSpacing: '-0.5px' }}>HoneySpice</div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#999', letterSpacing: '4px', marginBottom: 20 }}>CUISINE</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>Create your account</h1>
          <p style={{ color: '#666', marginTop: 6, fontSize: '0.9rem' }}>Get your personalised meal plan</p>
        </div>

        {error && (
          <div style={{ background: '#fff3f0', border: '1px solid #ffccc7', color: '#c0392b', padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid #e0e0e0', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#F46A06'}
            onBlur={e => e.target.style.borderColor = '#e0e0e0'}
          />
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid #e0e0e0', fontSize: '0.95rem', outline: 'none' }}
            onFocus={e => e.target.style.borderColor = '#F46A06'}
            onBlur={e => e.target.style.borderColor = '#e0e0e0'}
          />
          <input
            type="password"
            placeholder="Password (8+ chars, 1 uppercase, 1 number, 1 special)"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
            style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid #e0e0e0', fontSize: '0.95rem', outline: 'none' }}
            onFocus={e => e.target.style.borderColor = '#F46A06'}
            onBlur={e => e.target.style.borderColor = '#e0e0e0'}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ padding: '14px', background: loading ? '#ccc' : '#F46A06', color: 'white', border: 'none', borderRadius: 10, fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
            onMouseOver={e => !loading && (e.target.style.background = '#D45A00')}
            onMouseOut={e => !loading && (e.target.style.background = '#F46A06')}
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, color: '#666', fontSize: '0.875rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#F46A06', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
