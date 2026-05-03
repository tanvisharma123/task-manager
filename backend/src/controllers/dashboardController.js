import Task from '../models/Task.js';
import Project from '../models/Project.js';
import { TASK_STATUS } from '../utils/constants.js';

export const getDashboard = async (req, res) => {
  const baseFilter = {};

  if (req.user.role !== 'admin') {
    baseFilter.$or = [
      { assignee: req.user._id },
      { project: { $in: req.user.assignedProjects } },
    ];
  }

  const totalTasks = await Task.countDocuments(baseFilter);
  const completedTasks = await Task.countDocuments({
    ...baseFilter,
    status: TASK_STATUS.COMPLETED,
  });
  const pendingTasks = await Task.countDocuments({
    ...baseFilter,
    status: TASK_STATUS.PENDING,
  });
  const overdueTasks = await Task.countDocuments({
    ...baseFilter,
    dueDate: { $exists: true, $lt: new Date() },
    status: { $ne: TASK_STATUS.COMPLETED },
  });

  res.json({
    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks,
  });
};
