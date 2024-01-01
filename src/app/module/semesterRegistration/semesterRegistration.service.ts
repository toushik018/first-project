import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { TSemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.constants";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

    const academicSemester = payload?.academicSemester;
    //Check if there any registered semester that has "UPCOMING" OR "ONGOING"

    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration
        .findOne({
            $or: [
                { status: RegistrationStatus.UPCOMING },
                { status: RegistrationStatus.ONGOING }
            ]
        });

    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(httpStatus.BAD_REQUEST,
            `There is already a semester registered ${isThereAnyUpcomingOrOngoingSemester.status}`)
    }

    const isSemesterRegistrationExists = await SemesterRegistration.findOne({ academicSemester })

    // Check if the semester has already been there.
    const isAcademicSemesterExist = await AcademicSemester.findById(academicSemester)
    if (!isAcademicSemesterExist) {
        throw new AppError(httpStatus.NOT_FOUND, " This academic semester does not exist")
    }

    //   Check if the semester has already been registered
    if (isSemesterRegistrationExists) {
        throw new AppError(httpStatus.CONFLICT, " This semester is already registered")
    }

    const result = await SemesterRegistration.create(payload);
    return result;

}

const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown>) => {

    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'), query).filter().sort().paginate().fields();

    const result = await semesterRegistrationQuery.modelQuery;
    return result;
}

const getSingleSemesterRegistrationFromDB = async (id: string) => {
    const result = await SemesterRegistration.findById(id)
    return result;
}

const updateSemesterRegistrationFromDB = async (id: string, payload: Partial<TSemesterRegistration>) => {
    // check is the requested registered semester is exists
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.NOT_FOUND, "The semester is not found")
    }


    // if the requested semester registration is already ENDED, then we will not update the registration 
    const currentSemesterStatus = isSemesterRegistrationExists?.status;
    const requestedStatus = payload?.status;

    if (currentSemesterStatus === RegistrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, `This is semester is already ${currentSemesterStatus}`)
    }

    //The field can be update only, UPCOMING---->ONGOING---->ENDED   
    if (currentSemesterStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST,
            `You can not change directly status from ${currentSemesterStatus} to ${requestedStatus}`)
    }


    if (currentSemesterStatus === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING) {
        throw new AppError(httpStatus.BAD_REQUEST,
            `You can not change directly status from ${currentSemesterStatus} to ${requestedStatus}`)
    }


    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });
    return result;

}


export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationFromDB
}