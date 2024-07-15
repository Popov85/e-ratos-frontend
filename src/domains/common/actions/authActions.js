import authAPI from "../_api/authAPI";

const CHECKING_LOGGING = "CHECKING_LOGGING";
const CHECKING_LOGGING_FAILURE = "CHECKING_LOGGING_FAILURE";
const RESET_CHECKING_LOGGING_FAILURE = "RESET_CHECKING_LOGGING_FAILURE";

const LOGGING_IN = "LOGGING_IN";
const LOGGING_IN_FAILURE = "LOGGING_IN_FAILURE";
const RESET_LOGGING_IN_FAILURE = "RESET_LOGGING_IN_FAILURE";
const SET_LOGGED_IN = "SET_LOGGED_IN";
const SET_LOGGED_OUT = "SET_LOGGED_OUT";
const SET_AUTHORIZED = "SET_AUTHORIZED";

const UPDATE_USER_INFO = "UPDATE_USER_INFO";

const SERVER_LOGGING_OUT = "SERVER_LOGGING_OUT";
const SERVER_LOGGING_OUT_FAILURE = "SERVER_LOGGING_OUT_FAILURE";
const SERVER_RESET_LOGGING_OUT_FAILURE = "SERVER_RESET_LOGGING_OUT_FAILURE";

export const checkLogging = inProgress => ({type: CHECKING_LOGGING, inProgress});
export const checkLoggingFailure = error => ({type: CHECKING_LOGGING_FAILURE, error});
export const resetCheckLoggingFailure = () => ({type: RESET_CHECKING_LOGGING_FAILURE});
export const loggingIn = inProgress => ({type: LOGGING_IN, inProgress});
export const loggingInFailure = error => ({type: LOGGING_IN_FAILURE, error});
export const resetLoggingInFailure = () => ({type: RESET_LOGGING_IN_FAILURE});
export const setLoggedIn = (userInfo) => ({type: SET_LOGGED_IN, payload: userInfo});
export const setLoggedOut = () => ({type: SET_LOGGED_OUT});

export const serverLoggingOut = isProgress => ({type: SERVER_LOGGING_OUT, isProgress});
export const serverLoggingOutFailure = error => ({type: SERVER_LOGGING_OUT_FAILURE, error});
export const serverResetLoggingOutFailure = () => ({type: SERVER_RESET_LOGGING_OUT_FAILURE});

export const setAuthorized = authorized => ({type: SET_AUTHORIZED, authorized});

export const updateUserInfo = userInfo => ({type: UPDATE_USER_INFO, userInfo});

export const checkLogged = () => {
    return (dispatch) => {
        dispatch(resetCheckLoggingFailure());
        dispatch(checkLogging(true));
        authAPI.fetchUserInfo()
            .then(userInfo => {
                dispatch(setLoggedIn(userInfo));
            }).catch(e => {
            dispatch(setLoggedOut());
            dispatch(checkLoggingFailure(new Error("Failed to check if user is logged")));
        }).finally(() => dispatch(checkLogging(false)));
    }
}

export const getLogged = credentials => {
    return (dispatch) => {
        dispatch(resetLoggingInFailure());
        dispatch(loggingIn(true));
        authAPI.doLogin(credentials)
            .then(status => {
                if (status === 200) {
                    // After successful login, fetch user profile
                    return authAPI.fetchUserInfo();
                } else {
                    throw new Error("Unsuccessful authentication attempt!");
                }
            }).then(userInfo => {
            // Handle successful user profile fetch
            dispatch(setLoggedIn(userInfo));
        }).catch(error => {
            dispatch(loggingInFailure(error));
        }).finally(() => dispatch(loggingIn(false)));
    }
}

export const getLoggedOut = () => {
    return (dispatch) => {
        dispatch(serverResetLoggingOutFailure());
        dispatch(serverLoggingOut(true));
        authAPI.doLogout().then(() => {
            // Ignore code status, do log out anyway
            dispatch(setLoggedOut());
        }).catch(e => {
            dispatch(serverLoggingOutFailure(new Error("Failed to log out")));
        }).finally(() => dispatch(serverLoggingOut(false)));
    }
}



