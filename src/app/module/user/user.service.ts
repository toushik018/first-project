import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {

  // Create a user object
  const userData: Partial<TUser> = {};

  //if password is not given then use default password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'student';

 
  // Finding academic semester information
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

    //  Set generate ID for student
    userData.id = await generateStudentId(admissionSemester);

  // Create a user
  const newUser = await User.create(userData);

  // Create a student

  if (Object.keys(newUser).length) {
    // Set id, _id as user role

    payload.id = newUser.id;
    payload.user = newUser._id; //reference id


    const newStudent = await Student.create(payload);
    return newStudent;
  }
};


export const UserServices = {
  createStudentIntoDB
}