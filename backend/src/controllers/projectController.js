import mongoose from 'mongoose';
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import User from '../models/User.js';

export const createProject = async (req, res) => {
  const { title, description, members = [] } = req.body;

  try {
    const memberIds = Array.isArray(members)
      ? members.map((id) => String(id).trim()).filter((id) => id)
      : [];

    const invalidMemberIds = memberIds.filter((id) => !mongoose.Types.ObjectId.isValid(id));
    if (invalidMemberIds.length > 0) {
      return res.status(400).json({
        message: 'Invalid member IDs provided',
        invalidMemberIds,
      });
    }

    const validMembers = memberIds.length
      ? await User.find({ _id: { $in: memberIds } })
      : [];

    const project = await Project.create({
      title,
      description,
      owner: req.user._id,
      members: validMembers.map((member) => member._id),
    });

    if (validMembers.length) {
      await User.updateMany(
        { _id: { $in: validMembers.map((member) => member._id) } },
        { $addToSet: { assignedProjects: project._id } }
      );
    }

    return res.status(201).json(project);
  } catch (error) {
    console.error('Project creation failed:', error);
    return res.status(500).json({
      message: 'Unable to create project',
      error: error.message,
    });
  }
};

export const getProjects = async (req, res) => {
  const query = req.user.role === 'admin'
    ? {}
    : { $or: [{ owner: req.user._id }, { members: req.user._id }] };

  const projects = await Project.find(query)
    .populate('owner', 'name email role')
    .populate('members', 'name email');

  res.json(projects);
};

export const getProjectById = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId)
    .populate('owner', 'name email role')
    .populate('members', 'name email')
    .populate({ path: 'tasks', populate: { path: 'assignee', select: 'name email' } });

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const isMember = project.owner.equals(req.user._id) || project.members.some((member) => member.equals(req.user._id));
  if (req.user.role !== 'admin' && !isMember) {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.json(project);
};

export const updateProjectMembers = async (req, res) => {
  const { projectId } = req.params;
  const { members = [] } = req.body;

  try {
    const memberIds = Array.isArray(members)
      ? members.map((id) => String(id).trim()).filter((id) => id)
      : [];

    const invalidMemberIds = memberIds.filter((id) => !mongoose.Types.ObjectId.isValid(id));
    if (invalidMemberIds.length > 0) {
      return res.status(400).json({
        message: 'Invalid member IDs provided',
        invalidMemberIds,
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.members = memberIds;
    await project.save();

    await User.updateMany(
      { assignedProjects: project._id },
      { $pull: { assignedProjects: project._id } }
    );

    if (memberIds.length) {
      await User.updateMany(
        { _id: { $in: memberIds } },
        { $addToSet: { assignedProjects: project._id } }
      );
    }

    return res.json(project);
  } catch (error) {
    console.error('Project member update failed:', error);
    return res.status(500).json({
      message: 'Unable to update project members',
      error: error.message,
    });
  }
};
