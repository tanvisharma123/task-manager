import React from 'react';

const DashboardStats = ({ title, value, accent }) => {
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${accent}`}>
      <p className="text-sm uppercase tracking-wider text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
};

export default DashboardStats;
