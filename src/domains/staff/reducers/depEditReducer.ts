import {
    CLEAR_SAVING_DEP,
    DepEditActions,
    SAVING_DEP,
    SAVING_DEP_FAILURE,
    SAVING_DEP_SUCCESS
} from "../actions/depEditActions";

type DepEditState = {
    isLoading: boolean;
    error: Error | null;
    message: string | null;
}

const initState: DepEditState = {
    isLoading: false,
    error: null,
    message: null,
};

export const depEditReducer = (state: DepEditState = initState, action: DepEditActions): DepEditState => {
    switch (action.type) {
        case SAVING_DEP: {
            return { ...state, isLoading: action.payload?.isLoading ?? false };
        }
        case SAVING_DEP_FAILURE: {
            console.warn("Error saving a dep!", action.payload?.error);
            return { ...state, error: action.payload?.error ?? null };
        }
        case SAVING_DEP_SUCCESS: {
            return { ...state, message: action.payload?.message ?? null };
        }
        case CLEAR_SAVING_DEP: {
            return { ...state, error: null, message: null };
        }
        default:
            return state;
    }
};