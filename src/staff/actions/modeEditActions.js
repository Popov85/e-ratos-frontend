import {modesAPI} from "../_api/modesAPI";
import {addModeInStore, updateModeInStore} from "./modesActions";

const SAVING_MODE = "SAVING_MODE";
const SAVING_MODE_FAILURE = "SAVING_MODE_FAILURE";
const SAVING_MODE_SUCCESS = "SAVING_MODE_SUCCESS";
const CLEAR_SAVING_MODE= "CLEAR_SAVING_MODE";

export const loading = isLoading => ({type: SAVING_MODE, isLoading});
export const loadingFailure = error => ({type: SAVING_MODE_FAILURE, error});
export const loadingSuccess = message => ({type: SAVING_MODE_SUCCESS, message});
export const clearModeState = () => ({type: CLEAR_SAVING_MODE});

export const saveMode = modeDTO => {
    return (dispatch) => {
        dispatch(clearModeState());
        dispatch(loading(true));
        modesAPI.saveMode(modeDTO).then(result => {
            dispatch(addModeInStore(result.data));
            dispatch(loadingSuccess("Successfully added a mode!"));
        }).catch(e => {
            console.log("Failed to add a mode: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to add a mode: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateMode = modeDTO => {
    return (dispatch) => {
        dispatch(clearModeState());
        dispatch(loading(true));
        modesAPI.updateMode(modeDTO).then(result => {
            dispatch(updateModeInStore(result.data));
            dispatch(loadingSuccess("Successfully updated the mode!"));
        }).catch(e => {
            console.log("Failed to update a mode: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to update a mode: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

