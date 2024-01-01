import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseService } from "./course.service";


const createCourse = catchAsync(async (req, res) => {
    const result = await CourseService.createCourseIntoDB(req.body)


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is created succesfully',
        data: result,
    })
})


const getAllCourses = catchAsync(async(req, res) => {
  console.log("In test", req.user);
    const result = await CourseService.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Courses is fetched succesfully',
        data: result,
    })
})

const getSingleCourse = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await CourseService.getSingleCoourseFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'The course is fetched succesfully',
        data: result,
    })
})


// const updateAcademicFaculty = catchAsync( async(req, res) => {
//     const {facultyId} = req.params;
//     const result = await academicFacultyService.updateAcademicFaculty(facultyId, req.body)

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Academic Faculty is updated succesfully',
//         data: result,
//     })
// })

const deleteCourse = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await CourseService.deleteCourseFromIntoDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'The course is deleted succesfully',
        data: result,
    })
})


const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
  
    const result = await CourseService.assignFacultiesWithCourseIntoDB(
      courseId,
      faculties,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties assigned  succesfully',
      data: result,
    });
  });
  
  const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
  
    const result = await CourseService.removeFacultiesFromCourseFromDB(
      courseId,
      faculties,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties removed  succesfully',
      data: result,
    });
  });


export const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse
}