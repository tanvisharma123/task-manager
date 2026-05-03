import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import {
  fetchProjects,
  createProject,
  fetchProjectDetails,
  updateProjectMembers,
} from '../api/projectApi.js';
import ProjectForm from '../components/projects/ProjectForm.jsx';

const ProjectsPage = () => {
  const { token, user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);
  const [memberInput, setMemberInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadProjects = () => {
    if (!token) return;
    fetchProjects(token)
      .then((res) => setProjects(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load projects'));
  };

  useEffect(() => {
    loadProjects();
  }, [token]);

  const handleCreate = async (payload) => {
    try {
      const response = await createProject(payload, token);
      setProjects((prev) => [response.data, ...prev]);
      setSuccess('Project created successfully');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create project');
      setSuccess('');
    }
  };

  const loadProjectDetails = async (projectId) => {
    if (!token) return;
    try {
      const response = await fetchProjectDetails(projectId, token);
      setSelectedProjectId(projectId);
      setProjectDetails(response.data);
      setMemberInput(response.data.members.map((member) => member._id).join(', '));
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load project details');
    }
  };

  const handleToggleDetails = (projectId) => {
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
      setProjectDetails(null);
      setMemberInput('');
      return;
    }
    loadProjectDetails(projectId);
  };

  const handleMemberUpdate = async (e) => {
    e.preventDefault();
    if (!projectDetails) return;

    const members = memberInput
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    try {
      await updateProjectMembers(projectDetails._id, { members }, token);
      await loadProjectDetails(projectDetails._id);
      await loadProjects();
      setSuccess('Project members updated');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update project members');
      setSuccess('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Projects</h1>
          <p className="text-sm text-slate-600">Manage projects, teams, and task assignments.</p>
        </div>
      </div>
      {error && <div className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}
      {success && <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">{success}</div>}
      {user?.role === 'admin' && <ProjectForm onCreate={handleCreate} />}
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project._id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{project.description || 'No description provided'}</p>
                <div className="mt-4 text-sm text-slate-700 space-y-1">
                  <p>Owner: {project.owner?.name || 'Unknown'}</p>
                  <p>Members: {project.members?.length || 0}</p>
                </div>
              </div>
              <button
                onClick={() => handleToggleDetails(project._id)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700"
              >
                {selectedProjectId === project._id ? 'Hide' : 'Details'}
              </button>
            </div>
            {selectedProjectId === project._id && projectDetails && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-lg font-semibold">Project Details</h3>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p>
                    <strong>Members:</strong>{' '}
                    {projectDetails.members.length > 0
                      ? projectDetails.members.map((member) => member.name).join(', ')
                      : 'No members assigned'}
                  </p>
                  <p>
                    <strong>Tasks:</strong> {projectDetails.tasks.length}
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-slate-900">Tasks inside project</h4>
                  {projectDetails.tasks.length ? (
                    <ul className="mt-3 space-y-3">
                      {projectDetails.tasks.map((task) => (
                        <li
                          key={task._id}
                          className="rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium">{task.title}</span>
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs uppercase tracking-wide text-slate-700">
                              {task.status}
                            </span>
                          </div>
                          <p className="mt-1 text-slate-500">Assignee: {task.assignee?.name || 'Unassigned'}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-slate-600">No tasks added yet.</p>
                  )}
                </div>

                {user?.role === 'admin' && (
                  <form onSubmit={handleMemberUpdate} className="mt-5 space-y-3">
                    <label className="block text-sm font-medium text-slate-900">Update project members</label>
                    <input
                      value={memberInput}
                      onChange={(e) => setMemberInput(e.target.value)}
                      placeholder="Enter user IDs, comma separated"
                      className="w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-800 focus:outline-none"
                    />
                    <p className="text-xs text-slate-500">
                      Current members: {projectDetails.members.map((member) => member.email).join(', ') || 'None'}
                    </p>
                    <button
                      type="submit"
                      className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700"
                    >
                      Save Members
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
