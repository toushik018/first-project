import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

// router.get('/:id', FacultyControllers.getSingleFaculty);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser,
);

// router.delete('/:id', FacultyControllers.deleteFaculty);

// router.get('/', FacultyControllers.getAllFaculties);

export const AuthRoutes = router;