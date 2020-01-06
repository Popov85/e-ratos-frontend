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

export const saveOrg = (org) => {
    return (dispatch) => {
        dispatch(clearOrgState());
        dispatch(loading(true));
        organisationsAPI.saveOrg(org).then(result => {
            let genId = result.data;
            dispatch(addOrgInStore(genId, org));
            dispatch(loadingSuccess("Successfully added an org!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to save an org!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateOrg = (org) => {
    return (dispatch) => {
        dispatch(clearOrgState());
        dispatch(loading(true));
        organisationsAPI.updateOrg(org).then(() => {
            dispatch(updateOrgInStore(org));
            dispatch(loadingSuccess("Successfully updated the org!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to update the org!")));
        }).finally(() => dispatch(loading(false)));
    }
}
