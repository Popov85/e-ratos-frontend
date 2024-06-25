import {coursesAPI} from "../_api/coursesAPI";

const LOADING_ALL_COURSES = "LOADING_ALL_COURSES";
const LOADING_ALL_COURSES_FAILURE = "LOADING_ALL_COURSES_FAILURE";
const CLEAR_LOADING_ALL_COURSES_FAILURE = "CLEAR_LOADING_ALL_COURSES_FAILURE";
const SET_ALL_COURSES = "SET_ALL_COURSES";
const SET_ALL_COURSES_MIN = "SET_ALL_COURSES_MIN";

const UPDATING_COURSE = "UPDATING_COURSE";
const UPDATING_COURSE_FAILURE = "UPDATING_COURSE_FAILURE";
const CLEAR_UPDATING_COURSE_FAILURE = "CLEAR_UPDATING_COURSE_FAILURE";

const CLEAR_ALL_COURSES_FAILURES = "CLEAR_ALL_COURSES_FAILURES";

const ADD_COURSE_IN_STORE = "ADD_COURSE_IN_STORE";
const UPDATE_COURSE_IN_STORE = "UPDATE_COURSE_IN_STORE";
const UPDATE_COURSE_NAME_IN_STORE = "UPDATE_COURSE_NAME_IN_STORE";
const DELETE_COURSE_FROM_STORE = "DELETE_COURSE_FROM_STORE";

const ASSOCIATE_COURSE_WITH_LMS_IN_STORE = "ASSOCIATE_COURSE_WITH_LMS_IN_STORE";
const DISASSOCIATE_COURSE_WITH_LMS_IN_STORE = "DISASSOCIATE_COURSE_WITH_LMS_IN_STORE";

export const loading = isLoading => ({type: LOADING_ALL_COURSES, isLoading});
export const loadingFailure = error => ({type: LOADING_ALL_COURSES_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ALL_COURSES_FAILURE});
export const setAllCourses = courses => ({type: SET_ALL_COURSES, payload: courses});
export const setAllCoursesMin = coursesMin => ({type: SET_ALL_COURSES_MIN, payload: coursesMin});

export const updating = isUpdating => ({type: UPDATING_COURSE, isUpdating});
export const updatingFailure = error => ({type: UPDATING_COURSE_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_COURSE_FAILURE});

export const clearAllCoursesFailures = () => ({type: CLEAR_ALL_COURSES_FAILURES});

export const addCourseInStore = (course) => ({type: ADD_COURSE_IN_STORE, payload: course});
export const updateCourseInStore = (course) => ({type: UPDATE_COURSE_IN_STORE, payload: course});
export const updateCourseNameInStore = (courseId, name) => ({type: UPDATE_COURSE_NAME_IN_STORE, courseId, name});
export const associateCourseWithLMSInStore = (courseId, lms) => ({type: ASSOCIATE_COURSE_WITH_LMS_IN_STORE, courseId, lms});
export const disassociateCourseWithLMSInStore = (courseId) => ({type: DISASSOCIATE_COURSE_WITH_LMS_IN_STORE, courseId});
export const deleteCourseFromStore = courseId => ({type: DELETE_COURSE_FROM_STORE, courseId});


export const updateCourseName = (courseId, name) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        coursesAPI.updateCourseName(courseId, name).then(() => {
            dispatch(updateCourseNameInStore(courseId, name));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update course's name")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const disassociateCourseWithLMS = (courseId) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        coursesAPI.disassociateCourseWithLMS(courseId).then(() => {
            dispatch(disassociateCourseWithLMSInStore(courseId));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to disassociate the course with the LMS")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteCourse = (courseId) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        coursesAPI.deleteCourse(courseId).then(() => {
            dispatch(deleteCourseFromStore(courseId));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to delete course!")));
        }).finally(() => dispatch(updating(false)));
    }
}

//----------------------------------------------------Drop-down---------------------------------------------------------
export const getAllCoursesByDepartmentForDropDown = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        coursesAPI.fetchAllCoursesByDepartmentForDropDown().then(result => {
            dispatch(setAllCoursesMin(result.data));
        }).catch(e => {
            console.log("Error fetching all dep. courses!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all courses min")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllCoursesByDepartmentIdForDropDown = depId => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        coursesAPI.fetchAllCoursesByDepartmentIdForDropDown(depId).then(result => {
            dispatch(setAllCoursesMin(result.data));
        }).catch(e => {
            console.log("Error fetching all dep. courses!", e);
            dispatch(loadingFailure(new Error(`Failed to fetch all courses min, depId = ${depId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}
//-----------------------------------------------------Table-------------------------------------------------------------

export const getAllCoursesByDepartment = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        coursesAPI.fetchAllCoursesByDepartmentForTable().then(result => {
            dispatch(setAllCourses(result.data));
        }).catch(e => {
            console.log("Error fetching all dep. courses!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all courses")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllCoursesByDepartmentId = (depId) => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        coursesAPI.fetchAllCoursesByDepartmentIdForTable(depId).then(result => {
            dispatch(setAllCourses(result.data));
        }).catch(e => {
            console.log("Error fetching all dep. courses!", e);
            dispatch(loadingFailure(new Error(`Failed to fetch all courses, depId = ${depId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}


