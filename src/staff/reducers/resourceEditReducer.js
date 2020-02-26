const initState = {
    isLoading: false
}

export const resourceEditReducer = (state = initState, action) => {
    switch (action.type) {
        case "SAVING_RESOURCE": {
            return {...state, isLoading: action.isLoading};
        }
        case "SAVING_RESOURCE_FAILURE": {
            console.log("Error saving a resource!", action.error);
            return {...state, error: action.error};
        }
        case "SAVING_RESOURCE_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_SAVING_RESOURCE": {
            return {...state, error: null, message: null};
        }
        default:
            return state;
    }
}