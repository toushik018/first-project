import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post('/create-academic-semester', validateRequest(AcademicSemesterValidation.createAcademicValidationSchema), AcademicSemesterControllers.CreateAcademicSemester)

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

router.get('/:semesterId', AcademicSemesterControllers.getSingleSemester);
router.patch('/:semesterId', validateRequest(AcademicSemesterValidation.updateAcademicValidationSchema), AcademicSemesterControllers.updateSemester);


export const AcademicSemesterRoute = router;