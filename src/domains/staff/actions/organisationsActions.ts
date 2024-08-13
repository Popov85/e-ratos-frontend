import {Dispatch} from "redux";
import {organisationsAPI} from "../_api/organisationsAPI";
import {GenericAction} from "../../common/types/GenericAction";
import {Organisation} from "../types/Organisation";

// Action type constants
export const LOADING_ALL_ORG = "LOADING_ALL_ORG";
export const LOADING_ALL_ORG_FAILURE = "LOADING_ALL_ORG_FAILURE";
export const CLEAR_LOADING_ALL_ORG_FAILURE = "CLEAR_LOADING_ALL_ORG_FAILURE";
export const SET_ALL_ORG = "SET_ALL_ORG";
export const SET_ORG_SELECTED = "SET_ORG_SELECTED";
export const CLEAR_ORG_SELECTED = "CLEAR_ORG_SELECTED";
export const ADD_ORG_IN_STORE = "ADD_ORG_IN_STORE";
export const UPDATING_ORG = "UPDATING_ORG";
export const UPDATING_ORG_FAILURE = "UPDATING_ORG_FAILURE";
export const CLEAR_UPDATING_ORG_FAILURE = "CLEAR_UPDATING_ORG_FAILURE";
export const CLEAR_ALL_ORG_FAILURES = "CLEAR_ALL_ORG_FAILURES";
export const UPDATE_ORG_IN_STORE = "UPDATE_ORG_IN_STORE";
export const UPDATE_ORG_NAME_IN_STORE = "UPDATE_ORG_NAME_IN_STORE";
export const DELETE_ORG_FROM_STORE = "DELETE_ORG_FROM_STORE";

// Action types using GenericAction
export type LoadingAction = GenericAction<typeof LOADING_ALL_ORG, { isLoading: boolean }>;
export type LoadingFailureAction = GenericAction<typeof LOADING_ALL_ORG_FAILURE, { error: Error }>;
export type ClearLoadingFailureAction = GenericAction<typeof CLEAR_LOADING_ALL_ORG_FAILURE>;
export type SetAllOrgAction = GenericAction<typeof SET_ALL_ORG, Array<Organisation>>;
export type SetOrgSelectedAction = GenericAction<typeof SET_ORG_SELECTED, { orgId: number }>;
export type ClearOrgSelectedAction = GenericAction<typeof CLEAR_ORG_SELECTED>;
export type UpdatingAction = GenericAction<typeof UPDATING_ORG, { isUpdating: boolean }>;
export type UpdatingFailureAction = GenericAction<typeof UPDATING_ORG_FAILURE, { error: Error }>;
export type ClearUpdatingFailureAction = GenericAction<typeof CLEAR_UPDATING_ORG_FAILURE>;
export type ClearAllOrgFailuresAction = GenericAction<typeof CLEAR_ALL_ORG_FAILURES>;
export type AddOrgInStoreAction = GenericAction<typeof ADD_ORG_IN_STORE, Organisation>;
export type UpdateOrgInStoreAction = GenericAction<typeof UPDATE_ORG_IN_STORE, Organisation>;
export type UpdateOrgNameInStoreAction = GenericAction<typeof UPDATE_ORG_NAME_IN_STORE, {
    orgId: number,
    name: string
}>;
export type DeleteOrgFromStoreAction = GenericAction<typeof DELETE_ORG_FROM_STORE, { orgId: number }>;

// Union type for all actions
export type OrganisationsActionTypes =
    | LoadingAction
    | LoadingFailureAction
    | ClearLoadingFailureAction
    | SetAllOrgAction
    | SetOrgSelectedAction
    | ClearOrgSelectedAction
    | UpdatingAction
    | UpdatingFailureAction
    | ClearUpdatingFailureAction
    | ClearAllOrgFailuresAction
    | AddOrgInStoreAction
    | UpdateOrgInStoreAction
    | UpdateOrgNameInStoreAction
    | DeleteOrgFromStoreAction;

