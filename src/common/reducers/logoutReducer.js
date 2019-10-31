const initState = {
    logged: true
}

export const logoutReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGGING_OUT": {
            return { ...state, isLoggingOut: action.isProgress };
        }
        case "LOGGING_OUT_FAILURE": {
            console.log("Failed to logout, error = ", action.error);
            return { ...state, errorLoggingOut: action.error};
        }
        case "SET_LOGGED_OUT": {
            return {logged: false};
        }
        default: return state;
    }
}