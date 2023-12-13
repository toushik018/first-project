import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidation } from './course.validtion';
import { CourseController } from './course.controller';

const router = express.Router();


router.post('/create-course', validateRequest(CourseValidation.createCourseValidationSchema), CourseController.createCourse)

router.get('/', CourseController.getAllCourses)

router.get('/:id', CourseController.getSingleCourse)
router.delete('/:id', CourseController.deleteCourse)

// router.patch('/:facultyId', validateRequest(cou.updateAcademicFacultyValidationSchema), AcademicFacultyController.updateAcademicFaculty)




export const CourseRoute = router;