import {lmsAPI} from "../_api/lmsAPI";

const LOADING_ALL_LMS = "LOADING_ALL_LMS";
const LOADING_ALL_LMS_FAILURE = "LOADING_ALL_LMS_FAILURE";
const CLEAR_LOADING_ALL_LMS_FAILURE = "CLEAR_LOADING_ALL_LMS_FAILURE";
const SET_ALL_LMS= "SET_ALL_LMS";
const SET_ALL_LMS_MIN= "SET_ALL_LMS_MIN";

const UPDATING_LMS = "UPDATING_LMS";
const UPDATING_LMS_FAILURE = "UPDATING_LMS_FAILURE";
const CLEAR_UPDATING_LMS_FAILURE = "CLEAR_UPDATING_LMS_FAILURE";

const CLEAR_ALL_LMS_FAILURES = "CLEAR_ALL_LMS_FAILURES";

const ADD_LMS_IN_STORE = "ADD_LMS_IN_STORE";
const UPDATE_LMS_IN_STORE = "UPDATE_LMS_IN_STORE";
const UPDATE_LMS_NAME_IN_STORE = "UPDATE_LMS_NAME_IN_STORE";
const DELETE_LMS_FROM_STORE = "DELETE_LMS_FROM_STORE";

export const loading = isLoading => ({type: LOADING_ALL_LMS, isLoading});
export const loadingFailure = error => ({type: LOADING_ALL_LMS_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ALL_LMS_FAILURE});
export const setAllLMSes = lmses => ({type: SET_ALL_LMS, payload: lmses});
export const setAllLMSesMin = lmses => ({type: SET_ALL_LMS_MIN, payload: lmses});

export const updating = isUpdating => ({type: UPDATING_LMS, isUpdating});
export const updatingFailure = error => ({type: UPDATING_LMS_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_LMS_FAILURE});

export const clearAllLMSFailures = () => ({type: CLEAR_ALL_LMS_FAILURES});

export const addLMSInStore = lms => ({type: ADD_LMS_IN_STORE, payload: lms});
export const updateLMSInStore = lms => ({type: UPDATE_LMS_IN_STORE, payload: lms});
export const updateLMSNameInStore = (lmsId, name) => ({type: UPDATE_LMS_NAME_IN_STORE, lmsId, name});
export const deleteLMSFromStore = lmsId => ({type: DELETE_LMS_FROM_STORE, lmsId});

export const updateLMSName = (lmsId, name) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        lmsAPI.updateLMSName(lmsId, name).then(() => {
            dispatch(updateLMSNameInStore(lmsId, name));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update LMS's name")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteLMS = lmsId => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        lmsAPI.deleteLMS(lmsId).then(() => {
            dispatch(deleteLMSFromStore(lmsId));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to delete LMS!")));
        }).finally(() => dispatch(updating(false)));
    }
}

//--------------------------------------------------Drop down-----------------------------------------------------------

export const getLMSesByOrganisationForDropDown = () => {
    return (dispatch) => {
        lmsAPI.fetchAllLMSByOrganisationForDropDown().then(result => {
            dispatch(setAllLMSesMin(result.data));
        }).catch(e => {
            console.log("Error fetching LMSes!", e);
        });
    }
}

//-----------------------------------------------------Table------------------------------------------------------------

export const getAllLMSByOrganisation = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        lmsAPI.fetchAllLMSByOrganisationForTable().then(result => {
            dispatch(setAllLMSes(result.data));
        }).catch(e => {
            console.log("Error fetching all org. LMS-es!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all org. LMS-es")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllLMSByOrganisationId = orgId => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        lmsAPI.fetchAllLMSByOrganisationIdForTable(orgId).then(result => {
            dispatch(setAllLMSes(result.data));
        }).catch(e => {
            console.log("Error fetching all org. LMS-es!", e);
            dispatch(loadingFailure(new Error(`Failed to fetch all LMS-es, orgId = ${orgId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}