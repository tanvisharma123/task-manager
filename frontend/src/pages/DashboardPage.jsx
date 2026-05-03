import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchDashboard } from '../api/dashboardApi.js';
import DashboardStats from '../components/dashboard/DashboardStats.jsx';

const DashboardPage = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    fetchDashboard(token)
      .then((res) => setStats(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load dashboard'));
  }, [token]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-slate-600 mt-1">Overview of your task workload and completion progress.</p>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {stats ? (
        <div className="grid gap-4 md:grid-cols-4">
          <DashboardStats title="Total Tasks" value={stats.totalTasks} accent="bg-slate-50" />
          <DashboardStats title="Completed Tasks" value={stats.completedTasks} accent="bg-emerald-50" />
          <DashboardStats title="Pending Tasks" value={stats.pendingTasks} accent="bg-amber-50" />
          <DashboardStats title="Overdue Tasks" value={stats.overdueTasks} accent="bg-rose-50" />
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-6 shadow-sm">Loading dashboard...</div>
      )}
    </div>
  );
};

export default DashboardPage;
