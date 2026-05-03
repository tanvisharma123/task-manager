import React from 'react';
import TaskStatusSelect from './TaskStatusSelect.jsx';

const TaskTable = ({ tasks, onStatusChange, user }) => {
  if (!tasks.length) {
    return <div className="rounded-2xl bg-white p-6 text-slate-600 shadow-sm">No tasks available.</div>;
  }

  const canUpdate = (task) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return task.assignee?._id === user._id;
  };

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wide text-slate-600">Task</th>
            <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wide text-slate-600">Project</th>
            <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wide text-slate-600">Assignee</th>
            <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wide text-slate-600">Due Date</th>
            <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wide text-slate-600">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {tasks.map((task) => (
            <tr key={task._id} className="hover:bg-slate-50">
              <td className="px-4 py-4 text-sm text-slate-900">
                <div className="font-medium">{task.title}</div>
                <div className="text-slate-500">{task.description || 'No description'}</div>
              </td>
              <td className="px-4 py-4 text-sm text-slate-900">{task.project?.title || 'Unknown'}</td>
              <td className="px-4 py-4 text-sm text-slate-900">{task.assignee?.name || 'Unassigned'}</td>
              <td className="px-4 py-4 text-sm text-slate-900">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'None'}</td>
              <td className="px-4 py-4 text-sm text-slate-900">
                <TaskStatusSelect
                  currentStatus={task.status}
                  onChange={(status) => onStatusChange(task._id, status)}
                  disabled={!canUpdate(task)}
                />
                {!canUpdate(task) && (
                  <p className="mt-2 text-xs text-slate-500">Only assigned users can update this task.</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
