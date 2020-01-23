import {facultiesAPI} from "../_api/facultiesAPI";
import {setAllOrg} from "./organisationsActions";
import {organisationsAPI} from "../_api/organisationsAPI";

const LOADING_ALL_FAC = "LOADING_ALL_FAC";
const LOADING_ALL_FAC_FAILURE = "LOADING_ALL_FAC_FAILURE";
const CLEAR_LOADING_ALL_FAC_FAILURE = "CLEAR_LOADING_ALL_FAC_FAILURE";
const SET_ALL_FAC = "SET_ALL_FAC";

const UPDATING_FAC = "UPDATING_FAC";
const UPDATING_FAC_FAILURE = "UPDATING_FAC_FAILURE";
const CLEAR_UPDATING_FAC_FAILURE = "CLEAR_UPDATING_FAC_FAILURE";

const CLEAR_ALL_FAC_FAILURES = "CLEAR_ALL_FAC_FAILURES";

const ADD_FAC_IN_STORE = "ADD_FAC_IN_STORE";
const UPDATE_FAC_IN_STORE = "UPDATE_FAC_IN_STORE";
const UPDATE_FAC_NAME_IN_STORE = "UPDATE_FAC_NAME_IN_STORE";
const DELETE_FAC_FROM_STORE = "DELETE_FAC_FROM_STORE";

export const loading = isLoading => ({type: LOADING_ALL_FAC, isLoading});
export const loadingFailure = error => ({type: LOADING_ALL_FAC_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ALL_FAC_FAILURE});
export const setAllFac = allFac => ({type: SET_ALL_FAC, payload: allFac});

export const updating = isUpdating => ({type: UPDATING_FAC, isUpdating});
export const updatingFailure = error => ({type: UPDATING_FAC_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_FAC_FAILURE});

export const clearAllFacFailures = () => ({type: CLEAR_ALL_FAC_FAILURES});

export const addFacInStore = fac => ({type: ADD_FAC_IN_STORE, payload: fac});
export const updateFacInStore = fac => ({type: UPDATE_FAC_IN_STORE, payload: fac});
export const updateFacNameInStore = (facId, name) => ({type: UPDATE_FAC_NAME_IN_STORE, facId, name});
export const deleteFacFromStore = (facId) => ({type: DELETE_FAC_FROM_STORE, facId});

export const updateFacName = (facId, name) => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        facultiesAPI.updateFacName(facId, name).then(() => {
            dispatch(updateFacNameInStore(facId, name));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to update fac.'s name")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const deleteFac = facId => {
    return (dispatch) => {
        dispatch(clearUpdatingFailure());
        dispatch(updating(true));
        facultiesAPI.deleteFac(facId).then(() => {
            dispatch(deleteFacFromStore(facId));
        }).catch(e => {
            dispatch(updatingFailure(new Error("Failed to delete fac.")));
        }).finally(() => dispatch(updating(false)));
    }
}

export const getAllFacultiesByOrganisation = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        facultiesAPI.fetchAllFacultiesByOrganisationForTable().then(result => {
            dispatch(setAllFac(result.data));
        }).catch(e => {
            console.log("Error fetching all org's faculties'!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all org's faculties")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllFacultiesBunchByRatos = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        Promise.all([
            facultiesAPI.fetchAllFacultiesByRatosForTable(),
            organisationsAPI.fetchAllOrganisationsForDropDown()
        ]).then(bunch => {
            dispatch(setAllOrg(bunch[1].data));
            dispatch(setAllFac(bunch[0].data));
        }).catch(e => {
            console.log("Error fetching all Ratos' faculties'!", e);
            dispatch(loadingFailure(new Error("Failed to fetch all Ratos' faculties")));
        }).finally(() => dispatch(loading(false)));
    }
}