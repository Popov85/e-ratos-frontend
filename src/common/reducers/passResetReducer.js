const initState = {
    isPerforming: false,
    error: null
}

export const passwordResetReducer = (state = initState, action) => {
    switch (action.type) {
        case "PERFORMING_PASS_RESET": {
            return { ...state, isPerforming: action.isPerforming };
        }
        case "PERFORMING_PASS_RESET_FAILURE": {
            console.log("Failed to perform password reset, error = ", action.error);
            return { ...state, error: action.error};
        }
        default: return state;
    }
}
