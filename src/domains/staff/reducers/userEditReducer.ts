import {
    CLEAR_SAVING_STAFF,
    SAVING_STAFF,
    SAVING_STAFF_FAILURE,
    SAVING_STAFF_SUCCESS,
    StaffEditActions
} from "../actions/userEditActions";


interface StaffEditState {
    isLoading: boolean;
    error: Error | null;
    message: string | null;
}

const initState: StaffEditState = {
    isLoading: false,
    error: null,
    message: null,
};

export const userEditReducer = (state: StaffEditState = initState, action: StaffEditActions): StaffEditState => {
    switch (action.type) {
        case SAVING_STAFF: {
            return {...state, isLoading: action.payload?.isLoading ?? false};
        }
        case SAVING_STAFF_FAILURE: {
            console.warn("Error saving staff!", action.payload?.error);
            return {...state, error: action.payload?.error ?? null};
        }
        case SAVING_STAFF_SUCCESS: {
            return {...state, message: action.payload?.message ?? null};
        }
        case CLEAR_SAVING_STAFF: {
            return {...state, error: null, message: null};
        }
        default:
            return state;
    }
}