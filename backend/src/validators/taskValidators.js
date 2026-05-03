import { body, param } from 'express-validator';
import { TASK_PRIORITY, TASK_STATUS } from '../utils/constants.js';

export const createTaskValidation = [
  body('title').trim().notEmpty().withMessage('Task title is required'),
  body('project').isMongoId().withMessage('Valid project ID is required'),
  body('assignee').optional().isMongoId().withMessage('Assignee must be a valid user ID'),
  body('status')
    .optional()
    .isIn([TASK_STATUS.PENDING, TASK_STATUS.IN_PROGRESS, TASK_STATUS.COMPLETED])
    .withMessage('Status is invalid'),
  body('priority')
    .optional()
    .isIn([TASK_PRIORITY.LOW, TASK_PRIORITY.MEDIUM, TASK_PRIORITY.HIGH])
    .withMessage('Priority is invalid'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date'),
];

export const taskIdValidation = [
  param('taskId').isMongoId().withMessage('Valid task ID is required'),
];
