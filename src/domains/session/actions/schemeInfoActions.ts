import sessionAPI from "../_api/sessionAPI";
import {GenericAction} from "../../common/types/GenericAction";
import {Dispatch} from "redux";
import {SchemeInfo} from "../types/SchemeInfo";

// Action Types
export const LOADING_SCHEME_INFO = "LOADING_SCHEME_INFO" as const;
export const RESET_SCHEME_INFO_FAILURE = "RESET_SCHEME_INFO_FAILURE" as const;
export const LOADING_SCHEME_INFO_FAILURE = "LOADING_SCHEME_INFO_FAILURE" as const;
export const SET_SCHEME_INFO = "SET_SCHEME_INFO" as const;

// Type Definitions
export type LoadingSchemeInfoAction = GenericAction<typeof LOADING_SCHEME_INFO, boolean>;
export type ResetSchemeInfoFailureAction = GenericAction<typeof RESET_SCHEME_INFO_FAILURE>;
export type LoadingSchemeInfoFailureAction = GenericAction<typeof LOADING_SCHEME_INFO_FAILURE, Error>;
export type SetSchemeInfoAction = GenericAction<typeof SET_SCHEME_INFO, SchemeInfo>;

// Union of All Actions
export type SchemeInfoActions =
    | LoadingSchemeInfoAction
    | ResetSchemeInfoFailureAction
    | LoadingSchemeInfoFailureAction
    | SetSchemeInfoAction;

// Action Creators
export const loading = (isLoading: boolean): LoadingSchemeInfoAction => ({
    type: LOADING_SCHEME_INFO,
    payload: isLoading,
});

export const resetFailure = (): ResetSchemeInfoFailureAction => ({
    type: RESET_SCHEME_INFO_FAILURE,
});

export const loadingFailure = (error: Error): LoadingSchemeInfoFailureAction => ({
    type: LOADING_SCHEME_INFO_FAILURE,
    payload: error,
});

export const setSchemeInfo = (schemeInfo: SchemeInfo): SetSchemeInfoAction => ({
    type: SET_SCHEME_INFO,
    payload: schemeInfo,
});

// Async Action (Thunk)
export const loadSchemeInfo = (schemeId: number) => {
    return (dispatch: Dispatch<SchemeInfoActions>): void => {
        dispatch(resetFailure());
        dispatch(loading(true));
        sessionAPI.getSchemeInfo(schemeId).then((result: SchemeInfo) => {
            dispatch(setSchemeInfo(result));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to load schemeInfo")));
        }).finally(() => dispatch(loading(false)));
    }
};
