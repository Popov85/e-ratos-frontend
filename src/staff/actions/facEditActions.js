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

/**
 * 0-st - DTO, 1-st - Object
 * @param facArr
 * @returns {Function}
 */
export const saveFac = (facArr) => {
    return (dispatch) => {
        dispatch(clearFacState());
        dispatch(loading(true));
        facultiesAPI.saveFac(facArr[0]).then(result => {
            let genId = result.data;
            dispatch(addFacInStore(genId, facArr[1]));
            dispatch(loadingSuccess("Successfully added a faculty!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to save a fac!")));
        }).finally(() => dispatch(loading(false)));
    }
}

/**
 * 0-st - DTO, 1-st - Object
 * @param facArr
 * @returns {Function}
 */
export const updateFac = (facArr) => {
    return (dispatch) => {
        dispatch(clearFacState());
        dispatch(loading(true));
        facultiesAPI.updateFac(facArr[0]).then(result => {
            dispatch(updateFacInStore(facArr[1]));
            dispatch(loadingSuccess("Successfully updated the faculty!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to update the fac!")));
        }).finally(() => dispatch(loading(false)));
    }
}
