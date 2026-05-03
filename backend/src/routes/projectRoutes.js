import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProjectMembers,
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import { validateRequest } from '../middleware/validateMiddleware.js';
import { createProjectValidation, projectIdValidation } from '../validators/projectValidators.js';

const router = express.Router();

router.use(protect);
router.get('/', getProjects);
router.post('/', requireRole('admin'), createProjectValidation, validateRequest, createProject);
router.get('/:projectId', projectIdValidation, validateRequest, getProjectById);
router.put('/:projectId/members', requireRole('admin'), projectIdValidation, validateRequest, updateProjectMembers);

export default router;
