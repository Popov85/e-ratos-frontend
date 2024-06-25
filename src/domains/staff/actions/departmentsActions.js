import {departmentsAPI} from "../_api/departmentsAPI";
import {setAllFac} from "./facultiesActions";
import {setAllOrg} from "./organisationsActions";
import {facultiesAPI} from "../_api/facultiesAPI";
import {organisationsAPI} from "../_api/organisationsAPI";

const LOADING_ALL_DEP = "LOADING_ALL_DEP";
const LOADING_ALL_DEP_FAILURE = "LOADING_ALL_DEP_FAILURE";
const CLEAR_LOADING_ALL_DEP_FAILURE = "CLEAR_LOADING_ALL_DEP_FAILURE";
const SET_ALL_DEP= "SET_ALL_DEP";

const UPDATING_DEP = "UPDATING_DEP";
const UPDATING_DEP_FAILURE = "UPDATING_DEP_FAILURE";
const CLEAR_UPDATING_DEP_FAILURE = "CLEAR_UPDATING_DEP_FAILURE";

const CLEAR_ALL_DEP_FAILURES = "CLEAR_ALL_DEP_FAILURES";

const ADD_DEP_IN_STORE = "ADD_DEP_IN_STORE";
const UPDATE_DEP_IN_STORE = "UPDATE_DEP_IN_STORE";
const UPDATE_DEP_NAME_IN_STORE = "UPDATE_DEP_NAME_IN_STORE";
const DELETE_DEP_FROM_STORE = "DELETE_DEP_FROM_STORE";

export const loading = isLoading => ({type: LOADING_ALL_DEP, isLoading});
export const loadingFailure = error => ({type: LOADING_ALL_DEP_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ALL_DEP_FAILURE});
export const setAllDep = allDep => ({type: SET_ALL_DEP, payload: allDep});

export const updating = isUpdating => ({type: UPDATING_DEP, isUpdating});
export const updatingFailure = error => ({type: UPDATING_DEP_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_DEP_FAILURE});

export const clearAllDepFailures = () => ({type: CLEAR_ALL_DEP_FAILURES});

export const addDepInStore = dep => ({type: ADD_DEP_IN_STORE, payload: dep});
export const updateDepInStore = dep => ({type: UPDATE_DEP_IN_STORE, payload: dep});
export const updateDepNameInStore = (depId, name) => ({type: UPDATE_DEP_NAME_IN_STORE, depId, name});
export const deleteDepFromStore = depId => ({type: DELETE_DEP_FROM_STORE, depId});


export const updateDepName = (depId, name) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        departmentsAPI.updateDepName(depId, name).then(() => {
            dispatch(updateDepNameInStore(depId, name));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update dep.'s name")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteDep = depId => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        departmentsAPI.deleteDep(depId).then(() => {
            dispatch(deleteDepFromStore(depId));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to delete dep.")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const getAllDepartmentsByFaculty = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        departmentsAPI.fetchAllDepartmentsByFacultyForTable().then(result => {
            dispatch(setAllDep(result.data));
        }).catch(e => {
            console.log("Error fetching all fac.'s departments'!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all fac.'s departments")));
        }).finally(() => dispatch(loading(false)));
    }
}

// Here we automatically load all faculties too
export const getAllDepartmentsBunchByOrganisation = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        Promise.all([
            departmentsAPI.fetchAllDepartmentsByOrganisationForTable(),
            facultiesAPI.fetchAllFacultiesByOrganisationForTable()
        ]).then(bunch => {
            dispatch(setAllFac(bunch[1].data));
            dispatch(setAllDep(bunch[0].data));
        }).catch(e => {
            console.log("Error fetching all org.'s departments'!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all fac.'s departments")));
        }).finally(() => dispatch(loading(false)));
    }
}

// Here we automatically load all faculties and organisations too
export const getAllDepartmentsBunchByRatos = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        Promise.all([
            departmentsAPI.fetchAllDepartmentsByRatosForTable(),
            facultiesAPI.fetchAllFacultiesByRatosForTable(),
            organisationsAPI.fetchAllOrganisationsForDropDown()
        ]).then(bunch => {
            dispatch(setAllOrg(bunch[2].data));
            dispatch(setAllFac(bunch[1].data));
            dispatch(setAllDep(bunch[0].data));
        }).catch(e => {
            console.log("Error fetching all departments!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all departments")));
        }).finally(() => dispatch(loading(false)));
    }
}