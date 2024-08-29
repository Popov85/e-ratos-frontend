import {createSelector} from "reselect";
// @ts-ignore
import {dummyArray} from "../../../utils/constants";
import {RootState} from "../../../store/rootReducer";
import {Course} from "../types/Course";
import {CourseDropDown} from "../_api/coursesAPI";
import {TableObject} from "../types/table/TableObject";
import {coursesTransformer} from "../../../utils/transformers/coursesTransformer";
import {FormSelect} from "../types/form/FormSelect";

interface CourseProps {
    courseId?: number;
}

export const getCourseIdFromProps = (state: RootState, props: CourseProps): number | undefined => props.courseId;

export const getAllCourses = (state: RootState): Array<Course> => state.staff.courses.content;

export const getAnyCourses = (state: RootState): Array<Course> | Array<CourseDropDown> | null => {
    const {content, contentMin} = state.staff.courses;
    if (!content && !contentMin) return null;
    return content ? content : contentMin;
}

//------------------------------------------Re-selectors----------------------------------------------------------------

export const getCourseById = createSelector(
    [getAllCourses, getCourseIdFromProps],
    (courses: Array<Course>, courseId: number | undefined) => {
        if (!courses || !courseId) return null;
        return courses.find((c: Course): boolean => c.courseId === courseId) || null;
    }) as (state: RootState, props: CourseProps) => Course | null;

// For Table filter
export const getAllCoursesForFilter = createSelector(
    [getAllCourses],
    (courses: Array<Course>) => {
        if (!courses || courses.length === 0) return null;
        return coursesTransformer.toObject(courses);
    }) as (state: RootState, props: CourseProps) => TableObject | null;

export const getAllCoursesForSelect = createSelector(
    [getAnyCourses],
    (courses: Array<Course | CourseDropDown> | null): Array<FormSelect> => {
        if (!courses || courses.length === 0) return dummyArray;
        return coursesTransformer.toSelectWithDummy(courses) || [];
    }
) as (state: RootState, props: CourseProps) => Array<FormSelect> | null;