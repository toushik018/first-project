import httpStatus from "http-status";
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from "../../utils/catchAsync";





const getAllStudents = catchAsync(async (req, res) => {
 

  const result = await StudentServices.getStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students is fetched succesfully',
    data: result,
  })
});

const getSingleStudent = catchAsync(async (req, res) => {

  const { id } = req.params;
  const result = await StudentServices.getSingleStudentsFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is fetched succesfully',
    data: result,
  })
});

const deleteStudent = catchAsync(async (req, res) => {

  const { id } = req.params;
  const result = await StudentServices.deleteStudentsFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted succesfully',
    data: result,
  })
});


const updateStudent = catchAsync(async (req, res) => {

  const { id } = req.params;
  const {student} = req.body;
  const result = await StudentServices.updateStudentIntoDB(id, student);
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
