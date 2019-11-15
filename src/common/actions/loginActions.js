import appAPI from "../../common/_api/appAPI";

const LOGGING_IN = "LOGGING_IN";
const LOGGING_IN_FAILURE = "LOGGING_IN_FAILURE";
const RESET_LOGGING_IN_FAILURE = "RESET_LOGGING_IN_FAILURE";

const SET_LOGGED_IN = "SET_LOGGED_IN";
const SET_REDIRECTED = "SET_REDIRECTED";

export const loggingIn = isProgress => ({type: LOGGING_IN, isProgress});
export const loggingInFailure = error => ({type: LOGGING_IN_FAILURE, error});
export const resetLoggingInFailure = () => ({type: RESET_LOGGING_IN_FAILURE});

export const setLoggedIn = () => ({type: SET_LOGGED_IN});
export const setRedirected = (url) => ({type: SET_REDIRECTED, url});

export const getLogged = (credentials) => {
    return (dispatch) => {
        dispatch(resetLoggingInFailure());
        dispatch(loggingIn(true));
        appAPI.doLogin(credentials).then(response => {
            if (response.redirected) {
                dispatch(setLoggedIn());
                dispatch(setRedirected(response.url));
            } else {
                throw new Error("Unsuccessful authentication attempt!");
            }
        }).catch(error => {
            dispatch(loggingInFailure(error));
        }).finally(() => dispatch(loggingIn(false)));
    }
}



