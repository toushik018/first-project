import httpStatus from "http-status";
import config from "../../config";
import { AppError } from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import mongoose from "mongoose";

const createStudentIntoDB = async (password: string, payload: TStudent) => {

  // Create a user object
  const userData: Partial<TUser> = {};

  //if password is not given then use default password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'student';


  // Finding academic semester information
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "error")
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateStudentId(admissionSemester);

    // Create a user (transaction 1)
    const newUser = await User.create([userData], { session });

    // Create a student

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user")


    }

    // Set id, _id as user role

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference id

    // Create a student (transaction 2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student")
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;

  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student")
  }

};


export const UserServices = {
  createStudentIntoDB
}