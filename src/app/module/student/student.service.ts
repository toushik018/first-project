import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error(`Student already exists`);
  }
  const result = await Student.create(studentData); // Builtin static methods




  // const student = new Student(studentData); //Create an instance 

  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error(`Student already exists`);
  // }

  // const result = await student.save(); //Builtin Instance methods

  return result;
};


// Get all students

const getStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

// Get single student

const getSingleStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([
    { $match: { id: id } }
  ])
  return result;
};

// Delete 

const deleteStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};



export const StudentServices = {
  createStudentIntoDB,
  getStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentsFromDB

};
