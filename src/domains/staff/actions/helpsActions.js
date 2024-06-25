import {helpsAPI} from "../_api/helpsAPI";

const LOADING_ALL_HELPS = "LOADING_ALL_HELPS";
const LOADING_ALL_HELPS_FAILURE = "LOADING_ALL_HELPS_FAILURE";
const CLEAR_LOADING_ALL_HELPS_FAILURE = "CLEAR_LOADING_ALL_HELPS_FAILURE";
const SET_ALL_HELPS = "SET_ALL_HELPS";

const UPDATING_HELP = "UPDATING_HELP";
const UPDATING_HELP_FAILURE = "UPDATING_HELP_FAILURE";
const CLEAR_UPDATING_HELP_FAILURE = "CLEAR_UPDATING_HELP_FAILURE";

const CLEAR_ALL_HELPS_FAILURES = "CLEAR_ALL_HELPS_FAILURES";

const ADD_HELP_IN_STORE = "ADD_HELP_IN_STORE";
const UPDATE_HELP_IN_STORE = "UPDATE_HELP_IN_STORE";
const UPDATE_HELP_NAME_IN_STORE = "UPDATE_HELP_NAME_IN_STORE";
const UPDATE_HELP_TEXT_IN_STORE = "UPDATE_HELP_TEXT_IN_STORE";
const UPDATE_HELP_RESOURCE_IN_STORE = "UPDATE_HELP_RESOURCE_IN_STORE";
const DELETE_HELP_FROM_STORE = "DELETE_HELP_FROM_STORE";

export const loading = isLoading => ({type: LOADING_ALL_HELPS, isLoading});
export const loadingFailure = error => ({type: LOADING_ALL_HELPS_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ALL_HELPS_FAILURE});
export const setAllHelps = helps => ({type: SET_ALL_HELPS, payload: helps});

export const updating = isUpdating => ({type: UPDATING_HELP, isUpdating});
export const updatingFailure = error => ({type: UPDATING_HELP_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_HELP_FAILURE});

export const clearAllHelpsFailures = () => ({type: CLEAR_ALL_HELPS_FAILURES});

export const addHelpInStore = help => ({type: ADD_HELP_IN_STORE, payload: help});
export const updateHelpInStore = help => ({type: UPDATE_HELP_IN_STORE, payload: help});
export const updateHelpNameInStore = (helpId, name) => ({type: UPDATE_HELP_NAME_IN_STORE, helpId, name});
export const updateHelpTextInStore = (helpId, help) => ({type: UPDATE_HELP_TEXT_IN_STORE, helpId, help});
export const updateHelpResourceInStore = (helpId, resource) => ({type: UPDATE_HELP_TEXT_IN_STORE, helpId, resource});
export const deleteHelpFromStore = helpId => ({type: DELETE_HELP_FROM_STORE, helpId});

export const updateHelpName = (helpId, name) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        helpsAPI.updateHelpName(helpId, name).then(() => {
            dispatch(updateHelpNameInStore(helpId, name));
        }).catch(e => {
            console.log("Failed to update helps URL: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to update helps URL: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(updating(false)));
    }
}

export const updateHelpText = (helpId, help) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        helpsAPI.updateHelpText(helpId, help).then(() => {
            dispatch(updateHelpTextInStore(helpId, help));
        }).catch(e => {
            console.log("Failed to update helps text: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to update helps text: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(updating(false)));
    }
}

export const updateHelpResource = (helpId, resource) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        helpsAPI.updateHelpResource(helpId, resource).then(() => {
            dispatch(updateHelpResourceInStore(helpId, resource));
        }).catch(e => {
            console.log("Failed to update helps resource: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to update helps resource: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteHelp = helpId => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        helpsAPI.deleteHelp(helpId).then(() => {
            dispatch(deleteHelpFromStore(helpId));
        }).catch(e => {
            console.log("Failed to delete help: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to delete help: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(updating(false)));
    }
}

//-----------------------------------------------------Table------------------------------------------------------------

export const getAllHelpsByDepartment = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        helpsAPI.fetchAllHelpsByDepartmentForTable().then(result => {
            dispatch(setAllHelps(result.data));
        }).catch(e => {
            console.log("Failed to fetch all helps: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to fetch all helps: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}


