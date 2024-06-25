import {facultiesAPI} from "../_api/facultiesAPI";
import {addFacInStore, updateFacInStore} from "./facultiesActions";

const SAVING_FAC = "SAVING_FAC";
const SAVING_FAC_FAILURE = "SAVING_FAC_FAILURE";
const SAVING_FAC_SUCCESS = "SAVING_FAC_SUCCESS";
const CLEAR_SAVING_FAC= "CLEAR_SAVING_FAC";

export const loading = isLoading => ({type: SAVING_FAC, isLoading});
export const loadingFailure = error => ({type: SAVING_FAC_FAILURE, error});
export const loadingSuccess = message => ({type: SAVING_FAC_SUCCESS, message});
export const clearFacState = () => ({type: CLEAR_SAVING_FAC});


export const saveFac = (facDTO) => {
    return (dispatch) => {
        dispatch(clearFacState());
        dispatch(loading(true));
        facultiesAPI.saveFac(facDTO).then(result => {
            dispatch(addFacInStore(result.data));
            dispatch(loadingSuccess("Successfully added a faculty!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to save a fac!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateFac = (facDTO) => {
    return (dispatch) => {
        dispatch(clearFacState());
        dispatch(loading(true));
        facultiesAPI.updateFac(facDTO).then(result => {
            dispatch(updateFacInStore(result.data));
            dispatch(loadingSuccess("Successfully updated the faculty!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to update the fac!")));
        }).finally(() => dispatch(loading(false)));
    }
}
