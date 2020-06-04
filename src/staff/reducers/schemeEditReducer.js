import {dev} from "../../profile";

const testInitState = {
    isLoading: false,
    isLoadingSchemeComponents: false,
    error: null
}

const initState = {
    isLoading: false,
    isLoadingSchemeComponents: false
}

export const schemeEditReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "SAVING_SCHEME": {
            return {...state, isLoading: action.isLoading};
        }
        case "SAVING_SCHEME_FAILURE": {
            console.log("Error saving a scheme!", action.error);
            return {...state, error: action.error};
        }
        case "SAVING_SCHEME_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_SCHEME_FAILURES": {
            return {...state, error: null, errorLoadingComponents: null, message: null};
        }
        case "LOADING_SCHEME_COMPONENTS": {
            return {...state, isLoadingSchemeComponents: action.isLoading};
        }
        case "LOADING_SCHEME_COMPONENTS_FAILURE": {
            console.log("Error loading scheme components!", action.error);
            return {...state, errorLoadingComponents: action.error};
        }
        default:
            return state;
    }
}