import {facultiesAPI, FacultyInput} from "../_api/facultiesAPI";
import {GenericAction} from "../../common/types/GenericAction";
import {Faculty} from "../types/Faculty";
import {Dispatch} from "redux";

export const SAVING_FAC = "SAVING_FAC" as const;
export const SAVING_FAC_FAILURE = "SAVING_FAC_FAILURE" as const;
export const SAVING_FAC_SUCCESS = "SAVING_FAC_SUCCESS" as const;
export const CLEAR_SAVING_FAC = "CLEAR_SAVING_FAC" as const;
export const ADD_FAC_IN_STORE = "ADD_FAC_IN_STORE" as const;
export const UPDATE_FAC_IN_STORE = "UPDATE_FAC_IN_STORE" as const;

// Define types for your actions
export type SavingFacAction = GenericAction<typeof SAVING_FAC, { isLoading: boolean }>;
export type SavingFacFailureAction = GenericAction<typeof SAVING_FAC_FAILURE, { error: Error }>;
export type SavingFacSuccessAction = GenericAction<typeof SAVING_FAC_SUCCESS, { message: string }>;
export type ClearSavingFacAction = GenericAction<typeof CLEAR_SAVING_FAC>;
export type AddFacInStoreAction = GenericAction<typeof ADD_FAC_IN_STORE, { fac: Faculty }>;
export type UpdateFacInStoreAction = GenericAction<typeof UPDATE_FAC_IN_STORE, { fac: Faculty }>;

// Combine all actions into a single type
export type FacEditActions =
    | SavingFacAction
    | SavingFacFailureAction
    | SavingFacSuccessAction
    | ClearSavingFacAction;

// Action Creators
export const loading = (isLoading: boolean): SavingFacAction => ({
    type: SAVING_FAC,
    payload: { isLoading }
});

export const loadingFailure = (error: Error): SavingFacFailureAction => ({
    type: SAVING_FAC_FAILURE,
    payload: { error }
});

export const loadingSuccess = (message: string): SavingFacSuccessAction => ({
    type: SAVING_FAC_SUCCESS,
    payload: { message }
});

export const clearFacState = (): ClearSavingFacAction => ({
    type: CLEAR_SAVING_FAC
});

export const addFacInStore = (fac: Faculty): AddFacInStoreAction => ({
    type: ADD_FAC_IN_STORE,
    payload: {fac},
});

export const updateFacInStore = (fac: Faculty): UpdateFacInStoreAction => ({
    type: UPDATE_FAC_IN_STORE,
    payload: {fac},
});

// Thunk for saving a faculty
export const saveFac = (fac: FacultyInput) => {
    return (dispatch: Dispatch<FacEditActions> | any): void => {
        dispatch(clearFacState());
        dispatch(loading(true));
        facultiesAPI.saveFac(fac)
            .then((faculty: Faculty): void => {
                dispatch(addFacInStore(faculty));
                dispatch(loadingSuccess("Successfully added a faculty!"));
            })
            .catch((e: Error) => {
                console.warn("Error saving faculty!", e);
                dispatch(loadingFailure(new Error("Failed to save a fac!")));
            })
            .finally(() => dispatch(loading(false)));
    };
};

// Thunk for updating a faculty
export const updateFac = (fac: FacultyInput) => {
    return (dispatch: Dispatch<FacEditActions> | any): void => {
        dispatch(clearFacState());
        dispatch(loading(true));
        facultiesAPI.updateFac(fac)
            .then((faculty: Faculty): void => {
                dispatch(updateFacInStore(faculty));
                dispatch(loadingSuccess("Successfully updated the faculty!"));
            })
            .catch((e: Error) => {
                console.warn("Error updating faculty!", e);
                dispatch(loadingFailure(new Error("Failed to update the fac!")));
            })
            .finally(() => dispatch(loading(false)));
    };
};