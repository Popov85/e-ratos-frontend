import {createSelector} from "reselect";
import {coursesTransformer} from "../../utils/transformers/coursesTransformer";
import {dummyArray} from "../../utils/constants";

export const getCourseIdFromProps = (state, props) => props.courseId;

export const getAllCourses = state => state.courses.content;

export const getAnyCourses = state => {
    const {content, contentMin} = state.courses;
    if (!content && !contentMin) return null;
    return content ? content : contentMin;
}

//------------------------------------------Re-selectors----------------------------------------------------------------

export const getCourseById = createSelector(getAllCourses, getCourseIdFromProps, (courses, courseId) => {
    if (!courses) return null;
    return courses.find(c => c.courseId === courseId);
});

// For Table filter
export const getAllCoursesForFilter = createSelector(getAllCourses, (courses) => {
    if (!courses) return null;
    return coursesTransformer.toObject(courses);
});

// For New form
export const getAllCoursesForSelect = createSelector(getAnyCourses, (courses) => {
    if (!courses) return dummyArray;
    return coursesTransformer.toSelectWithDummy(courses);
});

// For Table filter, extract courses from themes array for filter
export const extractAccessesFromCoursesForTableFilter = createSelector(getAllCourses, (courses) => {
    if (!courses) return null;
    return courses.reduce((map, course) => {
        map[Number(course.access.accessId)] = course.access.name;
        return map;
    }, {});
});