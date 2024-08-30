import {lmsAPI, LMSDropDown} from "../_api/lmsAPI";
import {GenericAction} from "../../common/types/GenericAction";
import {LMS} from "../types/LMS";
import {Dispatch} from "redux";

export const LOADING_ALL_LMS = "LOADING_ALL_LMS" as const;
export const LOADING_ALL_LMS_FAILURE = "LOADING_ALL_LMS_FAILURE" as const;
export const CLEAR_LOADING_ALL_LMS_FAILURE = "CLEAR_LOADING_ALL_LMS_FAILURE" as const;
export const SET_ALL_LMS = "SET_ALL_LMS" as const;
export const SET_ALL_LMS_MIN = "SET_ALL_LMS_MIN" as const;
export const UPDATING_LMS = "UPDATING_LMS" as const;
export const UPDATING_LMS_FAILURE = "UPDATING_LMS_FAILURE" as const;
export const CLEAR_UPDATING_LMS_FAILURE = "CLEAR_UPDATING_LMS_FAILURE" as const;
export const CLEAR_ALL_LMS_FAILURES = "CLEAR_ALL_LMS_FAILURES" as const;
export const ADD_LMS_IN_STORE = "ADD_LMS_IN_STORE" as const;
export const UPDATE_LMS_IN_STORE = "UPDATE_LMS_IN_STORE" as const;
export const UPDATE_LMS_NAME_IN_STORE = "UPDATE_LMS_NAME_IN_STORE" as const;
export const DELETE_LMS_FROM_STORE = "DELETE_LMS_FROM_STORE" as const;

// Action types using GenericAction
export type LoadingAllLMSAction = GenericAction<typeof LOADING_ALL_LMS, { isLoading: boolean }>;
export type LoadingAllLMSFailureAction = GenericAction<typeof LOADING_ALL_LMS_FAILURE, { error: Error }>;
export type ClearLoadingAllLMSFailureAction = GenericAction<typeof CLEAR_LOADING_ALL_LMS_FAILURE>;
export type SetAllLMSAction = GenericAction<typeof SET_ALL_LMS, Array<LMS>>;
export type SetAllLMSMinAction = GenericAction<typeof SET_ALL_LMS_MIN, Array<LMS>>;
export type UpdatingLMSAction = GenericAction<typeof UPDATING_LMS, { isUpdating: boolean }>;
export type UpdatingLMSFailureAction = GenericAction<typeof UPDATING_LMS_FAILURE, { errorUpdate: Error }>;
export type ClearUpdatingLMSFailureAction = GenericAction<typeof CLEAR_UPDATING_LMS_FAILURE>;
export type ClearAllLMSFailuresAction = GenericAction<typeof CLEAR_ALL_LMS_FAILURES>;
export type AddLMSInStoreAction = GenericAction<typeof ADD_LMS_IN_STORE, LMS>;
export type UpdateLMSInStoreAction = GenericAction<typeof UPDATE_LMS_IN_STORE, LMS>;
export type UpdateLMSNameInStoreAction = GenericAction<typeof UPDATE_LMS_NAME_IN_STORE, {
    lmsId: number,
    name: string
}>;
export type DeleteLMSFromStoreAction = GenericAction<typeof DELETE_LMS_FROM_STORE, { lmsId: number }>;

// Union type for all actions
export type LMSActionTypes =
    | LoadingAllLMSAction
    | LoadingAllLMSFailureAction
    | ClearLoadingAllLMSFailureAction
    | SetAllLMSAction
    | SetAllLMSMinAction
    | UpdatingLMSAction
    | UpdatingLMSFailureAction
    | ClearUpdatingLMSFailureAction
    | ClearAllLMSFailuresAction
    | AddLMSInStoreAction
    | UpdateLMSInStoreAction
    | UpdateLMSNameInStoreAction
    | DeleteLMSFromStoreAction;

// Action creators
const loading = (isLoading: boolean): LoadingAllLMSAction => ({
    type: LOADING_ALL_LMS,
    payload: {isLoading}
});

const loadingFailure = (error: Error): LoadingAllLMSFailureAction => ({
    type: LOADING_ALL_LMS_FAILURE,
    payload: {error}
});

const clearLoadingFailure = (): ClearLoadingAllLMSFailureAction => ({
    type: CLEAR_LOADING_ALL_LMS_FAILURE
});

