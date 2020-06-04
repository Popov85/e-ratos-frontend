import {dev} from "../../profile";

const testInitState = {
    isLoading: false,
    generatedClientSecret: null,
}

const initState = {
    isLoading: false,
    generatedClientSecret: null, // Used to generate a rather long sequence programmatically (just to hinder typing it manually!)
}

export const lmsEditReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "SAVING_LMS": {
            return {...state, isLoading: action.isLoading};
        }
        case "SAVING_LMS_FAILURE": {
            console.log("Error saving an LMS!", action.error);
            return {...state, error: action.error};
        }
        case "SAVING_LMS_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_SAVING_LMS": {
            return {...state, error: null, message: null};
        }
        default:
            return state;
    }
}