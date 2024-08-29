import {
    CLEAR_SAVING_COURSE,
    CourseEditActions,
    SAVING_COURSE,
    SAVING_COURSE_FAILURE,
    SAVING_COURSE_SUCCESS
} from "../actions/courseEditActions";


type CourseEditState = {
    isLoading: boolean;
    error: Error | null;
    message: string | null;
}

const initState: CourseEditState = {
    isLoading: false,
    error: null,
    message: null
}

export const courseEditReducer = (state: CourseEditState = initState, action: CourseEditActions): CourseEditState => {
    switch (action.type) {
        case SAVING_COURSE: {
            return {...state, isLoading: action.payload?.isLoading ?? false};
        }
        case SAVING_COURSE_FAILURE: {
            console.warn("Error saving a course!", action.payload?.error);
            return {...state, error: action.payload?.error ?? null};
        }
        case SAVING_COURSE_SUCCESS: {
            return {...state, message: action.payload?.message ?? null};
        }
        case CLEAR_SAVING_COURSE: {
            return {...state, error: null, message: null};
        }
        default:
            return state;
    }
}