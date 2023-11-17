import { Schema, model } from 'mongoose';
import { Guardian, LocalGurdian, Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const gurdianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  FatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGurdianSchema = new Schema<LocalGurdian>({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  occupation: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: { userNameSchema },
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    gurdianSchema,
  },
  localGurdian: {
    localGurdianSchema,
  },
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});



// Creating model
const Student = model<Student>('Student', studentSchema);
