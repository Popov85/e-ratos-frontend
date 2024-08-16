import {departmentsAPI} from "../_api/departmentsAPI";
import {setAllFac} from "./facultiesActions";
import {setAllOrg} from "./organisationsActions";
import {facultiesAPI} from "../_api/facultiesAPI";
import {organisationsAPI} from "../_api/organisationsAPI";
import {GenericAction} from "../../common/types/GenericAction";
import {Department} from "../types/Department";
import {Dispatch} from "redux";
import {Faculty} from "../types/Faculty";
import {Organisation} from "../types/Organisation";

// Define Action Types
export const LOADING_ALL_DEP = "LOADING_ALL_DEP" as const;
export const LOADING_ALL_DEP_FAILURE = "LOADING_ALL_DEP_FAILURE" as const;
export const CLEAR_LOADING_ALL_DEP_FAILURE = "CLEAR_LOADING_ALL_DEP_FAILURE" as const;
export const SET_ALL_DEP = "SET_ALL_DEP" as const;
export const UPDATING_DEP = "UPDATING_DEP" as const;
export const UPDATING_DEP_FAILURE = "UPDATING_DEP_FAILURE" as const;
export const CLEAR_UPDATING_DEP_FAILURE = "CLEAR_UPDATING_DEP_FAILURE" as const;
export const CLEAR_ALL_DEP_FAILURES = "CLEAR_ALL_DEP_FAILURES" as const;
export const ADD_DEP_IN_STORE = "ADD_DEP_IN_STORE" as const;
export const UPDATE_DEP_IN_STORE = "UPDATE_DEP_IN_STORE" as const;
export const UPDATE_DEP_NAME_IN_STORE = "UPDATE_DEP_NAME_IN_STORE" as const;
export const DELETE_DEP_FROM_STORE = "DELETE_DEP_FROM_STORE" as const;

// Define Action Interfaces
export type LoadingAllDepAction = GenericAction<typeof LOADING_ALL_DEP, { isLoading: boolean }>;
export type LoadingAllDepFailureAction = GenericAction<typeof LOADING_ALL_DEP_FAILURE, { error: Error }>;
export type ClearLoadingAllDepFailureAction = GenericAction<typeof CLEAR_LOADING_ALL_DEP_FAILURE>;
export type SetAllDepAction = GenericAction<typeof SET_ALL_DEP, { allDep: Department[] }>;
export type UpdatingDepAction = GenericAction<typeof UPDATING_DEP, { isUpdating: boolean }>;
export type UpdatingDepFailureAction = GenericAction<typeof UPDATING_DEP_FAILURE, { errorUpdate: Error }>;
export type ClearUpdatingDepFailureAction = GenericAction<typeof CLEAR_UPDATING_DEP_FAILURE>;
export type ClearAllDepFailuresAction = GenericAction<typeof CLEAR_ALL_DEP_FAILURES>;
export type AddDepInStoreAction = GenericAction<typeof ADD_DEP_IN_STORE, { dep: Department }>;
export type UpdateDepInStoreAction = GenericAction<typeof UPDATE_DEP_IN_STORE, { dep: Department }>;
export type UpdateDepNameInStoreAction = GenericAction<typeof UPDATE_DEP_NAME_IN_STORE, {
    depId: number;
    name: string
}>;
export type DeleteDepFromStoreAction = GenericAction<typeof DELETE_DEP_FROM_STORE, { depId: number }>;

// Union of All Actions
export type DepartmentsActionsTypes =
    | LoadingAllDepAction
    | LoadingAllDepFailureAction
    | ClearLoadingAllDepFailureAction
    | SetAllDepAction
    | UpdatingDepAction
    | UpdatingDepFailureAction
    | ClearUpdatingDepFailureAction
    | ClearAllDepFailuresAction
    | AddDepInStoreAction
    | UpdateDepInStoreAction
    | UpdateDepNameInStoreAction
    | DeleteDepFromStoreAction;

// Action Creators
const loading = (isLoading: boolean): LoadingAllDepAction => ({
    type: LOADING_ALL_DEP,
    payload: {isLoading},
});

const loadingFailure = (error: Error): LoadingAllDepFailureAction => ({
    type: LOADING_ALL_DEP_FAILURE,
    payload: {error},
});

const clearLoadingFailure = (): ClearLoadingAllDepFailureAction => ({
    type: CLEAR_LOADING_ALL_DEP_FAILURE,
});

export const setAllDep = (allDep: Department[]): SetAllDepAction => ({
    type: SET_ALL_DEP,
    payload: {allDep},
});

