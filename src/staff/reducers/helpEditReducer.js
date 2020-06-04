import {dev} from "../../profile";

const testInitState = {
    isLoading: false
}

const initState = {
    isLoading: false
}

export const helpEditReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "SAVING_HELP": {
            return {...state, isLoading: action.isLoading};
        }
        case "SAVING_HELP_FAILURE": {
            console.log("Error saving a help!", action.error);
            return {...state, error: action.error};
        }
        case "SAVING_HELP_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_SAVING_HELP": {
            return {...state, error: null, message: null};
        }
        default:
            return state;
    }
}