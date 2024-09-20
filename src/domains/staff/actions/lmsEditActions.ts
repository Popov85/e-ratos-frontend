import {lmsAPI} from "../_api/lmsAPI";
import {addLMSInStore, updateLMSInStore} from "./lmsActions";
import {GenericAction} from "../../common/types/GenericAction";
import {LMS} from "../types/LMS";
import {Dispatch} from "redux";

export const SAVING_LMS = "SAVING_LMS" as const;
export const SAVING_LMS_FAILURE = "SAVING_LMS_FAILURE" as const;
export const SAVING_LMS_SUCCESS = "SAVING_LMS_SUCCESS" as const;
export const CLEAR_SAVING_LMS = "CLEAR_SAVING_LMS" as const;

// Action types using GenericAction
export type SavingLMSAction = GenericAction<typeof SAVING_LMS, { isLoading: boolean }>;
export type SavingLMSFailureAction = GenericAction<typeof SAVING_LMS_FAILURE, { error: Error }>;
export type SavingLMSSuccessAction = GenericAction<typeof SAVING_LMS_SUCCESS, { message: string }>;
export type ClearSavingLMSAction = GenericAction<typeof CLEAR_SAVING_LMS>;

// Union type for all actions
export type LMSEditActionTypes =
    | SavingLMSAction
    | SavingLMSFailureAction
    | SavingLMSSuccessAction
    | ClearSavingLMSAction;


const loading = (isLoading: boolean): SavingLMSAction => ({
    type: SAVING_LMS,
    payload: {isLoading}
});

export const loadingFailure = (error: Error): SavingLMSFailureAction => ({
    type: SAVING_LMS_FAILURE,
    payload: {error}
});

export const loadingSuccess = (message: string): SavingLMSSuccessAction => ({
    type: SAVING_LMS_SUCCESS,
    payload: {message}
});

export const clearLMSState = (): ClearSavingLMSAction => ({
    type: CLEAR_SAVING_LMS
});

export const saveLMS = (lms: LMS) => {
    return (dispatch: Dispatch<LMSEditActionTypes> | any): void => {
        dispatch(clearLMSState());
        dispatch(loading(true));
        lmsAPI.saveLMS(lms).then((lms: LMS): void => {
            dispatch(addLMSInStore(lms));
            dispatch(loadingSuccess("Successfully added an LMS!"));
        }).catch((e: Error): void => {
            console.warn("Error saving LMS!", e);
            dispatch(loadingFailure(new Error("Failed to save an LMS!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateLMS = (lms: LMS) => {
    return (dispatch: Dispatch<LMSEditActionTypes> | any): void => {
        dispatch(clearLMSState());
        dispatch(loading(true));
        lmsAPI.updateLMS(lms).then((lms: LMS): void => {
            dispatch(updateLMSInStore(lms));
            dispatch(loadingSuccess("Successfully updated the LMS!"));
        }).catch( (e: Error): void=> {
            console.warn("Error updating LMS!", e);
            dispatch(loadingFailure(new Error("Failed to update the LMS!")));
        }).finally(() => dispatch(loading(false)));
    }
}

