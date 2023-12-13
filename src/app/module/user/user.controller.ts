import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";



const createStudent = catchAsync(async (req, res) => {
  
  const {password, student: studentData } = req.body;

  // Data Validation Using Zod
  const result = await UserServices.createStudentIntoDB(password, studentData);

 
  // send respons
  sendResponse(res, {
    statusCode:httpStatus.OK,
    success:true,
    message: 'Student is created succesfully',
    data: result,
  });
});


const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

  export const UserControllers = {
    createStudent,
    createFaculty,
    createAdmin
  }