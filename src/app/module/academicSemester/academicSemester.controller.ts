
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterService } from "./academicSemester.service";



const CreateAcademicSemester = catchAsync(async (req, res) => {

    // Data Validation Using Zod
    const result = await AcademicSemesterService.createAcademicSemesterIntoDB(req.body);

    // send respons
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is created succesfully',
        data: result,
    });
});


const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.getAllAcademicSemestersFromDB();

    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic Semester is fetched succesfully',
    data: result,
})
});


const getSingleSemester = catchAsync(async (req, res) => {
    const {semesterId} = req.params;

    const result = await AcademicSemesterService.getSingleSemesterFromDB(semesterId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is fetched succesfully',
        data: result,
    })

});

const updateSemester = catchAsync( async(req, res) => {
    const {semesterId} = req.params;
    const result = await AcademicSemesterService.updateSemesterIntoDB(semesterId, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is updated succesfully',
        data: result,
    })
})


export const AcademicSemesterControllers = {
    CreateAcademicSemester,
    getAllAcademicSemesters,
    getSingleSemester, 
    updateSemester
}