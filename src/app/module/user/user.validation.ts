import {z} from 'zod';

const userValidationSchema = z.object({
    password: z.string({
        invalid_type_error: "Name must be a string",
    }).max(10, {message: "Password must be at least 10 characters"})
    .optional(),
});


export const UserValidation = {
    userValidationSchema
}