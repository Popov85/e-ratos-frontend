import {addDepInStore, updateDepInStore} from "./departmentsActions";
import {departmentsAPI} from "../_api/departmentsAPI";

const SAVING_DEP = "SAVING_DEP";
const SAVING_DEP_FAILURE = "SAVING_DEP_FAILURE";
const SAVING_DEP_SUCCESS = "SAVING_DEP_SUCCESS";
const CLEAR_SAVING_DEP= "CLEAR_SAVING_DEP";

export const loading = isLoading => ({type: SAVING_DEP, isLoading});
export const loadingFailure = error => ({type: SAVING_DEP_FAILURE, error});
export const loadingSuccess = message => ({type: SAVING_DEP_SUCCESS, message});
export const clearDepState = () => ({type: CLEAR_SAVING_DEP});

/**
 * 0-st - DTO, 1-st - Object
 * @param depArr
 * @returns {Function}
 */
export const saveDep = (depArr) => {
    return (dispatch) => {
        dispatch(clearDepState());
        dispatch(loading(true));
        departmentsAPI.saveDep(depArr[0]).then(result => {
            let genId = result.data;
            dispatch(addDepInStore(genId, depArr[1]));
            dispatch(loadingSuccess("Successfully added a department!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to save a department!")));
        }).finally(() => dispatch(loading(false)));
    }
}

/**
 * 0-st - DTO, 1-st - Object
 * @param depArr
 * @returns {Function}
 */
export const updateDep = (depArr) => {
    return (dispatch) => {
        dispatch(clearDepState());
        dispatch(loading(true));
        departmentsAPI.updateDep(depArr[0]).then(() => {
            dispatch(updateDepInStore(depArr[1]));
            dispatch(loadingSuccess("Successfully updated the department!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to update the department!")));
        }).finally(() => dispatch(loading(false)));
    }
}
