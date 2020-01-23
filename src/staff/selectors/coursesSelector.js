import {createSelector} from "reselect";

export const getCourseIdFromProps = (state, props) => props.courseId;

export const getAllCourses = (state) => state.courses.content;

//------------------------------------------Re-selectors----------------------------------------------------------------

export const getCourseById = createSelector(getAllCourses, getCourseIdFromProps, (courses, courseId) => {
    if (!courses) return null;
    return courses.find(c => c.courseId === courseId);
});