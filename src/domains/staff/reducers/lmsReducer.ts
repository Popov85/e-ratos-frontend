import {
    ADD_LMS_IN_STORE,
    CLEAR_ALL_LMS_FAILURES,
    CLEAR_LOADING_ALL_LMS_FAILURE,
    CLEAR_UPDATING_LMS_FAILURE, DELETE_LMS_FROM_STORE,
    LMSActionTypes,
    LOADING_ALL_LMS,
    LOADING_ALL_LMS_FAILURE,
    SET_ALL_LMS,
    SET_ALL_LMS_MIN,
    UPDATE_LMS_IN_STORE,
    UPDATE_LMS_NAME_IN_STORE,
    UPDATING_LMS,
    UPDATING_LMS_FAILURE
} from "../actions/lmsActions";
import {LMS} from "../types/LMS";
import {LMSDropDown} from "../_api/lmsAPI";

// Define the state interface
type LMSState = {
    content: Array<LMS>;
    contentMin: Array<LMSDropDown>;
    isLoading: boolean;
    isUpdating: boolean;
    error: Error | null;
    errorUpdate: Error | null;
}


const initState: LMSState = {
    content: [],
    contentMin: [],
    isLoading: false,
    isUpdating: false,
    error: null,
    errorUpdate:null
}

export const lmsReducer = (state: LMSState = initState, action: LMSActionTypes): LMSState => {
    switch (action.type) {
        case LOADING_ALL_LMS: {
            return {...state, isLoading: action.payload?.isLoading ?? false};
        }
        case LOADING_ALL_LMS_FAILURE: {
            console.warn("Error loading lmses!", action.payload?.error);
            return {...state, error: action.payload?.error || null};
        }
        case CLEAR_LOADING_ALL_LMS_FAILURE: {
            return {...state, error: null};
        }
        case UPDATING_LMS: {
            return {...state, isUpdating: action.payload?.isUpdating ?? false};
        }
        case UPDATING_LMS_FAILURE: {
            console.warn("Error updating an LMS!", action.payload?.errorUpdate);
            return {...state, errorUpdate: action.payload?.errorUpdate ?? null};
        }
        case CLEAR_UPDATING_LMS_FAILURE: {
            return {...state, errorUpdate: null};
        }
        case CLEAR_ALL_LMS_FAILURES: {
            return {...state, error: null, errorUpdate: null};
        }
        case SET_ALL_LMS: {
            return {...state, content: action.payload ?? []};
        }
        case SET_ALL_LMS_MIN: { // For drop-downs
            return {...state, contentMin: action.payload ?? []};
        }
        case ADD_LMS_IN_STORE: {
            if (action.payload) {
                return {...state, content: [...state.content, action.payload]};
            }
            return state;
        }
        case UPDATE_LMS_IN_STORE: {
            if (action.payload) {
                const lms: LMS = action.payload;
                return {...state, content: state.content.map((l: LMS): LMS => l.lmsId === lms.lmsId ? lms : l)}
            }
            return state;

        }
        case UPDATE_LMS_NAME_IN_STORE: {
            if (action.payload) {
                const {lmsId, name} = action.payload;
                return {...state, content: state.content.map((lms: LMS) => lms.lmsId === lmsId ? {...lms, name} : lms)}
            }
            return state;
        }
        case DELETE_LMS_FROM_STORE: {
            if (action.payload) {
                const {lmsId} = action.payload;
                return {...state, content: state.content.filter((lms: LMS): boolean => lms.lmsId !== lmsId)}
            }
            return state;
        }
        default:
            return state;
    }
}