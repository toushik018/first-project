import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxLength: [20, 'First Name must be at least 20 characters'],
  },

  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
  },
});

const gurdianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Guardian Name is required'],
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, 'Guardian Contact Number is required'],
  },
  occupation: {
    type: String,
    required: [true, 'Guardian Occupation is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'ID is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "{VALUE} is not valid, field can only be the following values: 'male', 'female', or 'other'",
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
    },
    contactNo: { type: String, required: [true, 'Contact Number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
    },
    guardian: {
      type: gurdianSchema,
      required: [true, 'Guardian Information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian Information is required'],
    },
    profileImg: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester'
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment'
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
  },
);

// Virtual Mongoose
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});



// Query middleware functions

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

// [ { '$match': { id: '12741' } } ]

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

//Creating a custom static menthod

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};





// Creating a custom instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// }

// Creating model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