// Action creators using the generic type
export const loading = (isLoading: boolean): LoadingAction => ({
    type: LOADING_ALL_ORG,
    payload: {isLoading},
});

export const loadingFailure = (error: Error): LoadingFailureAction => ({
    type: LOADING_ALL_ORG_FAILURE,
    payload: {error},
});

export const clearLoadingFailure = (): ClearLoadingFailureAction => ({
    type: CLEAR_LOADING_ALL_ORG_FAILURE,
});

export const setAllOrg = (org: Array<Organisation>): SetAllOrgAction => ({
    type: SET_ALL_ORG,
    payload: org,
});

export const setOrgIdSelected = (orgId: number): SetOrgSelectedAction => ({
    type: SET_ORG_SELECTED,
    payload: {orgId},
});

export const clearOrgIdSelected = (): ClearOrgSelectedAction => ({
    type: CLEAR_ORG_SELECTED,
});

export const updating = (isUpdating: boolean): UpdatingAction => ({
    type: UPDATING_ORG,
    payload: {isUpdating},
});

export const updatingFailure = (error: Error): UpdatingFailureAction => ({
    type: UPDATING_ORG_FAILURE,
    payload: {error},
});

export const clearUpdatingFailure = (): ClearUpdatingFailureAction => ({
    type: CLEAR_UPDATING_ORG_FAILURE,
});

export const clearAllOrgFailures = (): ClearAllOrgFailuresAction => ({
    type: CLEAR_ALL_ORG_FAILURES,
});

export const addOrgInStore = (org: Organisation): AddOrgInStoreAction => ({
    type: ADD_ORG_IN_STORE,
    payload: org,
});

export const updateOrgInStore = (org: Organisation): UpdateOrgInStoreAction => ({
    type: UPDATE_ORG_IN_STORE,
    payload: org,
});

export const updateOrgNameInStore = (orgId: number, name: string): UpdateOrgNameInStoreAction => ({
    type: UPDATE_ORG_NAME_IN_STORE,
    payload: {orgId, name},
});

export const deleteOrgFromStore = (orgId: number): DeleteOrgFromStoreAction => ({
    type: DELETE_ORG_FROM_STORE,
    payload: {orgId},
});

// Thunk actions
export const updateOrgName = (orgId: number, name: string) => {
    return (dispatch: Dispatch<OrganisationsActionTypes>): void => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        organisationsAPI.updateOrgName(orgId, name)
            .then((status: number): void => {
                if (status >= 200 && status < 300) {
                    dispatch(updateOrgNameInStore(orgId, name));
                } else {
                    throw new Error("Failed to execute API to update an organisation!");
                }
            })
            .catch(e => {
                dispatch(updatingFailure(new Error("Failed to update org's name")));
            })
            .finally(() => dispatch(updating(false)));
    }
};

export const deleteOrg = (orgId: number) => {
    return (dispatch: Dispatch<OrganisationsActionTypes>): void => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        organisationsAPI.deleteOrg(orgId)
            .then((status: number): void => {
                if (status >= 200 && status < 300) {
                    dispatch(deleteOrgFromStore(orgId));
                } else {
                    throw new Error("Failed to execute API to delete an organisation!");
                }
            })
            .catch(e => {
                dispatch(updatingFailure(new Error("Failed to delete org")));
            })
            .finally(() => dispatch(updating(false)));
    }
};

export const getAllOrganisations = () => {
    return (dispatch: Dispatch<OrganisationsActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        organisationsAPI.fetchAllOrganisationsForDropDown()
            .then((organisations: Array<Organisation>): void => {
                dispatch(setAllOrg(organisations));
            })
            .catch(e => {
                console.log("Error fetching all organisations!", e);
                dispatch(loadingFailure(new Error("Failed to fetch all organisations")));
            })
            .finally(() => dispatch(loading(false)));
    }
};
