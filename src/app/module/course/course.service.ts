import QueryBuilder from "../../builder/QueryBuilder";
import { TCourse } from "./course.interface";
import { Course } from "./course.model"
import { CourseSearchableFields } from "./courtse.constant";

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
}


const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(
        Course.find().populate('preRequisiteCourses.course'),
        query,
    )
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await courseQuery.modelQuery;
    return result;
};

const getSingleCoourseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course')
    return result;
}

const deleteCourseFromIntoDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeletet: true }, { new: true })
    return result;
}


export const CourseService = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCoourseFromDB,
    deleteCourseFromIntoDB

}