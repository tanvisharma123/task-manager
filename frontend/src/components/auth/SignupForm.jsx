import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState('');
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldError('');
    setError('');

    if (name.trim().length < 2) {
      setFieldError('Please enter your name.');
      return;
    }
    if (!validateEmail(email)) {
      setFieldError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setFieldError('Password must be at least 6 characters long.');
      return;
    }

    try {
      await signup({ name, email, password, role });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        {fieldError && <p className="text-sm text-red-500 mb-4">{fieldError}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-800 focus:outline-none"
            placeholder="Your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-800 focus:outline-none"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-800 focus:outline-none"
            placeholder="Choose a password"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-800 focus:outline-none"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-slate-900 text-white py-2 rounded-md hover:bg-slate-700">
          Signup
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
