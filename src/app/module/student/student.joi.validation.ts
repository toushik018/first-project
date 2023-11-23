import Joi from "joi";

const userNameSchema = Joi.object({
    firstName: Joi.string()
        .required()
        .trim()
        .max(20)
        .pattern(/^[A-Z][a-z]*$/, { name: 'capitalized' })
        .message('First Name must be capitalized'),

    middleName: Joi.string().trim(),

    lastName: Joi.string()
        .required()
        .pattern(/^[a-zA-Z]*$/, { name: 'alphanumeric' })
        .message('Last Name must be alphanumeric'),
});

const guardianSchema = Joi.object({
    fatherName: Joi.string().required().trim(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),

    motherName: Joi.string().required().trim(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
});

const localGuardianSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNumber: Joi.string().required(),
});

const studentValidationSchema = Joi.object({

    id: Joi.string().required(),
    name: userNameSchema.required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateOfBirth: Joi.string(),
    email: Joi.string().email().required(),
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    guardian: guardianSchema.required(),
    localGuardian: localGuardianSchema.required(),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
});


export default studentValidationSchema;