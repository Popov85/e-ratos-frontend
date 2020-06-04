const initState = {
    isLoading: true
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




