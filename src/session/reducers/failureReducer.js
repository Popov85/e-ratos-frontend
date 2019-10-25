const initState = {
    is: false,
    modal: true,
    type: null,
    location: null,
    message: null,
    serverError: null
}

export const failureReducer = (state = initState, action) => {
    switch (action.type) {
        case "RESET_FAILURE": {
            // DO it before each API call during session
            console.log("RESET_FAILURE");
            return initState;
        }
        case "CLOSE_FAILURE": {
            return {...state, modal: false};
        }
        case "SET_FAILURE": {
            console.log("Error occurred = ", action.error);
            return { ...state, is: true, location: action.location, message: action.message, serverError: action.error};
        }
        case "SET_FAILURE_WITH_BODY": {
            console.log("Server error occurred = ", action.body);
            switch (action.body.exception) {
                case "SessionAlreadyOpenedException": {
                    return { ...state, is: true, location: action.location, type: "opened", message: action.body.message };
                }
                case "SessionNotFoundException": {
                    return { ...state, is: true, location: action.location, type: "notFound", message: action.body.message};
                }
                case "RunOutOfTimeException": {
                    return { ...state, is: true, location: action.location, type: "runOutOfTime", message: action.body.message};
                }
                default: return { ...state, is: true, location: action.location, message: action.message, serverError: new Error(action.body.message)};
            }
        }
        default: return state;
    }
}