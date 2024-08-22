import {organisationsAPI} from "../_api/organisationsAPI";
import {addOrgInStore, updateOrgInStore} from "./organisationsActions";
import {GenericAction} from "../../common/types/GenericAction";
import {Organisation} from "../types/Organisation";
import {Dispatch} from "redux";

export const SAVING_ORG = "SAVING_ORG" as const;
export const SAVING_ORG_FAILURE = "SAVING_ORG_FAILURE" as const;
export const SAVING_ORG_SUCCESS = "SAVING_ORG_SUCCESS" as const;
export const CLEAR_SAVING_ORG = "CLEAR_SAVING_ORG" as const;

// Define types for your actions
export type SavingOrgAction = GenericAction<typeof SAVING_ORG, { isLoading: boolean }>;
export type SavingOrgFailureAction = GenericAction<typeof SAVING_ORG_FAILURE, { error: Error }>;
export type SavingOrgSuccessAction = GenericAction<typeof SAVING_ORG_SUCCESS, { message: string }>;
export type ClearSavingOrgAction = GenericAction<typeof CLEAR_SAVING_ORG>;

// Combine all actions into a single type
export type OrgEditActions =
    | SavingOrgAction
    | SavingOrgFailureAction
    | SavingOrgSuccessAction
    | ClearSavingOrgAction;

// Action Creators
const loading = (isLoading: boolean): SavingOrgAction => ({
    type: SAVING_ORG,
    payload: { isLoading }
});

const loadingFailure = (error: Error): SavingOrgFailureAction => ({
    type: SAVING_ORG_FAILURE,
    payload: { error }
});

const loadingSuccess = (message: string): SavingOrgSuccessAction => ({
    type: SAVING_ORG_SUCCESS,
    payload: { message }
});

export const clearOrgState = (): ClearSavingOrgAction => ({
    type: CLEAR_SAVING_ORG
});


// Thunk for saving an organization
export const saveOrg = (org: Organisation) => {
    return (dispatch: Dispatch<OrgEditActions> | any): void => {
        dispatch(clearOrgState());
        dispatch(loading(true));
        organisationsAPI.saveOrg(org)
            .then((organisation: Organisation): void => {
                dispatch(addOrgInStore(organisation));
                dispatch(loadingSuccess("Successfully added an org!"));
            })
            .catch((e: Error) => {
                console.warn("Error saving organisation!", e);
                dispatch(loadingFailure(new Error("Failed to save an org!")));
            })
            .finally(() => dispatch(loading(false)));
    };
};

// Thunk for updating an organization
export const updateOrg = (org: Organisation) => {
    return (dispatch: Dispatch<OrgEditActions> | any): void => {
        dispatch(clearOrgState());
        dispatch(loading(true));
        organisationsAPI.updateOrg(org)
            .then((result: Organisation): void => {
                dispatch(updateOrgInStore(result));
                dispatch(loadingSuccess("Successfully updated the org!"));
            })
            .catch((e: Error) => {
                console.warn("Error updating organisation!", e);
                dispatch(loadingFailure(new Error("Failed to update the org!")));
            })
            .finally(() => dispatch(loading(false)));
    };
};