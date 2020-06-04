import {settingsAPI} from "../_api/settingsAPI";

const LOADING_ALL_SETTINGS = "LOADING_ALL_SETTINGS";
const LOADING_ALL_SETTINGS_FAILURE = "LOADING_ALL_SETTINGS_FAILURE";
const CLEAR_LOADING_ALL_SETTINGS_FAILURE = "CLEAR_LOADING_ALL_SETTINGS_FAILURE";
const SET_ALL_SETTINGS = "SET_ALL_SETTINGS";

const UPDATING_SETTINGS = "UPDATING_SETTINGS";
const UPDATING_SETTINGS_FAILURE = "UPDATING_SETTINGS_FAILURE";
const CLEAR_UPDATING_SETTINGS_FAILURE = "CLEAR_UPDATING_SETTINGS_FAILURE";

const CLEAR_ALL_SETTINGS_FAILURES = "CLEAR_ALL_SETTINGS_FAILURES";

const ADD_SETTINGS_IN_STORE = "ADD_SETTINGS_IN_STORE";
const UPDATE_SETTINGS_IN_STORE = "UPDATE_SETTINGS_IN_STORE";
const UPDATE_SETTINGS_NAME_IN_STORE = "UPDATE_SETTINGS_NAME_IN_STORE";
const DELETE_SETTINGS_FROM_STORE = "DELETE_SETTINGS_FROM_STORE";

export const loading = isLoading => ({type: LOADING_ALL_SETTINGS, isLoading});
export const loadingFailure = error => ({type: LOADING_ALL_SETTINGS_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ALL_SETTINGS_FAILURE});
export const setAllSettings = settings => ({type: SET_ALL_SETTINGS, payload: settings});

export const updating = isUpdating => ({type: UPDATING_SETTINGS, isUpdating});
export const updatingFailure = error => ({type: UPDATING_SETTINGS_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_SETTINGS_FAILURE});

export const clearAllSettingsFailures = () => ({type: CLEAR_ALL_SETTINGS_FAILURES});

export const addSettingsInStore = settings => ({type: ADD_SETTINGS_IN_STORE, payload: settings});
export const updateSettingsInStore = settings => ({type: UPDATE_SETTINGS_IN_STORE, payload: settings});
export const updateSettingsNameInStore = (settingsId, name) => ({type: UPDATE_SETTINGS_NAME_IN_STORE, settingsId, name});
export const deleteSettingsFromStore = settingsId => ({type: DELETE_SETTINGS_FROM_STORE, settingsId});

/*export const updateSettingsName = (settingsId, name) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        settingsAPI.updateSettingsName(settingsId, name).then(() => {
            dispatch(updateSettingsNameInStore(settingsId, name));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update settings's name")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteSettings = settingsId => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        settingsAPI.deleteSettings(settingsId).then(() => {
            dispatch(deleteSettingsFromStore(settingsId));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to delete settings!")));
        }).finally(() => dispatch(updating(false)));
    }
}

//-----------------------------------------------------Table------------------------------------------------------------

// For higher admin!
export const getAllSettingsByDepartmentId = depId => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        settingsAPI.fetchAllSettingsByDepartmentIdForTable(depId).then(result => {
            dispatch(setAllSettings(result.data));
        }).catch(e => {
            console.log("Error fetching all dep. settings!", e);
            dispatch(loadingFailure(new Error(`Failed to fetch all settings, depId = ${depId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}*/

export const getAllSettingsByDepartmentWithDefault = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        settingsAPI.fetchAllSettingsByDepartmentWithDefault().then(result => {
            dispatch(setAllSettings(result.data));
        }).catch(e => {
            console.log("Error fetching all dep. settings!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all dep settings!")));
        }).finally(() => dispatch(loading(false)));
    }
}


