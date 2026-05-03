import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div>
          <Link to="/dashboard" className="text-xl font-semibold text-slate-900">
            Task Manager
          </Link>
        </div>

        <nav className="flex items-center gap-4 text-sm text-slate-600">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-slate-900">
                Dashboard
              </Link>
              <Link to="/projects" className="hover:text-slate-900">
                Projects
              </Link>
              <Link to="/tasks" className="hover:text-slate-900">
                Tasks
              </Link>
              <span className="font-medium text-slate-700">{user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded bg-slate-900 px-3 py-1 text-white hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-slate-900">
                Login
              </Link>
              <Link to="/signup" className="hover:text-slate-900">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
