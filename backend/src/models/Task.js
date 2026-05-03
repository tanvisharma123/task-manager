import mongoose from 'mongoose';
import { TASK_STATUS, TASK_PRIORITY } from '../utils/constants.js';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: [TASK_STATUS.PENDING, TASK_STATUS.IN_PROGRESS, TASK_STATUS.COMPLETED],
      default: TASK_STATUS.PENDING,
    },
    priority: {
      type: String,
      enum: [TASK_PRIORITY.LOW, TASK_PRIORITY.MEDIUM, TASK_PRIORITY.HIGH],
      default: TASK_PRIORITY.MEDIUM,
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