const updating = (isUpdating: boolean): UpdatingDepAction => ({
    type: UPDATING_DEP,
    payload: {isUpdating},
});

const updatingFailure = (errorUpdate: Error): UpdatingDepFailureAction => ({
    type: UPDATING_DEP_FAILURE,
    payload: {errorUpdate},
});

const clearUpdatingFailure = (): ClearUpdatingDepFailureAction => ({
    type: CLEAR_UPDATING_DEP_FAILURE,
});

export const clearAllDepFailures = (): ClearAllDepFailuresAction => ({
    type: CLEAR_ALL_DEP_FAILURES,
});

export const addDepInStore = (dep: Department): AddDepInStoreAction => ({
    type: ADD_DEP_IN_STORE,
    payload: {dep},
});

export const updateDepInStore = (dep: Department): UpdateDepInStoreAction => ({
    type: UPDATE_DEP_IN_STORE,
    payload: {dep},
});

export const updateDepNameInStore = (depId: number, name: string): UpdateDepNameInStoreAction => ({
    type: UPDATE_DEP_NAME_IN_STORE,
    payload: {depId, name},
});

export const deleteDepFromStore = (depId: number): DeleteDepFromStoreAction => ({
    type: DELETE_DEP_FROM_STORE,
    payload: {depId},
});

export const updateDepName = (depId: number, name: string) => {
    return (dispatch: Dispatch<DepartmentsActionsTypes>): void => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        departmentsAPI.updateDepName(depId, name)
            .then((status: number) => {
                if (status >= 200 && status < 300) {
                    dispatch(updateDepNameInStore(depId, name));
                } else {
                    throw new Error("Failed to execute API to update a department!");
                }
            })
            .catch((e: Error) => {
                console.warn("Error updating dep name", e);
                dispatch(updatingFailure(new Error("Failed to update dep.'s name")));
            })
            .finally(() => dispatch(updating(false)));
    };
};

export const deleteDep = (depId: number) => {
    return (dispatch: Dispatch<DepartmentsActionsTypes>): void => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        departmentsAPI.deleteDep(depId)
            .then((status: number): void => {
                if (status >= 200 && status < 300) {
                    dispatch(deleteDepFromStore(depId));
                } else {
                    throw new Error("Failed to execute API to delete a department!");
                }
            })
            .catch((e: Error) => {
                console.warn("Error deleting department", e);
                dispatch(updatingFailure(new Error("Failed to delete dep.")));
            })
            .finally(() => dispatch(updating(false)));
    };
};

export const getAllDepartmentsByFaculty = () => {
    return (dispatch: Dispatch<DepartmentsActionsTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        departmentsAPI.fetchAllDepartmentsByFacultyForTable()
            .then((departments: Array<Department>): void => {
                dispatch(setAllDep(departments));
            })
            .catch((e: Error) => {
                console.warn("Error getting departments by faculty", e);
                dispatch(loadingFailure(new Error("Failed to fetch all fac.'s departments")));
            })
            .finally(() => dispatch(loading(false)));
    };
};

export const getAllDepartmentsBunchByOrganisation = () => {
    return (dispatch: Dispatch<DepartmentsActionsTypes> | any): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        Promise.all([
            departmentsAPI.fetchAllDepartmentsByOrganisationForTable(),
            facultiesAPI.fetchAllFacultiesByOrganisationForTable()
        ])
            .then(([departments, faculties]: [Array<Department>, Array<Faculty>]): void => {
                dispatch(setAllFac(faculties));
                dispatch(setAllDep(departments));
            })
            .catch((e: Error) => {
                console.warn("Error getting bunch of entities by organisation", e);
                dispatch(loadingFailure(new Error("Failed to fetch all org.'s departments")));
            })
            .finally(() => dispatch(loading(false)));
    };
};

export const getAllDepartmentsBunchByRatos = () => {
    return (dispatch: Dispatch<DepartmentsActionsTypes> | any): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        Promise.all([
            departmentsAPI.fetchAllDepartmentsByRatosForTable(),
            facultiesAPI.fetchAllFacultiesByRatosForTable(),
            organisationsAPI.fetchAllOrganisationsForDropDown()
        ])
            .then(([departments, faculties, organisations]: [Array<Department>, Array<Faculty>, Array<Organisation>]): void => {
                dispatch(setAllOrg(organisations));
                dispatch(setAllFac(faculties));
                dispatch(setAllDep(departments));
            })
            .catch((e: Error) => {
                console.warn("Error getting bunch of structure entities by global admin", e);
                dispatch(loadingFailure(new Error("Failed to fetch all departments")));
            })
            .finally(() => dispatch(loading(false)));
    };
};
