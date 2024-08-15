import {
    CLEAR_SAVING_FAC,
    FacEditActions,
    SAVING_FAC,
    SAVING_FAC_FAILURE,
    SAVING_FAC_SUCCESS
} from "../actions/facEditActions";

type FacEditState = {
    isLoading: boolean;
    error?: Error | null;
    message?: string | null;
}

const initState: FacEditState = {
    isLoading: false,
    error: null,
    message: null
};

export const facEditReducer = (state: FacEditState = initState, action: FacEditActions): FacEditState => {
    switch (action.type) {
        case SAVING_FAC: {
            return { ...state, isLoading: action.payload?.isLoading ?? false};
        }
        case SAVING_FAC_FAILURE: {
            console.warn("Error saving a fac!", action.payload?.error);
            return { ...state, error: action.payload?.error };
        }
        case SAVING_FAC_SUCCESS: {
            return { ...state, message: action.payload?.message};
        }
        case CLEAR_SAVING_FAC: {
            return { ...state, error: null, message: null };
        }
        default:
            return state;
    }
};
