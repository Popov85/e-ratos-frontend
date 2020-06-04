import {schemesAPI as schemeAPI, schemesAPI} from "../_api/schemesAPI";

const LOADING_ALL_SCHEMES = "LOADING_ALL_SCHEMES";
const LOADING_ALL_SCHEMES_FAILURE = "LOADING_ALL_SCHEMES_FAILURE";
const CLEAR_LOADING_ALL_SCHEMES_FAILURE = "CLEAR_LOADING_ALL_SCHEMES_FAILURE";
const SET_ALL_SCHEMES = "SET_ALL_SCHEMES";

const UPDATING_SCHEME = "UPDATING_SCHEME";
const UPDATING_SCHEME_FAILURE = "UPDATING_SCHEME_FAILURE";
const CLEAR_UPDATING_SCHEME_FAILURE = "CLEAR_UPDATING_SCHEME_FAILURE";
const CLEAR_ALL_SCHEMES_FAILURES = "CLEAR_ALL_SCHEMES_FAILURES";

const ADD_SCHEME_IN_STORE = "ADD_SCHEME_IN_STORE";
const UPDATE_SCHEME_IN_STORE = "UPDATE_SCHEME_IN_STORE";
const UPDATE_SCHEME_NAME_IN_STORE = "UPDATE_SCHEME_NAME_IN_STORE";
const UPDATE_SCHEME_IS_ACTIVE_IN_STORE = "UPDATE_SCHEME_IS_ACTIVE_IN_STORE";
const UPDATE_SCHEME_IS_LMS_ONLY_IN_STORE = "UPDATE_SCHEME_IS_LMS_ONLY_IN_STORE";
const DELETE_SCHEME_FROM_STORE = "DELETE_SCHEME_FROM_STORE";

export const loading = isLoading => ({type: LOADING_ALL_SCHEMES, isLoading});
export const loadingFailure = error => ({type: LOADING_ALL_SCHEMES_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ALL_SCHEMES_FAILURE});
export const setAllSchemes = schemes => ({type: SET_ALL_SCHEMES, payload: schemes});

export const updating = isUpdating => ({type: UPDATING_SCHEME, isUpdating});
export const updatingFailure = error => ({type: UPDATING_SCHEME_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_SCHEME_FAILURE});
export const clearAllSchemesFailures = () => ({type: CLEAR_ALL_SCHEMES_FAILURES});

export const addSchemeInStore = scheme => ({type: ADD_SCHEME_IN_STORE, payload: scheme});
export const updateSchemeInStore = scheme => ({type: UPDATE_SCHEME_IN_STORE, payload: scheme});
export const updateSchemeNameInStore = (schemeId, name) => ({type: UPDATE_SCHEME_NAME_IN_STORE, schemeId, name});
export const updateSchemeActiveInStore = (schemeId, isActive) => ({type: UPDATE_SCHEME_IS_ACTIVE_IN_STORE, schemeId, isActive});
export const updateSchemeLMSOnlyInStore = (schemeId, isLmsOnly) => ({type: UPDATE_SCHEME_IS_LMS_ONLY_IN_STORE, schemeId, isLmsOnly});
export const deleteSchemeFromStore = schemeId => ({type: DELETE_SCHEME_FROM_STORE, schemeId});

export const updateSchemeName = (schemeId, name) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        schemesAPI.updateSchemeName(schemeId, name).then(() => {
            dispatch(updateSchemeNameInStore(schemeId, name));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update scheme's name")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const updateSchemeActive = (schemeId, isActive) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        schemesAPI.updateSchemeActive(schemeId, isActive).then(() => {
            dispatch(updateSchemeActiveInStore(schemeId, isActive));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update scheme's isActive flag")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const updateSchemeLMSOnly = (schemeId, isLmsOnly) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        schemesAPI.updateSchemeLMSOnly(schemeId, isLmsOnly).then(() => {
            dispatch(updateSchemeLMSOnlyInStore(schemeId, isLmsOnly));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update scheme's isLmsOnly flag")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteScheme = schemeId => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        schemeAPI.deleteScheme(schemeId).then(() => {
            dispatch(deleteSchemeFromStore(schemeId));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to delete scheme!")));
        }).finally(() => dispatch(updating(false)));
    }
}

//-----------------------------------------------------Table------------------------------------------------------------
export const getAllSchemesByDepartment = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        schemesAPI.fetchAllSchemesByDepartmentForTable().then(result => {
            dispatch(setAllSchemes(result.data));
        }).catch(e => {
            console.log("Error fetching all dep. schemes!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all dep schemes")));
        }).finally(() => dispatch(loading(false)));
    }
}



