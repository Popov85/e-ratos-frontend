import {
    CLEAR_SAVING_LMS,
    LMSEditActionTypes,
    SAVING_LMS,
    SAVING_LMS_FAILURE,
    SAVING_LMS_SUCCESS
} from "../actions/lmsEditActions";

type LMSEditState = {
    isLoading: boolean;
    error: Error | null;
    message: string | null;
}

const initState: LMSEditState = {
    isLoading: false,
    error: null,
    message: null
}

export const lmsEditReducer = (state: LMSEditState = initState, action: LMSEditActionTypes): LMSEditState => {
    switch (action.type) {
        case SAVING_LMS: {
            return {...state, isLoading: action.payload?.isLoading ?? false};
        }
        case SAVING_LMS_FAILURE: {
            console.warn("Error saving an LMS!", action.payload?.error);
            return {...state, error: action.payload?.error ?? null};
        }
        case SAVING_LMS_SUCCESS: {
            return {...state, message: action.payload?.message ?? null};
        }
        case CLEAR_SAVING_LMS: {
            return {...state, error: null, message: null};
        }
        default:
            return state;
    }
}