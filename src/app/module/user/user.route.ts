import express from 'express'
import { UserControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidationSchema } from '../student/student.validation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/create-student', validateRequest(studentValidationSchema.createStudentValidationSchema), UserControllers.createStudent);
router.post('/create-faculty', validateRequest(createFacultyValidationSchema), UserControllers.createFaculty);
router.post('/create-admin', auth(), validateRequest(createAdminValidationSchema), UserControllers.createAdmin);

export const UserRoutes = router;