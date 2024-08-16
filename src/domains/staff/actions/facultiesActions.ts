import {facultiesAPI} from "../_api/facultiesAPI";
import {setAllOrg} from "./organisationsActions";
import {organisationsAPI} from "../_api/organisationsAPI";
import {Dispatch} from "redux";
import {GenericAction} from "../../common/types/GenericAction";
import {Faculty} from "../types/Faculty";
import {Organisation} from "../types/Organisation";

// Action Types
export const LOADING_ALL_FAC = "LOADING_ALL_FAC" as const;
export const LOADING_ALL_FAC_FAILURE = "LOADING_ALL_FAC_FAILURE" as const;
export const CLEAR_LOADING_ALL_FAC_FAILURE = "CLEAR_LOADING_ALL_FAC_FAILURE" as const;
export const SET_ALL_FAC = "SET_ALL_FAC" as const;
export const UPDATING_FAC = "UPDATING_FAC" as const;
export const UPDATING_FAC_FAILURE = "UPDATING_FAC_FAILURE" as const;
export const CLEAR_UPDATING_FAC_FAILURE = "CLEAR_UPDATING_FAC_FAILURE" as const;
export const CLEAR_ALL_FAC_FAILURES = "CLEAR_ALL_FAC_FAILURES" as const;
export const ADD_FAC_IN_STORE = "ADD_FAC_IN_STORE" as const;
export const UPDATE_FAC_IN_STORE = "UPDATE_FAC_IN_STORE" as const;
export const UPDATE_FAC_NAME_IN_STORE = "UPDATE_FAC_NAME_IN_STORE" as const;
export const DELETE_FAC_FROM_STORE = "DELETE_FAC_FROM_STORE" as const;

// Specific Action types
export type LoadingAllFacAction = GenericAction<typeof LOADING_ALL_FAC, { isLoading: boolean }>;
export type LoadingAllFacFailureAction = GenericAction<typeof LOADING_ALL_FAC_FAILURE, { error: Error }>;
export type ClearLoadingAllFacFailureAction = GenericAction<typeof CLEAR_LOADING_ALL_FAC_FAILURE>;
export type SetAllFacAction = GenericAction<typeof SET_ALL_FAC, { allFac: Array<Faculty> }>;
export type UpdatingFacAction = GenericAction<typeof UPDATING_FAC, { isUpdating: boolean }>;
export type UpdatingFacFailureAction = GenericAction<typeof UPDATING_FAC_FAILURE, { error: Error }>;
export type ClearUpdatingFacFailureAction = GenericAction<typeof CLEAR_UPDATING_FAC_FAILURE>;
export type ClearAllFacFailuresAction = GenericAction<typeof CLEAR_ALL_FAC_FAILURES>;
export type AddFacInStoreAction = GenericAction<typeof ADD_FAC_IN_STORE, { fac: Faculty }>;
export type UpdateFacInStoreAction = GenericAction<typeof UPDATE_FAC_IN_STORE, { fac: Faculty }>;
export type UpdateFacNameInStoreAction = GenericAction<typeof UPDATE_FAC_NAME_IN_STORE, {
    facId: number;
    name: string
}>;
export type DeleteFacFromStoreAction = GenericAction<typeof DELETE_FAC_FROM_STORE, { facId: number }>;

// Union Type for All Actions
export type FacultiesActionTypes =
    | LoadingAllFacAction
    | LoadingAllFacFailureAction
    | ClearLoadingAllFacFailureAction
    | SetAllFacAction
    | UpdatingFacAction
    | UpdatingFacFailureAction
    | ClearUpdatingFacFailureAction
    | ClearAllFacFailuresAction
    | AddFacInStoreAction
    | UpdateFacInStoreAction
    | UpdateFacNameInStoreAction
    | DeleteFacFromStoreAction;

const loading = (isLoading: boolean): LoadingAllFacAction => ({
    type: LOADING_ALL_FAC,
    payload: {isLoading},
});

const loadingFailure = (error: Error): LoadingAllFacFailureAction => ({
    type: LOADING_ALL_FAC_FAILURE,
    payload: {error},
});

