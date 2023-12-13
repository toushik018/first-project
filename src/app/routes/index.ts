import express from 'express';
import { UserRoutes } from '../module/user/user.route';
import { StudentRoutes } from '../module/student/student.route';
import { AcademicSemesterRoute } from '../module/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from '../module/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../module/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../module/Faculty/faculty.route';
import { AdminRoutes } from '../module/admin/admin.route';
import { CourseRoute } from '../module/course/course.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/faculties',
        route: FacultyRoutes,
      },
      {
        path: '/admins',
        route: AdminRoutes,
      },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoute
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoute
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoute
    },
    {
        path: '/courses',
        route: CourseRoute
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));




export default router;