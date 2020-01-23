import {organisationsAPI} from "../_api/organisationsAPI";
import {addOrgInStore, updateOrgInStore} from "./organisationsActions";

const SAVING_ORG = "SAVING_ORG";
const SAVING_ORG_FAILURE = "SAVING_ORG_FAILURE";
const SAVING_ORG_SUCCESS = "SAVING_ORG_SUCCESS";
const CLEAR_SAVING_ORG = "CLEAR_SAVING_ORG";

export const loading = isLoading => ({type: SAVING_ORG, isLoading});
export const loadingFailure = error => ({type: SAVING_ORG_FAILURE, error});
export const loadingSuccess = message => ({type: SAVING_ORG_SUCCESS, message});
export const clearOrgState = () => ({type: CLEAR_SAVING_ORG});

export const saveOrg = (orgDTO) => {
    return (dispatch) => {
        dispatch(clearOrgState());
        dispatch(loading(true));
        organisationsAPI.saveOrg(orgDTO).then(result => {
            dispatch(addOrgInStore(result.data));
            dispatch(loadingSuccess("Successfully added an org!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to save an org!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateOrg = (orgDTO) => {
    return (dispatch) => {
        dispatch(clearOrgState());
        dispatch(loading(true));
        organisationsAPI.updateOrg(orgDTO).then(result => {
            dispatch(updateOrgInStore(result.data));
            dispatch(loadingSuccess("Successfully updated the org!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to update the org!")));
        }).finally(() => dispatch(loading(false)));
    }
}
