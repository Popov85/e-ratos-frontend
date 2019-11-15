const initState = {
    isLoading: false
}

export const userEditReducer = (state = initState, action) => {
    switch (action.type) {
        case "SAVING_STAFF": {
            return {...state, isLoading: action.isLoading};
        }
        case "SAVING_STAFF_FAILURE": {
            console.log("Error saving staff!", action.error);
            return {error: action.error};
        }
        case "SAVING_STAFF_SUCCESS": {
            return {message: action.message};
        }
        case "CLEAR_SAVING_STAFF": {
            return {error: null, message: null};
        }
        default:
            return state;
    }
}