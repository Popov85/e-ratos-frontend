const testInitState = {
    isLoading: false
}

const initState = {
    isLoading: false
}

export const modeEditReducer = (state = initState, action) => {
    switch (action.type) {
        case "SAVING_MODE": {
            return {...state, isLoading: action.isLoading};
        }
        case "SAVING_MODE_FAILURE": {
            console.log("Error saving a mode!", action.error);
            return {...state, error: action.error};
        }
        case "SAVING_MODE_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_SAVING_MODE": {
            return {...state, error: null, message: null};
        }
        default:
            return state;
    }
}