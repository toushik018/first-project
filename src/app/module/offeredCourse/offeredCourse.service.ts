
import { TOfferedCourse } from "./offeredCourse.interface"
import { OfferedCourse } from "./offeredCourse.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {

    const result = await OfferedCourse.create(payload)
    return result;

}

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {

    const offeredCourseQuery = new QueryBuilder(OfferedCourse.find().populate('academicSemester'), query).filter().sort().paginate().fields();

    const result = await offeredCourseQuery.modelQuery;
    return result;
}

const getSingleOfferedCourseFromDB = async (id: string) => {
    const result = await OfferedCourse.findById(id)
    return result;
}

const updateOfferedCourseFromDB = async (id: string, payload: Partial<TOfferedCourse>) => {
   
}


export const OfferedCourseService = {
    createOfferedCourseIntoDB,
    getAllOfferedCourseFromDB,
    getSingleOfferedCourseFromDB,
    updateOfferedCourseFromDB
}