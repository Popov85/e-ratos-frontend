import {resourcesAPI} from "../_api/resourcesAPI";

const LOADING_ALL_RESOURCES = "LOADING_ALL_RESOURCES";
const LOADING_ALL_RESOURCES_FAILURE = "LOADING_ALL_RESOURCES_FAILURE";
const CLEAR_LOADING_ALL_RESOURCES_FAILURE = "CLEAR_LOADING_ALL_RESOURCES_FAILURE";
const SET_ALL_RESOURCES = "SET_ALL_RESOURCES";

const UPDATING_RESOURCE = "UPDATING_RESOURCE";
const UPDATING_RESOURCE_FAILURE = "UPDATING_RESOURCE_FAILURE";
const CLEAR_UPDATING_RESOURCE_FAILURE = "CLEAR_UPDATING_RESOURCE_FAILURE";

const CLEAR_ALL_RESOURCES_FAILURES = "CLEAR_ALL_RESOURCES_FAILURES";

const ADD_RESOURCE_IN_STORE = "ADD_RESOURCE_IN_STORE";
const UPDATE_RESOURCE_IN_STORE = "UPDATE_RESOURCE_IN_STORE";
const UPDATE_RESOURCE_URL_IN_STORE = "UPDATE_RESOURCE_URL_IN_STORE";
const UPDATE_RESOURCE_DESCRIPTION_IN_STORE = "UPDATE_RESOURCE_DESCRIPTION_IN_STORE";
const DELETE_RESOURCE_FROM_STORE = "DELETE_RESOURCE_FROM_STORE";

export const loading = isLoading => ({type: LOADING_ALL_RESOURCES, isLoading});
export const loadingFailure = error => ({type: LOADING_ALL_RESOURCES_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ALL_RESOURCES_FAILURE});
export const setAllResources = resources => ({type: SET_ALL_RESOURCES, payload: resources});

export const updating = isUpdating => ({type: UPDATING_RESOURCE, isUpdating});
export const updatingFailure = error => ({type: UPDATING_RESOURCE_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_RESOURCE_FAILURE});

export const clearAllResourcesFailures = () => ({type: CLEAR_ALL_RESOURCES_FAILURES});

export const addResourceInStore = resource => ({type: ADD_RESOURCE_IN_STORE, payload: resource});
export const updateResourceInStore = resource => ({type: UPDATE_RESOURCE_IN_STORE, payload: resource});
export const updateResourceUrlInStore = (resId, link) => ({type: UPDATE_RESOURCE_URL_IN_STORE, resId, link});
export const updateResourceDescriptionInStore = (resId, description) => ({type: UPDATE_RESOURCE_DESCRIPTION_IN_STORE, resId, description});
export const deleteResourceFromStore = resId => ({type: DELETE_RESOURCE_FROM_STORE, resId});

export const updateResourceUrl = (resId, url) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        resourcesAPI.updateResourceUrl(resId, url).then(() => {
            dispatch(updateResourceUrlInStore(resId, url));
        }).catch(e => {
            console.log("Failed to update resources URL: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to update resources URL: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(updating(false)));
    }
}

export const updateResourceDescription = (resId, description) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        resourcesAPI.updateResourceDescription(resId, description).then(() => {
            dispatch(updateResourceDescriptionInStore(resId, description));
        }).catch(e => {
            console.log("Failed to update resources description: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to update resources description: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteResource = resId => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        resourcesAPI.deleteResource(resId).then(() => {
            dispatch(deleteResourceFromStore(resId));
        }).catch(e => {
            console.log("Failed to delete resources: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to delete resource: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(updating(false)));
    }
}

//-----------------------------------------------------Table------------------------------------------------------------

export const getAllResourcesByDepartment = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        resourcesAPI.fetchAllResourcesByDepartmentForTable().then(result => {
            dispatch(setAllResources(result.data));
        }).catch(e => {
            console.log("Failed to fetch all resources: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to fetch all resources: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}


