import {lmsAPI} from "../_api/lmsAPI";
import {addLMSInStore, updateLMSInStore} from "./lmsActions";

const SAVING_LMS = "SAVING_LMS";
const SAVING_LMS_FAILURE = "SAVING_LMS_FAILURE";
const SAVING_LMS_SUCCESS = "SAVING_LMS_SUCCESS";
const CLEAR_SAVING_LMS = "CLEAR_SAVING_LMS";

export const loading = isLoading => ({type: SAVING_LMS, isLoading});
export const loadingFailure = error => ({type: SAVING_LMS_FAILURE, error});
export const loadingSuccess = message => ({type: SAVING_LMS_SUCCESS, message});
export const clearLMSState = () => ({type: CLEAR_SAVING_LMS});

export const saveLMS = lmsDTO => {
    return (dispatch) => {
        dispatch(clearLMSState());
        dispatch(loading(true));
        lmsAPI.saveLMS(lmsDTO).then(result => {
            dispatch(addLMSInStore(result.data));
            dispatch(loadingSuccess("Successfully added an LMS!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to save an LMS!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateLMS = lmsDTO => {
    return (dispatch) => {
        dispatch(clearLMSState());
        dispatch(loading(true));
        lmsAPI.updateLMS(lmsDTO).then(result => {
            dispatch(updateLMSInStore(result.data));
            dispatch(loadingSuccess("Successfully updated the LMS!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to update the LMS!")));
        }).finally(() => dispatch(loading(false)));
    }
}

