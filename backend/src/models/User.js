import mongoose from 'mongoose';
import { USER_ROLES } from '../utils/constants.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: [USER_ROLES.ADMIN, USER_ROLES.MEMBER],
      default: USER_ROLES.MEMBER,
    },
    assignedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
    assignedTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
