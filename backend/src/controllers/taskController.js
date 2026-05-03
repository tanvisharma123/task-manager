import Task from '../models/Task.js';
import Project from '../models/Project.js';
import User from '../models/User.js';
import { TASK_STATUS } from '../utils/constants.js';

export const createTask = async (req, res) => {
  const { title, description, project, assignee, status, priority, dueDate } = req.body;

  try {
    const targetProject = await Project.findById(project);
    if (!targetProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (req.user.role !== 'admin') {
      const isMember = targetProject.owner.equals(req.user._id) || targetProject.members.includes(req.user._id);
      if (!isMember) {
        return res.status(403).json({ message: 'Cannot add task to a project you do not belong to' });
      }
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignee,
      status,
      priority,
      dueDate,
    });

    targetProject.tasks.push(task._id);
    await targetProject.save();

    if (assignee) {
      await User.findByIdAndUpdate(assignee, { $addToSet: { assignedTasks: task._id } });
    }

    const populatedTask = await Task.findById(task._id)
      .populate('project', 'title')
      .populate('assignee', 'name email');

    return res.status(201).json(populatedTask);
  } catch (error) {
    console.error('Task creation failed:', error);
    return res.status(500).json({
      message: 'Unable to create task',
      error: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  const { status, project, assignee, overdue } = req.query;
  const filters = {};

  if (status) filters.status = status;
  if (project) filters.project = project;
  if (assignee) filters.assignee = assignee;
  if (overdue === 'true') {
    filters.dueDate = { $lt: new Date() };
    filters.status = { $ne: TASK_STATUS.COMPLETED };
  }

  if (req.user.role !== 'admin') {
    filters.$or = [
      { assignee: req.user._id },
      { project: { $in: req.user.assignedProjects } },
    ];
  }

  const tasks = await Task.find(filters)
    .populate('project', 'title')
    .populate('assignee', 'name email');

  res.json(tasks);
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const updates = req.body;

  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (req.user.role !== 'admin' && (!task.assignee || !task.assignee.equals(req.user._id))) {
    return res.status(403).json({ message: 'You are not authorized to update this task' });
  }

  if (updates.assignee && !task.assignee?.equals(updates.assignee)) {
    await User.findByIdAndUpdate(task.assignee, { $pull: { assignedTasks: task._id } });
    await User.findByIdAndUpdate(updates.assignee, { $addToSet: { assignedTasks: task._id } });
  }

  Object.assign(task, updates);
  await task.save();

  res.json(task);
};
