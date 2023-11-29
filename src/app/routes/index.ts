import express from 'express';
import { UserRoutes } from '../module/user/user.route';
import { StudentRoutes } from '../module/student/student.route';
import { AcademicSemesterRoute } from '../module/academicSemester/academicSemester.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoute
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));




export default router;