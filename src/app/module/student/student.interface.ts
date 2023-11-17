

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Guardian = {
  fatherName: string;
  FatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
};

export type LocalGurdian = {
  name: string;
  contactNumber: string;
  occupation: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGurdian: LocalGurdian;
  email: string;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};
