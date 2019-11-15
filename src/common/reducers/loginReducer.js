const initState = {
    logged: false
}

export const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGGING_IN": {
            return { ...state, isLoggingIn: action.isProgress };
        }
        case "LOGGING_IN_FAILURE": {
            console.log("Failed to login, error = ", action.error);
            return { ...state, errorLoggingIn: action.error};
        }
        case "RESET_LOGGING_IN_FAILURE": {
            return { ...state, errorLoggingIn: null};
        }
        case "SET_LOGGED_IN": {
            return {logged: true};
        }
        case "SET_REDIRECTED": {
            return { ...state, url: action.url};
        }
        default: return state;
    }
}