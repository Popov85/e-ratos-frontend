const testInitState = {
    isLoading: false,
    error: null
}


const initState = {
    isLoading: false
}

export const depEditReducer = (state = initState, action) => {
    switch (action.type) {
        case "SAVING_DEP": {
            return {...state, isLoading: action.isLoading};
        }
        case "SAVING_DEP_FAILURE": {
            console.log("Error saving a dep!", action.error);
            return {...state, error: action.error};
        }
        case "SAVING_DEP_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_SAVING_DEP": {
            return {...state, error: null, message: null};
        }
        default:
            return state;
    }
}