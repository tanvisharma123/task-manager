import { body, param } from 'express-validator';

export const createProjectValidation = [
  body('title').trim().notEmpty().withMessage('Project title is required'),
  body('description').optional().isString().withMessage('Description must be text'),
  body('members')
    .optional({ nullable: true })
    .isArray()
    .withMessage('Members must be an array of user IDs')
    .bail()
    .custom((members) => members.every((id) => typeof id === 'string'))
    .withMessage('Each member ID must be a string'),
];

export const projectIdValidation = [
  param('projectId').isMongoId().withMessage('Valid project ID is required'),
];
