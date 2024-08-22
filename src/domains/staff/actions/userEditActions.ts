import {usersAPI} from "../_api/usersAPI";
import {addStaffInStore, updateStaffInStore} from "./usersActions";
import {GenericAction} from "../../common/types/GenericAction";
import {Staff} from "../types/Staff";
import {Dispatch} from "redux";

export const SAVING_STAFF = "SAVING_STAFF" as const;
export const SAVING_STAFF_FAILURE = "SAVING_STAFF_FAILURE" as const;
export const SAVING_STAFF_SUCCESS = "SAVING_STAFF_SUCCESS" as const;
export const CLEAR_SAVING_STAFF = "CLEAR_SAVING_STAFF" as const;

// Define types for your actions
export type SavingStaffAction = GenericAction<typeof SAVING_STAFF, { isLoading: boolean }>;
export type SavingStaffFailureAction = GenericAction<typeof SAVING_STAFF_FAILURE, { error: Error }>;
export type SavingStaffSuccessAction = GenericAction<typeof SAVING_STAFF_SUCCESS, { message: string }>;
export type ClearSavingStaffAction = GenericAction<typeof CLEAR_SAVING_STAFF>;

// Combine all actions into a single type
export type StaffEditActions =
    | SavingStaffAction
    | SavingStaffFailureAction
    | SavingStaffSuccessAction
    | ClearSavingStaffAction;

// Action Creators
const loading = (isLoading: boolean): SavingStaffAction => ({
    type: SAVING_STAFF,
    payload: {isLoading}
});

export const loadingFailure = (error: Error): SavingStaffFailureAction => ({
    type: SAVING_STAFF_FAILURE,
    payload: {error}
});

const loadingSuccess = (message: string): SavingStaffSuccessAction => ({
    type: SAVING_STAFF_SUCCESS,
    payload: {message}
});

export const resetStaffState = (): ClearSavingStaffAction => ({
    type: CLEAR_SAVING_STAFF
});

export const saveStaff = (staff: Staff) => {
    return (dispatch: Dispatch<StaffEditActions> | any): void => {
        dispatch(resetStaffState());
        dispatch(loading(true));
        usersAPI.saveStaff(staff).then((staff: Staff): void => {
            dispatch(addStaffInStore(staff));
            dispatch(loadingSuccess("Successfully added!"));
        }).catch((e: Error): void => {
            console.warn("Error saving staff!", e);
            dispatch(loadingFailure(new Error("Failed to save a teaching staff")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateStaff = (staff: Staff) => {
    return (dispatch: Dispatch<StaffEditActions> | any): void => {
        dispatch(resetStaffState());
        dispatch(loading(true));
        usersAPI.updateStaff(staff).then((staff: Staff): void => {
            dispatch(updateStaffInStore(staff));
            dispatch(loadingSuccess("Successfully updated!"));
        }).catch((e: Error): void => {
            console.warn("Error updating staff!", e);
            dispatch(loadingFailure(new Error("Failed to update a teaching staff")));
        }).finally(() => dispatch(loading(false)));
    }
}