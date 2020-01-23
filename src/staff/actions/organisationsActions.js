import {organisationsAPI} from "../_api/organisationsAPI";

const LOADING_ALL_ORG = "LOADING_ALL_ORG";
const LOADING_ALL_ORG_FAILURE = "LOADING_ALL_ORG_FAILURE";
const CLEAR_LOADING_ALL_ORG_FAILURE = "CLEAR_LOADING_ALL_ORG_FAILURE";
const SET_ALL_ORG = "SET_ALL_ORG";

const SET_ORG_SELECTED = "SET_ORG_SELECTED";
const CLEAR_ORG_SELECTED = "CLEAR_ORG_SELECTED";

const ADD_ORG_IN_STORE = "ADD_ORG_IN_STORE";

const UPDATING_ORG = "UPDATING_ORG";
const UPDATING_ORG_FAILURE = "UPDATING_ORG_FAILURE";
const CLEAR_UPDATING_ORG_FAILURE = "CLEAR_UPDATING_ORG_FAILURE";

const CLEAR_ALL_ORG_FAILURES = "CLEAR_ALL_ORG_FAILURES";

const UPDATE_ORG_IN_STORE = "UPDATE_ORG_IN_STORE";
const UPDATE_ORG_NAME_IN_STORE = "UPDATE_ORG_NAME_IN_STORE";
const DELETE_ORG_FROM_STORE = "DELETE_ORG_FROM_STORE";

export const loading = isLoading => ({type: LOADING_ALL_ORG, isLoading});
export const loadingFailure = error => ({type: LOADING_ALL_ORG_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ALL_ORG_FAILURE});
export const setAllOrg = org => ({type: SET_ALL_ORG, payload: org});

export const setOrgIdSelected = orgId => ({type: SET_ORG_SELECTED, payload: orgId});
export const clearOrgIdSelected = () => ({type: CLEAR_ORG_SELECTED});

export const updating = isUpdating => ({type: UPDATING_ORG, isUpdating});
export const updatingFailure = error => ({type: UPDATING_ORG_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_ORG_FAILURE});

export const clearAllOrgFailures = () => ({type: CLEAR_ALL_ORG_FAILURES});

export const addOrgInStore = org => ({type: ADD_ORG_IN_STORE, payload: org});
export const updateOrgInStore = org => ({type: UPDATE_ORG_IN_STORE, payload: org});
export const updateOrgNameInStore = (orgId, name) => ({type: UPDATE_ORG_NAME_IN_STORE, orgId, name});
export const deleteOrgFromStore = orgId => ({type: DELETE_ORG_FROM_STORE, orgId});

export const updateOrgName = (orgId, name) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        organisationsAPI.updateOrgName(orgId, name).then(() => {
            dispatch(updateOrgNameInStore(orgId, name));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update org.'s name")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteOrg = (orgId) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        organisationsAPI.deleteOrg(orgId).then(() => {
            dispatch(deleteOrgFromStore(orgId));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to delete org.'s")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const getAllOrganisations = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        organisationsAPI.fetchAllOrganisationsForDropDown().then(result => {
            dispatch(setAllOrg(result.data));
        }).catch(e => {
            console.log("Error fetching all organisations!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all organisations")));
        }).finally(() => dispatch(loading(false)));
    }
}