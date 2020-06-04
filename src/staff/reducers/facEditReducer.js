import {dev} from "../../profile";

const testInitState = {
    isLoading: false,
    error: null
}


const initState = {
    isLoading: false
}

export const facEditReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "SAVING_FAC": {
            return {...state, isLoading: action.isLoading};
        }
        case "SAVING_FAC_FAILURE": {
            console.log("Error saving a fac!", action.error);
            return {...state, error: action.error};
        }
        case "SAVING_FAC_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_SAVING_FAC": {
            return {...state, error: null, message: null};
        }
        default:
            return state;
    }
}