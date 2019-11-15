import {usersAPI} from "../_api/usersAPI";

const LOADING_DEP_STAFF = "LOADING_DEP_STAFF";
const LOADING_DEP_STAFF_FAILURE = "LOADING_DEP_STAFF_FAILURE";
const CLEAR_LOADING_DEP_STAFF_FAILURE = "CLEAR_LOADING_DEP_STAFF_FAILURE";
const SET_DEP_STAFF = "SET_DEP_STAFF";
const CLEAR_DEP_STAFF = "CLEAR_DEP_STAFF";

const UPDATING_DEP_STAFF = "UPDATING_DEP_STAFF";
const UPDATING_DEP_STAFF_FAILURE = "UPDATING_DEP_STAFF_FAILURE";
const CLEAR_UPDATING_DEP_STAFF_FAILURE = "CLEAR_UPDATING_DEP_STAFF_FAILURE";

const UPDATE_STAFF_NAME = "UPDATE_STAFF_NAME";
const UPDATE_STAFF_SURNAME = "UPDATE_STAFF_SURNAME";
const UPDATE_STAFF_EMAIL = "UPDATE_STAFF_EMAIL";
const UPDATE_STAFF_POSITION = "UPDATE_STAFF_POSITION";
const UPDATE_STAFF_ROLE = "UPDATE_STAFF_ROLE";

const ENABLE_STAFF = "ENABLE_STAFF";
const DISABLE_STAFF = "DISABLE_STAFF";

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

export const updateStaffNameInStore = (staffId, name) => ({type: UPDATE_STAFF_NAME, staffId, name});
export const updateStaffSurnameInStore = (staffId, surname) => ({type: UPDATE_STAFF_SURNAME, staffId, surname});
export const updateStaffEmailInStore = (staffId, email) => ({type: UPDATE_STAFF_EMAIL, staffId, email});
export const updateStaffPositionInStore = (staffId, positionId, positions) => ({type: UPDATE_STAFF_POSITION, staffId, positionId, positions});
export const updateStaffRoleInStore = (staffId, role) => ({type: UPDATE_STAFF_ROLE, staffId, role});

export const enableStaffInStore = (staffId) => ({type: ENABLE_STAFF, staffId});
export const disableStaffInStore = (staffId) => ({type: DISABLE_STAFF, staffId});


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

export const updateStaffRole = (staffId, role) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        usersAPI.updateStaffRole(staffId, role).then(result => {
            dispatch(updateStaffRoleInStore(staffId, role));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update user role")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const updateStaffPosition = (staffId, positionId, positions) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        usersAPI.updateStaffPosition(staffId, positionId).then(result => {
            dispatch(updateStaffPositionInStore(staffId, positionId, positions));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update staff position")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const enableStaff = (staffId) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        usersAPI.enable(staffId).then(result => {
            dispatch(enableStaffInStore(staffId));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to enable a staff")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const disableStaff = (staffId) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        usersAPI.disable(staffId).then(result => {
            dispatch(disableStaffInStore(staffId));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to disable a staff")));
        }).finally(() => dispatch(updating(false)));
    }
}

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

export const getStaffByDepartment = (params) => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        usersAPI.fetchStaffByDepartment(params).then(result => {
            dispatch(setDepStaff(result.data));
        }).catch(e => {
            console.log("Error fetching dep. staff!", e);
            dispatch(loadingFailure(new Error("Failed to fetch dep. staff")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getStaffByDepartmentAndSurnameLettersContains = (letters, params) => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        usersAPI.fetchStaffByDepartmentAndSurnameLettersContains(letters, params).then(result => {
            dispatch(setDepStaff(result.data));
            //Set filter to feed back to table
            dispatch(setStaffFilter(letters));
        }).catch(e => {
            console.log("Error fetching dep. staff!", e);
            dispatch(loadingFailure(new Error("Failed to fetch dep. staff")));
        }).finally(() => dispatch(loading(false)));
    }
}