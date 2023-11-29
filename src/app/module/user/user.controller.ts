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


  export const UserControllers = {
    createStudent
  }