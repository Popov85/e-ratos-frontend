import {dev} from "../../profile";

const testInitState = {
    isLoading: false
}

const initState = {
    isLoading: false
}

export const settingsEditReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "SAVING_SETTINGS": {
            return {...state, isLoading: action.isLoading};
        }
        case "SAVING_SETTINGS_FAILURE": {
            console.log("Error saving a settings!", action.error);
            return {...state, error: action.error};
        }
        case "SAVING_SETTINGS_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_SAVING_SETTINGS": {
            return {...state, error: null, message: null};
        }
        default:
            return state;
    }
}