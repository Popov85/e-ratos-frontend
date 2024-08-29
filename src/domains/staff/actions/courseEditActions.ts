import {coursesAPI as courseAPI, coursesAPI} from "../_api/coursesAPI";
import {addCourseInStore, associateCourseWithLMSInStore, updateCourseInStore} from "./coursesActions";
import {GenericAction} from "../../common/types/GenericAction";
import {Dispatch} from "redux";
import {Course} from "../types/Course";

export const SAVING_COURSE = "SAVING_COURSE" as const;
export const SAVING_COURSE_FAILURE = "SAVING_COURSE_FAILURE" as const;
export const SAVING_COURSE_SUCCESS = "SAVING_COURSE_SUCCESS" as const;
export const CLEAR_SAVING_COURSE = "CLEAR_SAVING_COURSE" as const;

// Define types for your actions
export type SavingCourseAction = GenericAction<typeof SAVING_COURSE, { isLoading: boolean }>;
export type SavingCourseFailureAction = GenericAction<typeof SAVING_COURSE_FAILURE, { error: Error }>;
export type SavingCourseSuccessAction = GenericAction<typeof SAVING_COURSE_SUCCESS, { message: string }>;
export type ClearSavingCourseFailureAction = GenericAction<typeof CLEAR_SAVING_COURSE>;

// Combine all actions into a single type
export type CourseEditActions =
    | SavingCourseAction | SavingCourseFailureAction | SavingCourseSuccessAction | ClearSavingCourseFailureAction


const loading = (isLoading: boolean): SavingCourseAction => ({
    type: SAVING_COURSE,
    payload: {isLoading}
});
const loadingFailure = (error: Error): SavingCourseFailureAction => ({
    type: SAVING_COURSE_FAILURE,
    payload: {error}
});

const loadingSuccess = (message: string ): SavingCourseSuccessAction => ({
    type: SAVING_COURSE_SUCCESS,
    payload: {message}
});

export const clearCourseState = (): ClearSavingCourseFailureAction => ({type: CLEAR_SAVING_COURSE});


export const saveCourse = (course: Course) => {
    return (dispatch: Dispatch<CourseEditActions> | any): void => {
        dispatch(clearCourseState());
        dispatch(loading(true));
        coursesAPI.saveCourse(course).then((course: Course): void => {
            dispatch(addCourseInStore(course));
            dispatch(loadingSuccess("Successfully added a course!"));
        }).catch((e: Error): void => {
            console.warn("Error saving course!", e);
            dispatch(loadingFailure(new Error("Failed to save a course!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const saveLMSCourse = (lmsCourse: Course) => {
    return (dispatch: Dispatch<CourseEditActions> | any): void => {
        dispatch(clearCourseState());
        dispatch(loading(true));
        coursesAPI.saveLMSCourse(lmsCourse).then((course: Course): void => {
            dispatch(addCourseInStore(course));
            dispatch(loadingSuccess("Successfully added an LMS course!"));
        }).catch((e: Error) :void => {
            console.warn("Error saving LMS course!", e);
            dispatch(loadingFailure(new Error("Failed to save an LMS course!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateCourse = (course: Course) => {
    return (dispatch: Dispatch<CourseEditActions> | any): void => {
        dispatch(clearCourseState());
        dispatch(loading(true));
        courseAPI.updateCourse(course).then((course: Course): void => {
            dispatch(updateCourseInStore(course));
            dispatch(loadingSuccess("Successfully updated the course!"));
        }).catch((e: Error): void => {
            console.warn("Error updating course!", e);
            dispatch(loadingFailure(new Error("Failed to update the course!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateLMSCourse = (lmsCourse: Course) => {
    return (dispatch: Dispatch<CourseEditActions> | any): void => {
        dispatch(clearCourseState());
        dispatch(loading(true));
        courseAPI.updateLMSCourse(lmsCourse).then((course: Course): void => {
            dispatch(updateCourseInStore(course));
            dispatch(loadingSuccess("Successfully updated the LMS course!"));
        }).catch((e: Error): void => {
            console.warn("Error updating LMS course!", e);
            dispatch(loadingFailure(new Error("Failed to update the LMS course!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const associateCourseWithLMS = (courseId: number, lmsId: number) => {
    return (dispatch: Dispatch<CourseEditActions> | any): void => {
        if (!lmsId) {
            dispatch(loadingFailure(new Error("Nullable LMS object! Re-select!")));
        }
        dispatch(clearCourseState());
        dispatch(loading(true));
        coursesAPI.associateCourseWithLMS(courseId, lmsId).then((status: number): void => {
            if (status >= 200 && status < 300) {
                dispatch(associateCourseWithLMSInStore(courseId, lmsId));
                dispatch(loadingSuccess("Successfully associated!"));
            } else {
                throw new Error("Failed to execute API to associate a course with an LMS!");
            }
        }).catch((e: Error):void => {
            console.warn("Error associating a course with an LMS!", e);
            dispatch(loadingFailure(new Error("Failed to associate the course with the LMS")));
        }).finally(() => dispatch(loading(false)));
    }
}
