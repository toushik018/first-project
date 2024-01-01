import express from 'express'
import validateRequest from '../../middleware/validateRequest';
import { offeredCourseValidation } from './OfferedCourse.validation';
import { OfferedCourseController } from './OfferedCourse.controller';


const router = express.Router();

router.post('/create-offered-course', validateRequest(offeredCourseValidation.createOfferedCourseValidationSchema), OfferedCourseController.createOfferedCourse)

// router.get('/', SemesterRegistrationController.getAllSemesterRegistration);

// router.get('/:id', SemesterRegistrationController.getSingleSemesterRegistration);

// router.patch('/:id', validateRequest(SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema), SemesterRegistrationController.updateSemesterRegistration);


export const OfferedCoursenRoute = router;