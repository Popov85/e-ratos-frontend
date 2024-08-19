import {addDepInStore, updateDepInStore} from "./departmentsActions";
import {DepartmentInput, departmentsAPI} from "../_api/departmentsAPI";
import {GenericAction} from "../../common/types/GenericAction";
import {Dispatch} from "redux";
import {Department} from "../types/Department";

export const SAVING_DEP = "SAVING_DEP" as const;
export const SAVING_DEP_FAILURE = "SAVING_DEP_FAILURE" as const;
export const SAVING_DEP_SUCCESS = "SAVING_DEP_SUCCESS" as const;
export const CLEAR_SAVING_DEP = "CLEAR_SAVING_DEP" as const;

export type SavingDepAction = GenericAction<typeof SAVING_DEP, { isLoading: boolean }>;
export type SavingDepFailureAction = GenericAction<typeof SAVING_DEP_FAILURE, { error: Error }>;
export type SavingDepSuccessAction = GenericAction<typeof SAVING_DEP_SUCCESS, { message: string }>;
export type ClearSavingDepAction = GenericAction<typeof CLEAR_SAVING_DEP>;

const loading = (isLoading: boolean): SavingDepAction => ({
    type: SAVING_DEP,
    payload: { isLoading },
});

const loadingFailure = (error: Error): SavingDepFailureAction => ({
    type: SAVING_DEP_FAILURE,
    payload: { error },
});

const loadingSuccess = (message: string): SavingDepSuccessAction => ({
    type: SAVING_DEP_SUCCESS,
    payload: { message },
});

export const clearDepState = (): ClearSavingDepAction => ({
    type: CLEAR_SAVING_DEP,
});

// Union of all actions
export type DepEditActions =
    | SavingDepAction
    | SavingDepFailureAction
    | SavingDepSuccessAction
    | ClearSavingDepAction;

export const saveDep = (dep: DepartmentInput) => {
    return (dispatch: Dispatch<DepEditActions> | any): void => {
        dispatch(clearDepState())
        dispatch(loading(true));
        departmentsAPI.saveDep(dep)
            .then((department: Department): void => {
                dispatch(addDepInStore(department));
                dispatch(loadingSuccess("Successfully added a department!"));
            })
            .catch((e: Error) => {
                console.warn("Error saving department!", e);
                dispatch(loadingFailure(new Error("Failed to save a department!")));
            })
            .finally(() => dispatch(loading(false)));
    };
};

export const updateDep = (dep: DepartmentInput) => {
    return (dispatch: Dispatch<DepEditActions> | any): void => {
        dispatch(clearDepState())
        dispatch(loading(true));
        departmentsAPI.updateDep(dep)
            .then((department: Department): void => {
                dispatch(updateDepInStore(department));
                dispatch(loadingSuccess("Successfully updated the department!"));
            })
            .catch((e: Error) => {
                console.warn("Error updating department!", e);
                dispatch(loadingFailure(new Error("Failed to update the department!")));
            })
            .finally(() => dispatch(loading(false)));
    };
};