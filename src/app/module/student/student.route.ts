import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidationSchema } from './student.validation';

const router = express.Router();

// it will call Controller function




router.get('/:studentId', StudentController.getSingleStudent);

router.patch('/:studentId', 
validateRequest(studentValidationSchema.updateStudentValidationSchema), StudentController.updateStudent);

router.delete('/:studentId', StudentController.deleteStudent);
router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
