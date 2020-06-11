import {settingsAPI} from "../_api/settingsAPI";
import {addSettingsInStore, updateSettingsInStore} from "./settingsActions";

const SAVING_SETTINGS = "SAVING_SETTINGS";
const SAVING_SETTINGS_FAILURE = "SAVING_SETTINGS_FAILURE";
const SAVING_SETTINGS_SUCCESS = "SAVING_SETTINGS_SUCCESS";
const CLEAR_SAVING_SETTINGS= "CLEAR_SAVING_SETTINGS";

export const loading = isLoading => ({type: SAVING_SETTINGS, isLoading});
export const loadingFailure = error => ({type: SAVING_SETTINGS_FAILURE, error});
export const loadingSuccess = message => ({type: SAVING_SETTINGS_SUCCESS, message});
export const clearSettingsState = () => ({type: CLEAR_SAVING_SETTINGS});

export const saveSettings = settingsDTO => {
    return (dispatch) => {
        dispatch(clearSettingsState());
        dispatch(loading(true));
        settingsAPI.saveSettings(settingsDTO).then(result => {
            dispatch(addSettingsInStore(result.data));
            dispatch(loadingSuccess("Successfully added a settings!"));
        }).catch(e => {
            console.log("Failed to add a settings: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to add a settings: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateSettings = settingsDTO => {
    return (dispatch) => {
        dispatch(clearSettingsState());
        dispatch(loading(true));
        settingsAPI.updateSettings(settingsDTO).then(result => {
            dispatch(updateSettingsInStore(result.data));
            dispatch(loadingSuccess("Successfully updated the settings!"));
        }).catch(e => {
            console.log("Failed to update a settings: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to update a settings: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

