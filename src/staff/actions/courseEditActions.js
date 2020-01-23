import {coursesAPI as courseAPI, coursesAPI} from "../_api/coursesAPI";
import {addCourseInStore, associateCourseWithLMSInStore, updateCourseInStore} from "./coursesActions";

const SAVING_COURSE = "SAVING_COURSE";
const SAVING_COURSE_FAILURE = "SAVING_COURSE_FAILURE";
const SAVING_COURSE_SUCCESS = "SAVING_COURSE_SUCCESS";
const CLEAR_SAVING_COURSE = "CLEAR_SAVING_COURSE";

export const loading = isLoading => ({type: SAVING_COURSE, isLoading});
export const loadingFailure = error => ({type: SAVING_COURSE_FAILURE, error});
export const loadingSuccess = message => ({type: SAVING_COURSE_SUCCESS, message});
export const clearCourseState = () => ({type: CLEAR_SAVING_COURSE});


export const saveCourse = (courseDTO) => {
    return (dispatch) => {
        dispatch(clearCourseState());
        dispatch(loading(true));
        coursesAPI.saveCourse(courseDTO).then(result => {
            dispatch(addCourseInStore(result.data));
            dispatch(loadingSuccess("Successfully added a course!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to save a course!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const saveLMSCourse = (lmsCourseDTO) => {
    return (dispatch) => {
        dispatch(clearCourseState());
        dispatch(loading(true));
        coursesAPI.saveLMSCourse(lmsCourseDTO).then(result => {
            dispatch(addCourseInStore(result.data));
            dispatch(loadingSuccess("Successfully added an LMS course!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to save an LMS course!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateCourse = (courseDTO) => {
    return (dispatch) => {
        dispatch(clearCourseState());
        dispatch(loading(true));
        courseAPI.updateCourse(courseDTO).then((result) => {
            dispatch(updateCourseInStore(result.data));
            dispatch(loadingSuccess("Successfully updated the course!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to update the course!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateLMSCourse = (lmsCourseDTO) => {
    return (dispatch) => {
        dispatch(clearCourseState());
        dispatch(loading(true));
        courseAPI.updateLMSCourse(lmsCourseDTO).then((result) => {
            dispatch(updateCourseInStore(result.data));
            dispatch(loadingSuccess("Successfully updated the LMS course!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to update the LMS course!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const associateCourseWithLMS = (courseId, lms) => {
    return (dispatch) => {
        if (!lms)
            dispatch(loadingFailure(new Error("Nullable LMS object! Re-select!")));
        dispatch(clearCourseState());
        dispatch(loading(true));
        coursesAPI.associateCourseWithLMS(courseId, lms.lmsId).then(() => {
            dispatch(associateCourseWithLMSInStore(courseId, lms));
            dispatch(loadingSuccess("Successfully associated!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to associate the course with the LMS")));
        }).finally(() => dispatch(loading(false)));
    }
}
