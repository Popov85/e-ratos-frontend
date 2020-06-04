import {modesAPI} from "../_api/modesAPI";

const LOADING_ALL_MODES = "LOADING_ALL_MODES";
const LOADING_ALL_MODES_FAILURE = "LOADING_ALL_MODES_FAILURE";
const CLEAR_LOADING_ALL_MODES_FAILURE = "CLEAR_LOADING_ALL_MODES_FAILURE";
const SET_ALL_MODES = "SET_ALL_MODES";

const UPDATING_MODE = "UPDATING_MODE";
const UPDATING_MODE_FAILURE = "UPDATING_MODE_FAILURE";
const CLEAR_UPDATING_MODE_FAILURE = "CLEAR_UPDATING_MODE_FAILURE";

const CLEAR_ALL_MODE_FAILURES = "CLEAR_ALL_MODE_FAILURES";

const ADD_MODE_IN_STORE = "ADD_MODE_IN_STORE";
const UPDATE_MODE_IN_STORE = "UPDATE_MODE_IN_STORE";
const UPDATE_MODE_NAME_IN_STORE = "UPDATE_MODE_NAME_IN_STORE";
const DELETE_MODE_FROM_STORE = "DELETE_MODE_FROM_STORE";

export const loading = isLoading => ({type: LOADING_ALL_MODES, isLoading});
export const loadingFailure = error => ({type: LOADING_ALL_MODES_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_ALL_MODES_FAILURE});
export const setAllModes = modes => ({type: SET_ALL_MODES, payload: modes});

export const updating = isUpdating => ({type: UPDATING_MODE, isUpdating});
export const updatingFailure = error => ({type: UPDATING_MODE_FAILURE, error});
export const clearUpdatingFailure = () => ({type: CLEAR_UPDATING_MODE_FAILURE});

export const clearAllModesFailures = () => ({type: CLEAR_ALL_MODE_FAILURES});

export const addModeInStore = mode => ({type: ADD_MODE_IN_STORE, payload: mode});
export const updateModeInStore = mode => ({type: UPDATE_MODE_IN_STORE, payload: mode});
export const updateModeNameInStore = (modeId, name) => ({type: UPDATE_MODE_NAME_IN_STORE, modeId, name});
export const deleteModeFromStore = modeId => ({type: DELETE_MODE_FROM_STORE, modeId});



//-----------------------------------------------------Table------------------------------------------------------------

/*export const getAllModesByDepartmentWithDefault = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        modesAPI.fetchAllModesByDepartmentWithDefault().then(result => {
            dispatch(setAllModes(result.data));
        }).catch(e => {
            console.log("Failed to load all the modes: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to load all the modes: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(updating(false)));
    }
}*/


