import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('hs_token'));
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (t) => {
    try {
      const res = await fetch(`${API_BASE}/api/mealplan/profile`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (!res.ok) throw new Error('Unauthorized');
      const data = await res.json();
      setUser(data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, [token, fetchProfile]);

  const login = async (newToken) => {
    localStorage.setItem('hs_token', newToken);
    setToken(newToken);
    setLoading(true);
    await fetchProfile(newToken);
  };

  const logout = () => {
    localStorage.removeItem('hs_token');
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  const refreshUser = () => token && fetchProfile(token);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, refreshUser, API_BASE }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
