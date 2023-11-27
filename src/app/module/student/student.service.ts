
import { Student } from './student.model';



// Get all students

const getStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

// Get single student

const getSingleStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

// Delete

const deleteStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentsFromDB,
};
