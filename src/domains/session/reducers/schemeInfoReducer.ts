import {SchemeInfo} from "../types/SchemeInfo";
import {
    LOADING_SCHEME_INFO,
    LOADING_SCHEME_INFO_FAILURE,
    RESET_SCHEME_INFO_FAILURE,
    SchemeInfoActions, SET_SCHEME_INFO
} from "../actions/schemeInfoActions";

// Define the shape of the state
type SchemeInfoState = {
    isLoading: boolean;
    errorScheme: Error | null;
    schemeInfo: SchemeInfo | null;
}

// Initial state
const initState: SchemeInfoState = {
    isLoading: true,
    errorScheme: null,
    schemeInfo: null,
};

export const schemeInfoReducer = (state: SchemeInfoState = initState, action: SchemeInfoActions): SchemeInfoState => {
    switch (action.type) {
        case LOADING_SCHEME_INFO: {
            const isLoading = action.payload ?? false;
            return {...state, isLoading: isLoading};
        }
        case RESET_SCHEME_INFO_FAILURE: {
            return {...state, errorScheme: null};
        }
        case LOADING_SCHEME_INFO_FAILURE: {
            console.warn("Error loading SchemeInfo!", action.payload);
            return {...state, errorScheme: action.payload ?? null};
        }
        case SET_SCHEME_INFO: {
            return {...state, schemeInfo: action.payload ?? null};
        }
        default:
            return state;
    }
};
