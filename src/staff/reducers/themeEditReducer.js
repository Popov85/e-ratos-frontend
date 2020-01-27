const initState = {
    isLoading: false
}

export const themeEditReducer = (state = initState, action) => {
    switch (action.type) {
        case "SAVING_THEME": {
            return {...state, isLoading: action.isLoading};
        }
        case "SAVING_THEME_FAILURE": {
            console.log("Error saving a theme!", action.error);
            return {...state, error: action.error};
        }
        case "SAVING_THEME_SUCCESS": {
            return {...state, message: action.message};
        }
        case "CLEAR_SAVING_THEME": {
            return {...state, error: null, message: null};
        }
        default:
            return state;
    }
}