const setAllLMSes = (lmses: Array<LMS>): SetAllLMSAction => ({
    type: SET_ALL_LMS,
    payload: lmses
});

export const setAllLMSesMin = (lmses: Array<LMS>): SetAllLMSMinAction => ({
    type: SET_ALL_LMS_MIN,
    payload: lmses
});

const updating = (isUpdating: boolean): UpdatingLMSAction => ({
    type: UPDATING_LMS,
    payload: {isUpdating}
});

const updatingFailure = (errorUpdate: Error): UpdatingLMSFailureAction => ({
    type: UPDATING_LMS_FAILURE,
    payload: {errorUpdate}
});

const clearUpdatingFailure = (): ClearUpdatingLMSFailureAction => ({
    type: CLEAR_UPDATING_LMS_FAILURE
});

export const clearAllLMSFailures = (): ClearAllLMSFailuresAction => ({
    type: CLEAR_ALL_LMS_FAILURES
});

export const addLMSInStore = (lms: LMS): AddLMSInStoreAction => ({
    type: ADD_LMS_IN_STORE,
    payload: lms
});

export const updateLMSInStore = (lms: LMS): UpdateLMSInStoreAction => ({
    type: UPDATE_LMS_IN_STORE,
    payload: lms
});

const updateLMSNameInStore = (lmsId: number, name: string): UpdateLMSNameInStoreAction => ({
    type: UPDATE_LMS_NAME_IN_STORE,
    payload: {lmsId, name}
});

export const deleteLMSFromStore = (lmsId: number): DeleteLMSFromStoreAction => ({
    type: DELETE_LMS_FROM_STORE,
    payload: {lmsId}
});


export const updateLMSName = (lmsId: number, name: string) => {
    return (dispatch: Dispatch<LMSActionTypes>): void => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        lmsAPI.updateLMSName(lmsId, name).then((status: number): void => {
            if (status >= 200 && status < 300) {
                dispatch(updateLMSNameInStore(lmsId, name));
            } else {
                throw new Error("Failed to execute API to update an LMS name!");
            }
        }).catch((e: Error): void => {
            console.warn("Error updating LMS name!", e);
            dispatch(updatingFailure(new Error("Failed to update LMS's name")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteLMS = (lmsId: number) => {
    return (dispatch: Dispatch<LMSActionTypes>): void => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        lmsAPI.deleteLMS(lmsId).then((status: number): void => {
            if (status >= 200 && status < 300) {
                dispatch(deleteLMSFromStore(lmsId));
            } else {
                throw new Error("Failed to execute API to delete an LMS!");
            }
        }).catch((e: Error): void => {
            console.warn("Error deleting LMS!", e);
            dispatch(updatingFailure(new Error("Failed to delete LMS!")));
        }).finally(() => dispatch(updating(false)));
    }
}

//--------------------------------------------------Drop down-----------------------------------------------------------

export const getLMSesByOrganisationForDropDown = () => {
    return (dispatch: Dispatch<LMSActionTypes>): void => {
        lmsAPI.fetchAllLMSByOrganisationForDropDown().then((lmses: Array<LMSDropDown>): void => {
            dispatch(setAllLMSesMin(lmses));
        }).catch((e: Error): void => {
            console.warn("Error fetching LMSes!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all org. LMS-es for drop-down")));
        });
    }
}

//-----------------------------------------------------Table------------------------------------------------------------

export const getAllLMSByOrganisation = () => {
    return (dispatch: Dispatch<LMSActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        lmsAPI.fetchAllLMSByOrganisationForTable().then((lmses: Array<LMS>): void => {
            dispatch(setAllLMSes(lmses));
        }).catch((e: Error): void => {
            console.warn("Error fetching all org. LMS-es!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all org. LMS-es")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllLMSByOrganisationId = (orgId: number) => {
    return (dispatch: Dispatch<LMSActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        lmsAPI.fetchAllLMSByOrganisationIdForTable(orgId).then((lmses: Array<LMS>): void => {
            dispatch(setAllLMSes(lmses));
        }).catch((e: Error): void => {
            console.warn("Error fetching all org. LMS-es!", e);
            dispatch(loadingFailure(new Error(`Failed to fetch all LMS-es, orgId = ${orgId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}