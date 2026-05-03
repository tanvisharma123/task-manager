import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateMiddleware.js';
import { createTaskValidation, taskIdValidation } from '../validators/taskValidators.js';

const router = express.Router();

router.use(protect);
router.get('/', getTasks);
router.post('/', createTaskValidation, validateRequest, createTask);
router.put('/:taskId', taskIdValidation, validateRequest, updateTask);

export default router;
