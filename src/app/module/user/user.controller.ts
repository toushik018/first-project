import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {password, student: studentData } = req.body;
    
  
      // Data Validation Using Zod
    //   const zodData = studentValidationSchema.parse(studentData);
      const result = await UserServices.createStudentIntoDB(password, studentData);
  
     
      // send respons
      sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message: 'Student is created succesfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };


  export const UserControllers = {
    createStudent
  }