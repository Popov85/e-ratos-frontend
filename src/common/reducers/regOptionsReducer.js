const initState = {
    isLoading: true,
    /*lms: false, // TODO remove
    allowed: true // TODO remove*/
}

export const regOptionsReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING_REG_OPTIONS": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_REG_OPTIONS_FAILURE": {
            return {...state, error: action.error};
        }
        case "SET_REG_OPTIONS": {
            return action.payload;
        }
        default:
            return state;
    }
}




