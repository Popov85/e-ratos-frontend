import { Dispatch } from "redux";
import authAPI from "../_api/authAPI";
import {UserInfo} from "../types/UserInfo";
import {Credentials} from "../types/Credentials";
import {GenericAction} from "../types/GenericAction";

// Action type constants
export const CHECKING_LOGGING = "CHECKING_LOGGING";
export const CHECKING_LOGGING_FAILURE = "CHECKING_LOGGING_FAILURE";
export const RESET_CHECKING_LOGGING_FAILURE = "RESET_CHECKING_LOGGING_FAILURE";
export const LOGGING_IN = "LOGGING_IN";
export const LOGGING_IN_FAILURE = "LOGGING_IN_FAILURE";
export const RESET_LOGGING_IN_FAILURE = "RESET_LOGGING_IN_FAILURE";
export const SET_LOGGED_IN = "SET_LOGGED_IN";
export const SET_LOGGED_OUT = "SET_LOGGED_OUT";
export const SET_AUTHORIZED = "SET_AUTHORIZED";
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";
export const SERVER_LOGGING_OUT = "SERVER_LOGGING_OUT";
export const SERVER_LOGGING_OUT_FAILURE = "SERVER_LOGGING_OUT_FAILURE";
export const SERVER_RESET_LOGGING_OUT_FAILURE = "SERVER_RESET_LOGGING_OUT_FAILURE";

// Action types using GenericAction
export type CheckLoggingAction = GenericAction<typeof CHECKING_LOGGING, { inProgress: boolean }>;
export type CheckLoggingFailureAction = GenericAction<typeof CHECKING_LOGGING_FAILURE, { error: Error }>;
export type ResetCheckLoggingFailureAction = GenericAction<typeof RESET_CHECKING_LOGGING_FAILURE>;
export type LoggingInAction = GenericAction<typeof LOGGING_IN, { inProgress: boolean }>;
export type LoggingInFailureAction = GenericAction<typeof LOGGING_IN_FAILURE, { error: Error }>;
export type ResetLoggingInFailureAction = GenericAction<typeof RESET_LOGGING_IN_FAILURE>;
export type SetLoggedInAction = GenericAction<typeof SET_LOGGED_IN, UserInfo>;
export type SetLoggedOutAction = GenericAction<typeof SET_LOGGED_OUT>;
export type SetAuthorizedAction = GenericAction<typeof SET_AUTHORIZED, { authorized: boolean }>;
export type UpdateUserInfoAction = GenericAction<typeof UPDATE_USER_INFO, UserInfo>;
export type ServerLoggingOutAction = GenericAction<typeof SERVER_LOGGING_OUT, { isProgress: boolean }>;
export type ServerLoggingOutFailureAction = GenericAction<typeof SERVER_LOGGING_OUT_FAILURE, { error: Error }>;
export type ServerResetLoggingOutFailureAction = GenericAction<typeof SERVER_RESET_LOGGING_OUT_FAILURE>;

// Union type for all actions
export type AuthActionTypes =
    | CheckLoggingAction
    | CheckLoggingFailureAction
    | ResetCheckLoggingFailureAction
    | LoggingInAction
    | LoggingInFailureAction
    | ResetLoggingInFailureAction
    | SetLoggedInAction
    | SetLoggedOutAction
    | SetAuthorizedAction
    | UpdateUserInfoAction
    | ServerLoggingOutAction
    | ServerLoggingOutFailureAction
    | ServerResetLoggingOutFailureAction;

// Action creators using the generic type
export const checkLogging = (inProgress: boolean): CheckLoggingAction => ({
    type: CHECKING_LOGGING,
    payload: { inProgress },
});

export const checkLoggingFailure = (error: Error): CheckLoggingFailureAction => ({
    type: CHECKING_LOGGING_FAILURE,
    payload: { error },
});

export const resetCheckLoggingFailure = (): ResetCheckLoggingFailureAction => ({
    type: RESET_CHECKING_LOGGING_FAILURE,
});

export const loggingIn = (inProgress: boolean): LoggingInAction => ({
    type: LOGGING_IN,
    payload: { inProgress },
});

export const loggingInFailure = (error: Error): LoggingInFailureAction => ({
    type: LOGGING_IN_FAILURE,
    payload: { error },
});

export const resetLoggingInFailure = (): ResetLoggingInFailureAction => ({
    type: RESET_LOGGING_IN_FAILURE,
});

export const setLoggedIn = (userInfo: UserInfo): SetLoggedInAction => ({
    type: SET_LOGGED_IN,
    payload: userInfo,
});

export const setLoggedOut = (): SetLoggedOutAction => ({
    type: SET_LOGGED_OUT,
});

export const serverLoggingOut = (isProgress: boolean): ServerLoggingOutAction => ({
    type: SERVER_LOGGING_OUT,
    payload: { isProgress },
});

export const serverLoggingOutFailure = (error: Error): ServerLoggingOutFailureAction => ({
    type: SERVER_LOGGING_OUT_FAILURE,
    payload: { error },
});

export const serverResetLoggingOutFailure = (): ServerResetLoggingOutFailureAction => ({
    type: SERVER_RESET_LOGGING_OUT_FAILURE,
});

export const setAuthorized = (authorized: boolean): SetAuthorizedAction => ({
    type: SET_AUTHORIZED,
    payload: { authorized },
});

export const updateUserInfo = (userInfo: UserInfo): UpdateUserInfoAction => ({
    type: UPDATE_USER_INFO,
    payload: userInfo,
});

// Thunk actions
export const checkLogged = () => {
    return (dispatch: Dispatch<AuthActionTypes>) => {
        dispatch(resetCheckLoggingFailure());
        dispatch(checkLogging(true));
        authAPI.fetchUserInfo()
            .then((userInfo: UserInfo) => {
                dispatch(setLoggedIn(userInfo));
            }).catch(e => {
            dispatch(setLoggedOut());
            dispatch(checkLoggingFailure(new Error("Failed to check if user is logged")));
        }).finally(() => dispatch(checkLogging(false)));
    }
}

export const getLogged = (credentials: Credentials) => {
    return (dispatch: Dispatch<AuthActionTypes>) => {
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
            }).then((userInfo: UserInfo) => {
            // Handle successful user profile fetch
            dispatch(setLoggedIn(userInfo));
        }).catch(error => {
            dispatch(loggingInFailure(error));
        }).finally(() => dispatch(loggingIn(false)));
    }
}

export const getLoggedOut = () => {
    return (dispatch: Dispatch<AuthActionTypes>) => {
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