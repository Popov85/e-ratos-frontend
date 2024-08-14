import {
    CLEAR_SAVING_ORG,
    OrgEditActions,
    SAVING_ORG,
    SAVING_ORG_FAILURE,
    SAVING_ORG_SUCCESS
} from "../actions/orgEditActions";

interface OrgEditState {
    isLoading: boolean;
    error: Error | null;
    message: string | null;
}

const initState: OrgEditState = {
    isLoading: false,
    error: null,
    message: null,
};

export const orgEditReducer = (state: OrgEditState = initState, action: OrgEditActions): OrgEditState => {
    switch (action.type) {
        case SAVING_ORG: {
            return { ...state, isLoading: action.payload?.isLoading ?? false };
        }
        case SAVING_ORG_FAILURE: {
            console.warn("Error saving an org!", action.payload);
            return { ...state, error: action.payload?.error ?? null};
        }
        case SAVING_ORG_SUCCESS: {
            return { ...state, message: action.payload?.message ?? null };
        }
        case CLEAR_SAVING_ORG: {
            return { ...state, error: null, message: null, isLoading: false };
        }
        default:
            return state;
    }
};
