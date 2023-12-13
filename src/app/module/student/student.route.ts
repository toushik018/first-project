import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidationSchema } from './student.validation';

const router = express.Router();

// it will call Controller function




router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);

router.patch('/:id',
    validateRequest(studentValidationSchema.updateStudentValidationSchema), StudentController.updateStudent);

router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
