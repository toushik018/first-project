import httpStatus from "http-status";
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from "../../utils/catchAsync";





const getAllStudents = catchAsync(async (req, res) => {

  const result = await StudentServices.getStudentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students is fetched succesfully',
    data: result,
  })
});

const getSingleStudent = catchAsync(async (req, res) => {

  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentsFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is fetched succesfully',
    data: result,
  })
});

const deleteStudent = catchAsync(async (req, res) => {

  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentsFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted succesfully',
    data: result,
  })
});


const updateStudent = catchAsync(async (req, res) => {

  const { studentId } = req.params;
  const {student} = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  })
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
