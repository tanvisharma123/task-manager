import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchTasks, createTask, updateTask } from '../api/taskApi.js';
import { fetchProjects } from '../api/projectApi.js';
import TaskForm from '../components/tasks/TaskForm.jsx';
import TaskTable from '../components/tasks/TaskTable.jsx';

const TasksPage = () => {
  const { token, user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadTasks = () => {
    if (!token) return;
    fetchTasks(token)
      .then((res) => setTasks(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load tasks'));
  };

  const loadProjects = () => {
    if (!token) return;
    fetchProjects(token)
      .then((res) => setProjects(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load projects'));
  };

  useEffect(() => {
    loadTasks();
    loadProjects();
  }, [token]);

  const handleCreate = async (payload) => {
    try {
      const response = await createTask(payload, token);
      setTasks((prev) => [response.data, ...prev]);
      setSuccess('Task created successfully');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create task');
      setSuccess('');
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      const response = await updateTask(taskId, { status }, token);
      setTasks((prev) => prev.map((task) => (task._id === taskId ? response.data : task)));
      setSuccess('Task status updated');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update task status');
      setSuccess('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Tasks</h1>
        <p className="text-sm text-slate-600">Create and manage tasks across your projects.</p>
      </div>
      {error && <div className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}
      {success && <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">{success}</div>}
      <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <TaskForm onCreate={handleCreate} projects={projects} />
        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold">Task List</h3>
            <p className="mt-2 text-sm text-slate-600">View all tasks and update their progress status.</p>
          </div>
          <TaskTable tasks={tasks} onStatusChange={handleStatusChange} user={user} />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
