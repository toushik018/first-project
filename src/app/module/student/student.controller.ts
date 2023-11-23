import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {






    const { student: studentData } = req.body;
    // Data Validation Using Joi
    // const { error, value } = studentValidationSchema.validate(studentData);
    // And sent the validate data to the server

    // Data Validation Using Zod
    const zodData = studentValidationSchema.parse(studentData);
    const result = await StudentServices.createStudentIntoDB(zodData);


    // if (error) {
    //   res.status(500).json({
    //     success: false,   
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }




    // send response

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrived succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrived succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};



const deleteStudent = async (req:Request, res: Response) => {
  try{
    const {studentId} = req.params;
    const result = await StudentServices.deleteStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted succesfully',
      data: result,
    })

  } catch(err){
    res.status(500).json({
      success:false,
      message: err.message || "Something went wrong"
    })
  }

}


export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
