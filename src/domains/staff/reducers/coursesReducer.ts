import {Course} from "../types/Course";
import {CourseDropDown} from "../_api/coursesAPI";
import {
    ADD_COURSE_IN_STORE, ASSOCIATE_COURSE_WITH_LMS_IN_STORE,
    CLEAR_ALL_COURSES_FAILURES,
    CLEAR_LOADING_ALL_COURSES_FAILURE,
    CLEAR_UPDATING_COURSE_FAILURE,
    CoursesActionTypes, DELETE_COURSE_FROM_STORE, DISASSOCIATE_COURSE_WITH_LMS_IN_STORE,
    LOADING_ALL_COURSES,
    LOADING_ALL_COURSES_FAILURE,
    SET_ALL_COURSES,
    SET_ALL_COURSES_MIN,
    UPDATE_COURSE_IN_STORE, UPDATE_COURSE_NAME_IN_STORE,
    UPDATING_COURSE,
    UPDATING_COURSE_FAILURE
} from "../actions/coursesActions";

type CoursesState = {
    content: Array<Course>;
    contentMin:  Array<CourseDropDown>,
    isLoading: boolean;
    isUpdating: boolean;
    error: Error | null;
    errorUpdate: Error | null;
}

const initState: CoursesState = {
    content: [],
    contentMin: [],
    isLoading: false,
    isUpdating: false,
    error: null,
    errorUpdate: null
}

export const coursesReducer = (state: CoursesState =  initState, action: CoursesActionTypes): CoursesState => {
    switch (action.type) {
        case LOADING_ALL_COURSES: {
            return {...state, isLoading: action.payload?.isLoading ?? false};
        }
        case LOADING_ALL_COURSES_FAILURE: {
            console.warn("Error loading courses!", action.payload?.error);
            return {...state, error: action.payload?.error ?? null};
        }
        case CLEAR_LOADING_ALL_COURSES_FAILURE: {
            return {...state, error: null};
        }
        case UPDATING_COURSE: {
            return {...state, isUpdating: action.payload?.isUpdating ?? false};
        }
        case UPDATING_COURSE_FAILURE: {
            console.warn("Error updating a course!", action.payload?.error);
            return {...state, errorUpdate: action.payload?.error || null};
        }
        case CLEAR_UPDATING_COURSE_FAILURE: {
            return {...state, errorUpdate: null};
        }
        case CLEAR_ALL_COURSES_FAILURES: {
            return {...state, error: null, errorUpdate: null};
        }
        case SET_ALL_COURSES: {
            return {...state, content: action.payload?.courses ?? []};
        }
        case SET_ALL_COURSES_MIN: {
            return {...state, contentMin: action.payload?.courses ?? []};
        }
        case ADD_COURSE_IN_STORE: {
            if (action.payload) {
                const {course} = action.payload;
                return {...state, content: [...state.content, course]};
            }
            return state;
        }
        case UPDATE_COURSE_IN_STORE: {
            if (action.payload) {
                const {course} = action.payload;
                return {...state, content: state.content.map((c: Course): Course => c.courseId === course.courseId ? course: c)};
            }
            return state;
        }
        case UPDATE_COURSE_NAME_IN_STORE: {
            if (action.payload) {
                const {courseId, name} = action.payload;
                return {...state, content: state.content.map((c: Course) => c.courseId === courseId ? {...c, name} : c)}
            }
            return state;
        }
        case DELETE_COURSE_FROM_STORE: {
            if (action.payload) {
                const {courseId} = action.payload;
                return {...state, content: state.content.filter((c: Course): boolean => c.courseId !== courseId)}
            }
            return state;
        }
        case ASSOCIATE_COURSE_WITH_LMS_IN_STORE: {
            if (action.payload) {
                const {courseId, lmsId} = action.payload;
                return {...state, content: state.content.map((c: Course): Course => c.courseId === courseId ? {...c, lmsId} : c)}
            }
            return state;
        }
        case DISASSOCIATE_COURSE_WITH_LMS_IN_STORE: {
            if (action.payload) {
                const {courseId} = action.payload;
                return {...state, content: state.content.map((c: Course): Course => c.courseId === courseId ? {...c, lmsId: undefined} : c)}
            }
            return state;
        }
        default:
            return state;
    }
}