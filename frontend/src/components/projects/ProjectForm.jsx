import React, { useState } from 'react';

const ProjectForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const memberIds = members
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    onCreate({ title, description, members: memberIds });
    setTitle('');
    setDescription('');
    setMembers('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold">Create Project</h3>
      <div>
        <label className="block mb-1 text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded border px-3 py-2"
          rows="3"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Members (IDs comma-separated)</label>
        <input
          value={members}
          onChange={(e) => setMembers(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="memberId1, memberId2"
        />
      </div>
      <button type="submit" className="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">
        Create Project
      </button>
    </form>
  );
};

export default ProjectForm;
