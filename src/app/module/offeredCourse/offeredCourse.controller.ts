import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import { OfferedCourseService } from "./OfferedCourse.service"

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Offered Course created successfully",
        data: result,
    })
})


const getAllOfferedCourse = catchAsync(async (req: Request, res: Response) =>{
const result = await OfferedCourseService.getAllOfferedCourseFromDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester registrations fetched successfully",
        data: result,
    })
})

const getSingleOfferedCourse = catchAsync(async (req: Request, res: Response) =>{

const {id} = req.params;
const result = await OfferedCourseService.getSingleOfferedCourseFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester registration fetched successfully",
        data: result,
    })
})

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) =>{

const {id} = req.params;
const result = await OfferedCourseService.updateOfferedCourseFromDB(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Semester registration updated successfully",
        data: result,
    })
})



export const OfferedCourseController = {
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse,
    updateOfferedCourse
}