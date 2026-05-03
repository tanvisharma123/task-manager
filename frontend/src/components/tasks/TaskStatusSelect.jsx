import React from 'react';

const statusOptions = [
  { value: 'pending', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Done' },
];

const TaskStatusSelect = ({ currentStatus, onChange, disabled }) => {
  return (
    <select
      value={currentStatus}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:border-slate-800 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-100"
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default TaskStatusSelect;
