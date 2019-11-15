import appAPI from "../_api/appAPI";

const LOGGING_OUT = "LOGGING_OUT";
const LOGGING_OUT_FAILURE = "LOGGING_OUT_FAILURE";
const RESET_LOGGING_OUT_FAILURE = "RESET_LOGGING_OUT_FAILURE";
const SET_LOGGED_OUT = "SET_LOGGED_OUT";

export const loggingOut = isProgress => ({type: LOGGING_OUT, isProgress});
export const loggingOutFailure = error => ({type: LOGGING_OUT_FAILURE, error});
export const resetLoggingOutFailure = () => ({type: RESET_LOGGING_OUT_FAILURE});

export const setLoggedOut = () => ({type: SET_LOGGED_OUT});

export const getLoggedOut = () => {
    return (dispatch) => {
        dispatch(resetLoggingOutFailure());
        dispatch(loggingOut(true));
        appAPI.doLogout().then(() => {
            dispatch(setLoggedOut());
        }).catch(e => {
            dispatch(loggingOutFailure(new Error("Failed to log out")));
        }).finally(() => dispatch(loggingOut(false)));
    }
}
