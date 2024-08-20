import {usersAPI} from "../_api/usersAPI";
import {GenericAction} from "../../common/types/GenericAction";
import {Staff} from "../types/Staff";
import {Dispatch} from "redux";

export const LOADING_DEP_STAFF = "LOADING_DEP_STAFF";
export const LOADING_DEP_STAFF_FAILURE = "LOADING_DEP_STAFF_FAILURE";
export const CLEAR_LOADING_DEP_STAFF_FAILURE = "CLEAR_LOADING_DEP_STAFF_FAILURE";
export const SET_STAFF = "SET_STAFF";
export const CLEAR_DEP_STAFF = "CLEAR_DEP_STAFF";
export const UPDATING_DEP_STAFF = "UPDATING_DEP_STAFF";
export const UPDATING_DEP_STAFF_FAILURE = "UPDATING_DEP_STAFF_FAILURE";
export const CLEAR_UPDATING_DEP_STAFF_FAILURE = "CLEAR_UPDATING_DEP_STAFF_FAILURE";
export const CLEAR_DEP_STAFF_FAILURE = "CLEAR_DEP_STAFF_FAILURE";
export const ADD_STAFF_IN_STORE = "ADD_STAFF_IN_STORE";
export const UPDATE_STAFF_IN_STORE = "UPDATE_STAFF_IN_STORE";
export const UPDATE_STAFF_NAME_IN_STORE = "UPDATE_STAFF_NAME_IN_STORE";
export const UPDATE_STAFF_SURNAME_IN_STORE = "UPDATE_STAFF_SURNAME_IN_STORE";
export const UPDATE_STAFF_EMAIL_IN_STORE = "UPDATE_STAFF_EMAIL_IN_STORE";
export const DELETE_STAFF_FROM_STORE = "DELETE_STAFF_FROM_STORE";
export const SET_STAFF_FILTER = "SET_STAFF_FILTER";

export type SetStaffFilterAction = GenericAction<typeof SET_STAFF_FILTER, {filter: string}>;
export type LoadingAction = GenericAction<typeof LOADING_DEP_STAFF, { isLoading: boolean }>;
export type LoadingFailureAction = GenericAction<typeof LOADING_DEP_STAFF_FAILURE, { error: Error }>;
export type ClearLoadingFailureAction = GenericAction<typeof CLEAR_LOADING_DEP_STAFF_FAILURE>;
export type SetStaffAction = GenericAction<typeof SET_STAFF, Staff[]>;
export type ClearDepStaffAction = GenericAction<typeof CLEAR_DEP_STAFF>;
export type UpdatingAction = GenericAction<typeof UPDATING_DEP_STAFF, { isUpdating: boolean }>;
export type UpdatingFailureAction = GenericAction<typeof UPDATING_DEP_STAFF_FAILURE, { error: Error }>;
export type ClearUpdatingFailureAction = GenericAction<typeof CLEAR_UPDATING_DEP_STAFF_FAILURE>;
export type ClearAllStaffFailuresAction = GenericAction<typeof CLEAR_DEP_STAFF_FAILURE>;
export type AddStaffInStoreAction = GenericAction<typeof ADD_STAFF_IN_STORE, {staff: Staff}>;
export type UpdateStaffInStoreAction = GenericAction<typeof UPDATE_STAFF_IN_STORE, {staff: Staff}>;
export type UpdateStaffNameInStoreAction = GenericAction<typeof UPDATE_STAFF_NAME_IN_STORE, {
    staffId: number;
    name: string
}>;
export type UpdateStaffSurnameInStoreAction = GenericAction<typeof UPDATE_STAFF_SURNAME_IN_STORE, {
    staffId: number;
    surname: string
}>;
export type UpdateStaffEmailInStoreAction = GenericAction<typeof UPDATE_STAFF_EMAIL_IN_STORE, {
    staffId: number;
    email: string
}>;
export type DeleteStaffFromStoreAction = GenericAction<typeof DELETE_STAFF_FROM_STORE, { staffId: number }>;

export type StaffActionTypes =
    | SetStaffFilterAction
    | LoadingAction
    | LoadingFailureAction
    | ClearLoadingFailureAction
    | SetStaffAction
    | ClearDepStaffAction
    | UpdatingAction
    | UpdatingFailureAction
    | ClearUpdatingFailureAction
    | ClearAllStaffFailuresAction
    | AddStaffInStoreAction
    | UpdateStaffInStoreAction
    | UpdateStaffNameInStoreAction
    | UpdateStaffSurnameInStoreAction
    | UpdateStaffEmailInStoreAction
    | DeleteStaffFromStoreAction;

export const setStaffFilter = (filter: string): SetStaffFilterAction => ({
    type: SET_STAFF_FILTER,
    payload: {filter},
});

export const loading = (isLoading: boolean): LoadingAction => ({
    type: LOADING_DEP_STAFF,
    payload: {isLoading},
});

export const loadingFailure = (error: Error): LoadingFailureAction => ({
    type: LOADING_DEP_STAFF_FAILURE,
    payload: {error},
});

export const clearLoadingFailure = (): ClearLoadingFailureAction => ({
    type: CLEAR_LOADING_DEP_STAFF_FAILURE,
});

export const setStaff = (staff: Staff[]): SetStaffAction => ({
    type: SET_STAFF,
    payload: staff,
});

export const clearDepStaff = (): ClearDepStaffAction => ({
    type: CLEAR_DEP_STAFF,
});

export const updating = (isUpdating: boolean): UpdatingAction => ({
    type: UPDATING_DEP_STAFF,
    payload: {isUpdating},
});

export const updatingFailure = (error: Error): UpdatingFailureAction => ({
    type: UPDATING_DEP_STAFF_FAILURE,
    payload: {error},
});

