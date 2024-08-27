import {CourseDropDown, coursesAPI} from "../_api/coursesAPI";
import {GenericAction} from "../../common/types/GenericAction";
import {Course} from "../types/Course";
import {Dispatch} from "redux";

export const LOADING_ALL_COURSES = "LOADING_ALL_COURSES" as const;
export const LOADING_ALL_COURSES_FAILURE = "LOADING_ALL_COURSES_FAILURE" as const;
export const CLEAR_LOADING_ALL_COURSES_FAILURE = "CLEAR_LOADING_ALL_COURSES_FAILURE" as const;
export const SET_ALL_COURSES = "SET_ALL_COURSES" as const;
export const SET_ALL_COURSES_MIN = "SET_ALL_COURSES_MIN" as const;
export const UPDATING_COURSE = "UPDATING_COURSE" as const;
export const UPDATING_COURSE_FAILURE = "UPDATING_COURSE_FAILURE" as const;
export const CLEAR_UPDATING_COURSE_FAILURE = "CLEAR_UPDATING_COURSE_FAILURE" as const;
export const CLEAR_ALL_COURSES_FAILURES = "CLEAR_ALL_COURSES_FAILURES" as const;
export const ADD_COURSE_IN_STORE = "ADD_COURSE_IN_STORE" as const;
export const UPDATE_COURSE_IN_STORE = "UPDATE_COURSE_IN_STORE" as const;
export const UPDATE_COURSE_NAME_IN_STORE = "UPDATE_COURSE_NAME_IN_STORE" as const;
export const DELETE_COURSE_FROM_STORE = "DELETE_COURSE_FROM_STORE" as const;
export const ASSOCIATE_COURSE_WITH_LMS_IN_STORE = "ASSOCIATE_COURSE_WITH_LMS_IN_STORE" as const;
export const DISASSOCIATE_COURSE_WITH_LMS_IN_STORE = "DISASSOCIATE_COURSE_WITH_LMS_IN_STORE" as const;

// Action types using GenericAction
export type LoadingAllCoursesAction = GenericAction<typeof LOADING_ALL_COURSES, { isLoading: boolean }>;
export type LoadingAllCoursesFailureAction = GenericAction<typeof LOADING_ALL_COURSES_FAILURE, { error: Error }>;
export type ClearLoadingAllCoursesFailureAction = GenericAction<typeof CLEAR_LOADING_ALL_COURSES_FAILURE>;
export type SetAllCoursesAction = GenericAction<typeof SET_ALL_COURSES, { courses: Array<Course> }>;
export type SetAllCoursesMinAction = GenericAction<typeof SET_ALL_COURSES_MIN, { courses: Array<CourseDropDown> }>;
export type UpdatingCourseAction = GenericAction<typeof UPDATING_COURSE, { isUpdating: boolean }>;
export type UpdatingCourseFailureAction = GenericAction<typeof UPDATING_COURSE_FAILURE, { error: Error }>;
export type ClearUpdatingCoursesFailureAction = GenericAction<typeof CLEAR_UPDATING_COURSE_FAILURE>;
export type ClearAllCoursesFailureAction = GenericAction<typeof CLEAR_ALL_COURSES_FAILURES>;
export type AddCourseInStoreAction = GenericAction<typeof ADD_COURSE_IN_STORE, { course: Course }>;
export type UpdateCourseInStoreAction = GenericAction<typeof UPDATE_COURSE_IN_STORE, { course: Course }>;
export type UpdateCourseNameInStoreAction = GenericAction<typeof UPDATE_COURSE_NAME_IN_STORE, { courseId: number, name: string }>;
export type AssociateCourseWithLMSAction = GenericAction<typeof ASSOCIATE_COURSE_WITH_LMS_IN_STORE, { courseId: number, lmsId: number }>;
export type DisassociateCourseWithLMSAction = GenericAction<typeof DISASSOCIATE_COURSE_WITH_LMS_IN_STORE, { courseId: number}>;
export type DeleteCourseAction = GenericAction<typeof DELETE_COURSE_FROM_STORE, { courseId: number}>;

// Union type for all actions
export type CoursesActionTypes =
    | LoadingAllCoursesAction
    | LoadingAllCoursesFailureAction
    | ClearLoadingAllCoursesFailureAction
    | SetAllCoursesAction
    | SetAllCoursesMinAction
    | UpdatingCourseAction
    | UpdatingCourseFailureAction
    | ClearUpdatingCoursesFailureAction
    | ClearAllCoursesFailureAction
    | AddCourseInStoreAction
    | UpdateCourseInStoreAction
    | UpdateCourseNameInStoreAction
    | AssociateCourseWithLMSAction
    | DisassociateCourseWithLMSAction
    | DeleteCourseAction


const loading = (isLoading: boolean): LoadingAllCoursesAction => ({
    type: LOADING_ALL_COURSES,
    payload: {isLoading}
});
const loadingFailure = (error: Error): LoadingAllCoursesFailureAction => ({
    type: LOADING_ALL_COURSES_FAILURE,
    payload: {error}
});
export const clearLoadingFailure = (): ClearLoadingAllCoursesFailureAction => ({
    type: CLEAR_LOADING_ALL_COURSES_FAILURE
});

export const setAllCourses = (courses: Array<Course>): SetAllCoursesAction => ({
    type: SET_ALL_COURSES,
    payload: {courses}
});

export const setAllCoursesMin = (courses: Array<CourseDropDown>):SetAllCoursesMinAction => ({
    type: SET_ALL_COURSES_MIN,
    payload: {courses}
});

