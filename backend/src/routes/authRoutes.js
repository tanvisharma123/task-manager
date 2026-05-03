import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { signupValidation, loginValidation } from '../validators/authValidators.js';
import { validateRequest } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post('/signup', signupValidation, validateRequest, signup);
router.post('/login', loginValidation, validateRequest, login);

export default router;
