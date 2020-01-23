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


export const saveDep = depDTO => {
    return (dispatch) => {
        dispatch(clearDepState());
        dispatch(loading(true));
        departmentsAPI.saveDep(depDTO).then(result => {
            dispatch(addDepInStore(result.data));
            dispatch(loadingSuccess("Successfully added a department!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to save a department!")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const updateDep = depDTO => {
    return (dispatch) => {
        dispatch(clearDepState());
        dispatch(loading(true));
        departmentsAPI.updateDep(depDTO).then(result => {
            dispatch(updateDepInStore(result.data));
            dispatch(loadingSuccess("Successfully updated the department!"));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to update the department!")));
        }).finally(() => dispatch(loading(false)));
    }
}
