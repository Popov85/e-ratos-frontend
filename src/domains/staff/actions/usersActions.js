import {usersAPI} from "../_api/usersAPI";

const LOADING_DEP_STAFF = "LOADING_DEP_STAFF";
const LOADING_DEP_STAFF_FAILURE = "LOADING_DEP_STAFF_FAILURE";
const CLEAR_LOADING_DEP_STAFF_FAILURE = "CLEAR_LOADING_DEP_STAFF_FAILURE";
const SET_DEP_STAFF = "SET_DEP_STAFF";
const CLEAR_DEP_STAFF = "CLEAR_DEP_STAFF";

const UPDATING_DEP_STAFF = "UPDATING_DEP_STAFF";
const UPDATING_DEP_STAFF_FAILURE = "UPDATING_DEP_STAFF_FAILURE";
const CLEAR_UPDATING_DEP_STAFF_FAILURE = "CLEAR_UPDATING_DEP_STAFF_FAILURE";

const CLEAR_DEP_STAFF_FAILURE = "CLEAR_DEP_STAFF_FAILURE";

const ADD_STAFF_IN_STORE = "ADD_STAFF_IN_STORE";
const UPDATE_STAFF_IN_STORE = "UPDATE_STAFF_IN_STORE";

const UPDATE_STAFF_NAME_IN_STORE = "UPDATE_STAFF_NAME_IN_STORE";
const UPDATE_STAFF_SURNAME_IN_STORE = "UPDATE_STAFF_SURNAME_IN_STORE";
const UPDATE_STAFF_EMAIL_IN_STORE = "UPDATE_STAFF_EMAIL_IN_STORE";

const DELETE_STAFF_FROM_STORE = "DELETE_STAFF_FROM_STORE";


const SET_STAFF_FILTER = "SET_STAFF_FILTER";

export const setStaffFilter = filter => ({type: SET_STAFF_FILTER, payload: filter});

export const loading = isLoading => ({type: LOADING_DEP_STAFF, isLoading});
export const loadingFailure = error => ({type: LOADING_DEP_STAFF_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_DEP_STAFF_FAILURE});

export const setDepStaff = staff => ({type: SET_DEP_STAFF, payload: staff});
export const clearDepStaff = () => ({type: CLEAR_DEP_STAFF});

export const updating = isUpdating => ({type: UPDATING_DEP_STAFF, isUpdating});
export const updatingFailure = error => ({type: UPDATING_DEP_STAFF_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_DEP_STAFF_FAILURE});

export const clearAllFailures = () => ({type: CLEAR_DEP_STAFF_FAILURE});

export const addStaffInStore = (staff) => ({type: ADD_STAFF_IN_STORE, payload: staff});
export const updateStaffInStore = (staff) => ({type: UPDATE_STAFF_IN_STORE, payload: staff});
export const updateStaffNameInStore = (staffId, name) => ({type: UPDATE_STAFF_NAME_IN_STORE, staffId, name});
export const updateStaffSurnameInStore = (staffId, surname) => ({type: UPDATE_STAFF_SURNAME_IN_STORE, staffId, surname});
export const updateStaffEmailInStore = (staffId, email) => ({type: UPDATE_STAFF_EMAIL_IN_STORE, staffId, email});
export const deleteStaffFromStore = (staffId) => ({type: DELETE_STAFF_FROM_STORE, staffId});


export const updateStaffName = (staffId, name) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        usersAPI.updateUserName(staffId, name).then(result => {
            dispatch(updateStaffNameInStore(staffId, name));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update user name")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const updateStaffSurname = (staffId, surname) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        usersAPI.updateUserSurname(staffId, surname).then(result => {
            dispatch(updateStaffSurnameInStore(staffId, surname));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update user surname")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const updateStaffEmail = (staffId, email) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        usersAPI.updateUserEmail(staffId, email).then(result => {
            dispatch(updateStaffEmailInStore(staffId, email));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update user email")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteStaff = (staffId) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        usersAPI.deleteStaff(staffId).then(() => {
            dispatch(deleteStaffFromStore(staffId));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to delete a staff")));
        }).finally(() => dispatch(updating(false)));
    }
}

//--------------------------------------------------SETs----------------------------------------------------------------

export const getAllStaffByDepartment = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        usersAPI.fetchAllStaffByDepartment().then(result => {
            dispatch(setDepStaff(result.data));
        }).catch(e => {
            console.log("Error fetching all dep. staff!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all dep. staff")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllStaffByFaculty = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        usersAPI.fetchAllStaffByFaculty().then(result => {
            dispatch(setDepStaff(result.data));
        }).catch(e => {
            console.log("Error fetching all fac. staff!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all fac. staff")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllStaffByOrganisation = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        usersAPI.fetchAllStaffByOrganisation().then(result => {
            dispatch(setDepStaff(result.data));
        }).catch(e => {
            console.log("Error fetching all org. staff!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all org. staff")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllStaffByRatos = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        usersAPI.fetchAllStaffByRatos().then(result => {
            dispatch(setDepStaff(result.data));
        }).catch(e => {
            console.log("Error fetching all ratos. staff!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all ratos. staff")));
        }).finally(() => dispatch(loading(false)));
    }
}