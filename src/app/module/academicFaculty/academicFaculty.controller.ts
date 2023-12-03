import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyService } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await academicFacultyService.createAcademicFacultyIntoDB(req.body)


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is created succesfully',
        data: result,
    })
})


const getAllAcademicFaculties = catchAsync(async(req, res) => {
    const result = await academicFacultyService.getAllAcademicFacultiesFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Academic Faculty is fetched succesfully',
        data: result,
    })
})

const getSingleAcademicFaculty = catchAsync(async(req, res) => {
    const {facultyId} = req.params;
    const result = await academicFacultyService.getSingleAcademicFaculty(facultyId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is fetched succesfully',
        data: result,
    })
})


const updateAcademicFaculty = catchAsync( async(req, res) => {
    const {facultyId} = req.params;
    const result = await academicFacultyService.updateAcademicFaculty(facultyId, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is updated succesfully',
        data: result,
    })
})





export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}