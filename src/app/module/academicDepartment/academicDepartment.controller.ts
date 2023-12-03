import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmentService } from "./academicDepartment.service";
import catchAsync from "../../utils/catchAsync";


const createAcademicDepartment = catchAsync(async (req, res) => {
    const result = await academicDepartmentService.createAcademicDepartmentIntoDB(req.body)


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department is created succesfully',
        data: result,
    })
})


const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const result = await academicDepartmentService.getAllAcademicDepartmentsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Academic departments is fetched succesfully',
        data: result,
    })
})

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await academicDepartmentService.getSingleAcademicDepartment(departmentId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department is fetched succesfully',
        data: result,
    })
})


const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await academicDepartmentService.updateAcademicDepartment(departmentId, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department is updated succesfully',
        data: result,
    })
})





export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}