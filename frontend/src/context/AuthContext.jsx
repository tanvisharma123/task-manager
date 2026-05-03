import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginRequest, signupRequest } from '../api/authApi.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('tm_user');
    const storedToken = localStorage.getItem('tm_token');
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch {
        localStorage.removeItem('tm_user');
        localStorage.removeItem('tm_token');
      }
    }
    setLoading(false);
  }, []);

  const saveSession = (session) => {
    localStorage.setItem('tm_user', JSON.stringify(session.user));
    localStorage.setItem('tm_token', session.token);
    setUser(session.user);
    setToken(session.token);
  };

  const login = async (email, password) => {
    const response = await loginRequest({ email, password });
    saveSession(response.data);
    return response.data;
  };

  const signup = async (payload) => {
    const response = await signupRequest(payload);
    saveSession(response.data);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('tm_user');
    localStorage.removeItem('tm_token');
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({ user, token, login, signup, logout, loading }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