const updating = (isUpdating: boolean): UpdatingCourseAction => ({
    type: UPDATING_COURSE,
    payload: {isUpdating}
});

const updatingFailure = (error: Error): UpdatingCourseFailureAction => ({
    type: UPDATING_COURSE_FAILURE,
    payload: {error}
});

const clearUpdatingCourseFailure = (): ClearUpdatingCoursesFailureAction => ({type: CLEAR_UPDATING_COURSE_FAILURE});

export const clearAllCoursesFailures = (): ClearAllCoursesFailureAction => ({type: CLEAR_ALL_COURSES_FAILURES});

export const addCourseInStore = (course:Course): AddCourseInStoreAction => ({
    type: ADD_COURSE_IN_STORE,
    payload: {course}
});

export const updateCourseInStore = (course: Course): UpdateCourseInStoreAction => ({
    type: UPDATE_COURSE_IN_STORE,
    payload: {course}
});
export const updateCourseNameInStore = (courseId: number, name: string): UpdateCourseNameInStoreAction => ({
    type: UPDATE_COURSE_NAME_IN_STORE,
    payload: {courseId, name}
});

export const associateCourseWithLMSInStore = (courseId: number, lmsId: number): AssociateCourseWithLMSAction => ({
    type: ASSOCIATE_COURSE_WITH_LMS_IN_STORE,
    payload: {courseId, lmsId}
});
export const disassociateCourseWithLMSInStore = (courseId: number): DisassociateCourseWithLMSAction => ({
    type: DISASSOCIATE_COURSE_WITH_LMS_IN_STORE,
    payload: {courseId}
});
const deleteCourseFromStore = (courseId: number): DeleteCourseAction => ({
    type: DELETE_COURSE_FROM_STORE,
    payload: {courseId}
});


export const updateCourseName = (courseId: number, name: string) => {
    return (dispatch: Dispatch<CoursesActionTypes>): void => {
        dispatch(clearUpdatingCourseFailure());
        dispatch(updating(true));
        coursesAPI.updateCourseName(courseId, name).then((status: number): void => {
            if (status >= 200 && status < 300) {
                dispatch(updateCourseNameInStore(courseId, name));
            } else {
                throw new Error("Failed to execute API to update an course name!");
            }
        }).catch((e: Error): void => {
            console.warn("Error updating course name!", e);
            dispatch(updatingFailure(new Error("Failed to update course's name")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const disassociateCourseWithLMS = (courseId: number) => {
    return (dispatch: Dispatch<CoursesActionTypes>): void => {
        dispatch(clearUpdatingCourseFailure());
        dispatch(updating(true));
        coursesAPI.disassociateCourseWithLMS(courseId).then((status: number): void => {
            if (status >= 200 && status < 300) {
                dispatch(disassociateCourseWithLMSInStore(courseId));
            } else {
                throw new Error("Failed to execute API to disassociate course and LMS!");
            }
        }).catch((e: Error): void => {
            console.warn("Error disassociating course and LMS!", e);
            dispatch(updatingFailure(new Error("Failed to disassociate the course with the LMS")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteCourse = (courseId: number) => {
    return (dispatch: Dispatch<CoursesActionTypes>): void => {
        dispatch(clearUpdatingCourseFailure());
        dispatch(updating(true));
        coursesAPI.deleteCourse(courseId).then((status: number): void => {
            if (status >= 200 && status < 300) {
                dispatch(deleteCourseFromStore(courseId));
            } else {
                throw new Error("Failed to execute API to delete a course!");
            }
        }).catch((e: Error): void => {
            console.warn("Error deleting a course!", e);
            dispatch(updatingFailure(new Error("Failed to delete course!")));
        }).finally(() => dispatch(updating(false)));
    }
}

//----------------------------------------------------Drop-down---------------------------------------------------------
export const getAllCoursesByDepartmentForDropDown = () => {
    return (dispatch: Dispatch<CoursesActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        coursesAPI.fetchAllCoursesByDepartmentForDropDown()
            .then((courses: Array<CourseDropDown>): void => {
            dispatch(setAllCoursesMin(courses));
        }).catch((e: Error): void => {
            console.warn("Error fetching all dep. courses!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all courses min")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllCoursesByDepartmentIdForDropDown = (depId: number) => {
    return (dispatch: Dispatch<CoursesActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        coursesAPI.fetchAllCoursesByDepartmentIdForDropDown(depId)
            .then((courses: Array<CourseDropDown>): void => {
            dispatch(setAllCoursesMin(courses));
        }).catch((e: Error): void => {
            console.warn("Error fetching all dep. courses!", e);
            dispatch(loadingFailure(new Error(`Failed to fetch all courses min, depId = ${depId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}
//-----------------------------------------------------Table-------------------------------------------------------------

export const getAllCoursesByDepartment = () => {
    return (dispatch: Dispatch<CoursesActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        coursesAPI.fetchAllCoursesByDepartmentForTable().then((courses: Array<Course>): void => {
            dispatch(setAllCourses(courses));
        }).catch((e: Error):void => {
            console.warn("Error fetching all dep. courses!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all courses")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllCoursesByDepartmentId = (depId: number) => {
    return (dispatch: Dispatch<CoursesActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        coursesAPI.fetchAllCoursesByDepartmentIdForTable(depId)
            .then((courses: Array<Course>): void => {
            dispatch(setAllCourses(courses));
        }).catch((e: Error): void => {
            console.warn("Error fetching all dep. courses!", e);
            dispatch(loadingFailure(new Error(`Failed to fetch all courses, depId = ${depId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}


