import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

    // Semester name === semester code
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester code')
    }

    const result = await AcademicSemester.create(payload);
    return result;

}

// Single semester
const getSingleSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
}

const getAllAcademicSemestersFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
}


const updateSemesterIntoDB = async (id: string, payload: Partial<TAcademicSemester>) => {

    if (
        payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester code')
    }

    const result = await AcademicSemester.findByIdAndUpdate({ _id: id }, payload, {
        new: true
    })
    return result;
};





export const AcademicSemesterService = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB,
    getSingleSemesterFromDB,
    updateSemesterIntoDB
}