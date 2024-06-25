import {resourcesAPI} from "../_api/resourcesAPI";
import {addResourceInStore, updateResourceInStore} from "./resourcesActions";

const SAVING_RESOURCE = "SAVING_RESOURCE";
const SAVING_RESOURCE_FAILURE = "SAVING_RESOURCE_FAILURE";
const SAVING_RESOURCE_SUCCESS = "SAVING_RESOURCE_SUCCESS";
const CLEAR_SAVING_RESOURCE= "CLEAR_SAVING_RESOURCE";

export const loading = isLoading => ({type: SAVING_RESOURCE, isLoading});
export const loadingFailure = error => ({type: SAVING_RESOURCE_FAILURE, error});
export const loadingSuccess = message => ({type: SAVING_RESOURCE_SUCCESS, message});
export const clearResourceState = () => ({type: CLEAR_SAVING_RESOURCE});

export const saveResource = resourceDTO => {
    return (dispatch) => {
        dispatch(clearResourceState());
        dispatch(loading(true));
        resourcesAPI.saveResource(resourceDTO).then(result => {
            dispatch(addResourceInStore(result.data));
            dispatch(loadingSuccess("Successfully added a resource!"));
        }).catch(e => {
            console.log("Failed to add a resources: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to add a resource: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateResource = resourceDTO => {
    return (dispatch) => {
        dispatch(clearResourceState());
        dispatch(loading(true));
        resourcesAPI.updateResource(resourceDTO).then(result => {
            dispatch(updateResourceInStore(result.data));
            dispatch(loadingSuccess("Successfully updated the resource!"));
        }).catch(e => {
            console.log("Failed to update a resources: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to update a resource: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