const clearLoadingFailure = (): ClearLoadingAllFacFailureAction => ({
    type: CLEAR_LOADING_ALL_FAC_FAILURE,
});

export const setAllFac = (allFac: Faculty[]): SetAllFacAction => ({
    type: SET_ALL_FAC,
    payload: {allFac},
});

const updating = (isUpdating: boolean): UpdatingFacAction => ({
    type: UPDATING_FAC,
    payload: {isUpdating},
});

const updatingFailure = (error: Error): UpdatingFacFailureAction => ({
    type: UPDATING_FAC_FAILURE,
    payload: {error},
});

const clearUpdatingFailure = (): ClearUpdatingFacFailureAction => ({
    type: CLEAR_UPDATING_FAC_FAILURE,
});

export const clearAllFacFailures = (): ClearAllFacFailuresAction => ({
    type: CLEAR_ALL_FAC_FAILURES,
});

export const addFacInStore = (fac: Faculty): AddFacInStoreAction => ({
    type: ADD_FAC_IN_STORE,
    payload: {fac},
});

export const updateFacInStore = (fac: Faculty): UpdateFacInStoreAction => ({
    type: UPDATE_FAC_IN_STORE,
    payload: {fac},
});

const updateFacNameInStore = (facId: number, name: string): UpdateFacNameInStoreAction => ({
    type: UPDATE_FAC_NAME_IN_STORE,
    payload: {facId, name},
});

const deleteFacFromStore = (facId: number): DeleteFacFromStoreAction => ({
    type: DELETE_FAC_FROM_STORE,
    payload: {facId},
});


export const updateFacName = (facId: number, name: string) => {
    return (dispatch: Dispatch<FacultiesActionTypes>): void => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        facultiesAPI.updateFacName(facId, name)
            .then((status: number): void => {
                if (status >= 200 && status < 300) {
                    dispatch(updateFacNameInStore(facId, name));
                } else {
                    throw new Error("Failed to execute API to update faculty name!");
                }
            })
            .catch(e => {
                console.warn("Error updating faculty name!", e);
                dispatch(updatingFailure(new Error("Failed to update fac.'s name")));
            })
            .finally(() => dispatch(updating(false)));
    };
};

export const deleteFac = (facId: number) => {
    return (dispatch: Dispatch<FacultiesActionTypes>): void => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        facultiesAPI.deleteFac(facId)
            .then((status: number): void => {
                if (status >= 200 && status < 300) {
                    dispatch(deleteFacFromStore(facId));
                } else {
                    throw new Error("Failed to execute API to delete faculty!");
                }
            })
            .catch((e: Error) => {
                console.warn("Error deleting faculty name!", e);
                dispatch(updatingFailure(new Error("Failed to delete fac.")));
            })
            .finally(() => dispatch(updating(false)));
    };
};

export const getAllFacultiesByOrganisation = () => {
    return (dispatch: Dispatch<FacultiesActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        facultiesAPI.fetchAllFacultiesByOrganisationForTable()
            .then((faculties: Array<Faculty>): void => {
                dispatch(setAllFac(faculties));
            })
            .catch((e: Error) => {
                console.warn("Error fetching all org's faculties'!", e);
                dispatch(loadingFailure(new Error("Failed to fetch all org's faculties")));
            })
            .finally(() => dispatch(loading(false)));
    };
};

export const getAllFacultiesBunchByRatos = () => {
    return (dispatch: Dispatch<FacultiesActionTypes> | any): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        Promise.all([
            facultiesAPI.fetchAllFacultiesByRatosForTable(),
            organisationsAPI.fetchAllOrganisationsForDropDown()
        ])
            .then((bunch: (Faculty[] | Organisation[])[]): void => {
                dispatch(setAllOrg(bunch[1] as Organisation[]));
                dispatch(setAllFac(bunch[0] as Faculty[]));
            })
            .catch((e: Error) => {
                console.warn("Error fetching all Ratos' faculties'!", e);
                dispatch(loadingFailure(new Error("Failed to fetch all Ratos' faculties")));
            })
            .finally(() => dispatch(loading(false)));
    };
};