import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from 'jsonwebtoken'
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {

   
    const user = (await User.isUserExistByCustomId(payload.id));

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This is user not found");
    }

    // check if the user is already deleted
    const isDeleted = user?.isDeleted

    if (isDeleted === true) {
        throw new AppError(httpStatus.FORBIDDEN, "This user is deleted");
    }



    //check if the user is blockecd
    const userStatus = user?.status

    if (userStatus === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "This user is blocked");
    }
    // Checking if the password is correct
    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError(httpStatus.FORBIDDEN, "Password did not match");
    }



    // Create token and send to the user
const jwtPayload = {
    userId: user.id,
    role: user.role
}
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '10d' });

    return {
        accessToken,
        needsPasswordsChange: user?.needsPasswordChange
    }
 



};


export const AuthServices = {
    loginUser
} 