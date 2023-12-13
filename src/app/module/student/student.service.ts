
import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSeachableFields } from './student.constant';



// Get all students

const getStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };

  // const studentSeachableFields = ['email', 'name.firstName', 'paresentAddress']

  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentSeachableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' }
  //   }))
  // })



  // filtering 
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
  // excludeFields.forEach((el) => delete queryObj[el]);
  // console.log({ query }, { queryObj });

  // const filterQuery = searchQuery.find(queryObj).populate("admissionSemester").populate({
  //   path: "academicDepartment",
  //   populate: {
  //     path: "academicFaculty"
  //   }
  // });

  // let sort = '-createdAt'

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let limit = 1
  // let page = 1;
  // let skip = 0;


  // if (query.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query.page) {
  //   page = Number(query.page)
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);


  // const limitQuery = paginateQuery.limit(limit);

  // //Field limiting
  // let fields = '-__v';

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  //   console.log(fields);
  // }

  // const fieldsQuery = await limitQuery.select(fields);

  // return fieldsQuery;


  const studentsQuery = new QueryBuilder(Student.find()
    .populate("admissionSemester").populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty"
      }
    }), query).search(studentSeachableFields).filter().sort().paginate().fields();

  const result = await studentsQuery.modelQuery
  return result;

};

// Get single student

const getSingleStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.findOne({ id }).populate("admissionSemester").populate({
    path: "academicDepartment",
    populate: {
      path: "academicFaculty"
    }
  });
  return result;
};



const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {

  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  console.log(modifiedUpdatedData);


  const result = await Student.findByIdAndUpdate( id , modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result;
};


// Delete

const deleteStudentsFromDB = async (id: string) => {

  const session = await mongoose.startSession()

  try {

    session.startTransaction()

    const deletedStudent = await Student.findByIdAndUpdate( id , { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const userId = deletedStudent.user

    const deletedUser = await User.findByIdAndUpdate( userId , { isDeleted: true }, { new: true, session })


    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
  }


};




export const StudentServices = {
  getStudentsFromDB,
  getSingleStudentsFromDB,
  deleteStudentsFromDB,
  updateStudentIntoDB
};
