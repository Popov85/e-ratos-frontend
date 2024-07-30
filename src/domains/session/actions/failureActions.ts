// Action Types
import {GenericAction} from "../../common/types/GenericAction";
import {ServerError} from "../../common/types/ServerError";

export const RESET_SESSION_FAILURE = "RESET_SESSION_FAILURE" as const;
export const CLOSE_SESSION_FAILURE = "CLOSE_SESSION_FAILURE" as const;
export const SET_SESSION_FAILURE = "SET_SESSION_FAILURE" as const;
export const SET_SESSION_FAILURE_WITH_BODY = "SET_SESSION_FAILURE_WITH_BODY" as const;

// Define specific action types using GenericAction
export type ResetSessionFailureAction = GenericAction<typeof RESET_SESSION_FAILURE>;
export type CloseSessionFailureAction = GenericAction<typeof CLOSE_SESSION_FAILURE>;
export type SetSessionFailureAction = GenericAction<typeof SET_SESSION_FAILURE, {
    error: string;
    message: string;
    location: string;
}>;
export type SetSessionFailureWithBodyAction = GenericAction<typeof SET_SESSION_FAILURE_WITH_BODY, {
    body: ServerError;
    message: string;
    location: string;
}>;

// Union type for all actions
export type SessionFailureActions =
    | ResetSessionFailureAction
    | CloseSessionFailureAction
    | SetSessionFailureAction
    | SetSessionFailureWithBodyAction;


// Action creators
export const resetFailure = (): ResetSessionFailureAction => ({type: RESET_SESSION_FAILURE});

export const closeFailure = (): CloseSessionFailureAction => ({type: CLOSE_SESSION_FAILURE});

export const setFailure = (error: string, message: string, location: string): SetSessionFailureAction => ({
    type: SET_SESSION_FAILURE,
    payload: {error, message, location}
});

export const setFailureWithBody = (body: ServerError, message: string, location: string): SetSessionFailureWithBodyAction => ({
    type: SET_SESSION_FAILURE_WITH_BODY,
    payload: {body, message, location}
});