export const clearUpdatingFailure = (): ClearUpdatingFailureAction => ({
    type: CLEAR_UPDATING_DEP_STAFF_FAILURE,
});

export const clearAllStaffFailures = (): ClearAllStaffFailuresAction => ({
    type: CLEAR_DEP_STAFF_FAILURE,
});

export const addStaffInStore = (staff: Staff): AddStaffInStoreAction => ({
    type: ADD_STAFF_IN_STORE,
    payload: {staff},
});

export const updateStaffInStore = (staff: Staff): UpdateStaffInStoreAction => ({
    type: UPDATE_STAFF_IN_STORE,
    payload: {staff},
});

export const updateStaffNameInStore = (staffId: number, name: string): UpdateStaffNameInStoreAction => ({
    type: UPDATE_STAFF_NAME_IN_STORE,
    payload: {staffId, name},
});

export const updateStaffSurnameInStore = (staffId: number, surname: string): UpdateStaffSurnameInStoreAction => ({
    type: UPDATE_STAFF_SURNAME_IN_STORE,
    payload: {staffId, surname},
});

export const updateStaffEmailInStore = (staffId: number, email: string): UpdateStaffEmailInStoreAction => ({
    type: UPDATE_STAFF_EMAIL_IN_STORE,
    payload: {staffId, email},
});

export const deleteStaffFromStore = (staffId: number): DeleteStaffFromStoreAction => ({
    type: DELETE_STAFF_FROM_STORE,
    payload: {staffId},
});

export const updateStaffName = (staffId: number, name: string) => {
    return (dispatch: Dispatch<StaffActionTypes>): void => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        usersAPI.updateUserName(staffId, name)
            .then((status: number): void => {
                if (status >= 200 && status < 300) {
                    dispatch(updateStaffNameInStore(staffId, name));
                } else {
                    throw new Error("Failed to execute API to update staff name!");
                }
            })
            .catch((e: Error) => {
                console.warn("Error updating name of staff!", e);
                dispatch(updatingFailure(new Error("Failed to update user's name")));
            })
            .finally(() => dispatch(updating(false)));
    };
};

export const updateStaffSurname = (staffId: number, surname: string) => {
    return (dispatch: Dispatch<StaffActionTypes>): void => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        usersAPI.updateUserSurname(staffId, surname)
            .then((status: number): void => {
                if (status >= 200 && status < 300) {
                    dispatch(updateStaffSurnameInStore(staffId, surname));
                } else {
                    throw new Error("Failed to execute API to update user surname!");
                }
            })
            .catch((e: Error) => {
                console.warn("Error updating surname of staff!", e);
                dispatch(updatingFailure(new Error("Failed to update staff's surname")));
            })
            .finally(() => dispatch(updating(false)));
    };
};

export const updateStaffEmail = (staffId: number, email: string) => {
    return (dispatch: Dispatch<StaffActionTypes>): void => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        usersAPI.updateUserEmail(staffId, email)
            .then((status: number): void => {
                if (status >= 200 && status < 300) {
                    dispatch(updateStaffEmailInStore(staffId, email));
                } else {
                    throw new Error("Failed to execute API to update staff email!");
                }
            })
            .catch((e: Error) => {
                console.warn("Error updating email of staff!", e);
                dispatch(updatingFailure(new Error("Failed to update staff's email")));
            })
            .finally(() => dispatch(updating(false)));
    };
};

export const deleteStaff = (staffId: number) => {
    return (dispatch: Dispatch<StaffActionTypes>): void => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        usersAPI.deleteStaff(staffId)
            .then((status: number): void => {
                if (status >= 200 && status < 300) {
                    dispatch(deleteStaffFromStore(staffId));
                } else {
                    throw new Error("Failed to execute API to delete staff!");
                }
            })
            .catch((e: Error) => {
                console.warn("Error deleting staff!", e);
                dispatch(updatingFailure(new Error("Failed to delete staff")));
            })
            .finally(() => dispatch(updating(false)));
    };
};

export const getAllStaffByDepartment = () => {
    return (dispatch: Dispatch<StaffActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        usersAPI.fetchAllStaffByDepartment()
            .then((staff: Array<Staff>): void => {
                dispatch(setStaff(staff));
            })
            .catch((e: Error) => {
                console.warn("Error fetching all dep. staff!", e);
                dispatch(loadingFailure(new Error("Failed to fetch all department staff")));
            })
            .finally(() => dispatch(loading(false)));
    };
};

export const getAllStaffByFaculty = () => {
    return (dispatch: Dispatch<StaffActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        usersAPI.fetchAllStaffByFaculty()
            .then((staff: Array<Staff>): void => {
                dispatch(setStaff(staff));
            })
            .catch((e: Error) => {
                console.warn("Error fetching all fac. staff!", e);
                dispatch(loadingFailure(new Error("Failed to fetch all faculty staff")));
            })
            .finally(() => dispatch(loading(false)));
    };
};

export const getAllStaffByOrganisation = () => {
    return (dispatch: Dispatch<StaffActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        usersAPI.fetchAllStaffByOrganisation()
            .then((staff: Array<Staff>): void => {
            dispatch(setStaff(staff));
        }).catch((e: Error) => {
            console.warn("Error fetching all org. staff!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all org. staff")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllStaffByRatos = () => {
    return (dispatch: Dispatch<StaffActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        usersAPI.fetchAllStaffByRatos()
            .then((staff: Array<Staff>): void => {
            dispatch(setStaff(staff));
        }).catch((e: Error) => {
            console.warn("Error fetching all ratos. staff!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all ratos. staff")));
        }).finally(() => dispatch(loading(false)));
    }
}