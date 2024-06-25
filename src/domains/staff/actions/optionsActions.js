import {optionsAPI} from "../_api/optionsAPI";

const LOADING_ALL_OPTIONS = "LOADING_ALL_OPTIONS";
const LOADING_ALL_OPTIONS_FAILURE = "LOADING_ALL_OPTIONS_FAILURE";
const CLEAR_LOADING_ALL_OPTIONS_FAILURE = "CLEAR_LOADING_ALL_OPTIONS_FAILURE";
const SET_ALL_OPTIONS = "SET_ALL_OPTIONS";

const UPDATING_OPTIONS = "UPDATING_OPTIONS";
const UPDATING_OPTIONS_FAILURE = "UPDATING_OPTIONS_FAILURE";
const CLEAR_UPDATING_OPTIONS_FAILURE = "CLEAR_UPDATING_OPTIONS_FAILURE";

const CLEAR_ALL_OPTIONS_FAILURES = "CLEAR_ALL_OPTIONS_FAILURES";

const ADD_OPTIONS_IN_STORE = "ADD_OPTIONS_IN_STORE";
const UPDATE_OPTIONS_IN_STORE = "UPDATE_OPTIONS_IN_STORE";
const UPDATE_OPTIONS_NAME_IN_STORE = "UPDATE_OPTIONS_NAME_IN_STORE";
const DELETE_OPTIONS_FROM_STORE = "DELETE_OPTIONS_FROM_STORE";

export const loading = isLoading => ({type: LOADING_ALL_OPTIONS, isLoading});
export const loadingFailure = error => ({type: LOADING_ALL_OPTIONS_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ALL_OPTIONS_FAILURE});
export const setAllOptions = options => ({type: SET_ALL_OPTIONS, payload: options});

export const updating = isUpdating => ({type: UPDATING_OPTIONS, isUpdating});
export const updatingFailure = error => ({type: UPDATING_OPTIONS_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_OPTIONS_FAILURE});

export const clearAllOptionsFailures = () => ({type: CLEAR_ALL_OPTIONS_FAILURES});

export const addOptionsInStore = options => ({type: ADD_OPTIONS_IN_STORE, payload: options});
export const updateOptionsInStore = options => ({type: UPDATE_OPTIONS_IN_STORE, payload: options});
export const updateOptionsNameInStore = (optionsId, name) => ({type: UPDATE_OPTIONS_NAME_IN_STORE, optionsId, name});
export const deleteOptionsFromStore = optionsId => ({type: DELETE_OPTIONS_FROM_STORE, optionsId});

/*export const updateOptionsName = (optionsId, name) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        optionsAPI.updateOptionsName(optionsId, name).then(() => {
            dispatch(updateOptionsNameInStore(optionsId, name));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update options's name")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteOptions = optionsId => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        optionsAPI.deleteOptions(optionsId).then(() => {
            dispatch(deleteOptionsFromStore(optionsId));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to delete options!")));
        }).finally(() => dispatch(updating(false)));
    }
}

//-----------------------------------------------------Table------------------------------------------------------------

// For higher admin!
export const getAllOptionsByDepartmentId = depId => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        optionsAPI.fetchAllOptionsByDepartmentIdForTable(depId).then(result => {
            dispatch(setAllOptions(result.data));
        }).catch(e => {
            console.log("Error fetching all dep. options!", e);
            dispatch(loadingFailure(new Error(`Failed to fetch all options, depId = ${depId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}*/

export const getAllOptionsByDepartmentWithDefault = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        optionsAPI.fetchAllOptionsByDepartmentWithDefault().then(result => {
            dispatch(setAllOptions(result.data));
        }).catch(e => {
            console.log("Error fetching all dep. options!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all dep options!")));
        }).finally(() => dispatch(loading(false)));
    }
}


