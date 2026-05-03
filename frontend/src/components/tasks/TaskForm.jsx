import React, { useMemo, useState } from 'react';

const statusOptions = [
  { value: 'pending', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Done' },
];

const TaskForm = ({ onCreate, projects }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const selectedProject = useMemo(
    () => projects.find((projectItem) => projectItem._id === project),
    [project, projects]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }
    if (!project) {
      setError('Please select a project.');
      return;
    }

    onCreate({ title, description, project, assignee, status, dueDate });
    setTitle('');
    setDescription('');
    setProject('');
    setAssignee('');
    setStatus('pending');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold">Create Task</h3>
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div>
        <label className="block mb-1 text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-800 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Project</label>
        <select
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-800 focus:outline-none"
          required
          disabled={!projects.length}
        >
          <option value="">{projects.length ? 'Select project' : 'No projects available'}</option>
          {projects.map((projectOption) => (
            <option value={projectOption._id} key={projectOption._id}>
              {projectOption.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Assignee</label>
        <select
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-800 focus:outline-none"
        >
          <option value="">Unassigned</option>
          {selectedProject?.members?.map((member) => (
            <option value={member._id} key={member._id}>
              {member.name} ({member.email})
            </option>
          ))}
          {selectedProject?.owner && (
            <option value={selectedProject.owner._id}>
              {selectedProject.owner.name} (Owner)
            </option>
          )}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-800 focus:outline-none"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-800 focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-slate-800 focus:outline-none"
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        disabled={!projects.length}
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
