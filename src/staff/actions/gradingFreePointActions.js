import {gradingFreePointAPI} from "../_api/gradingFreePointAPI";

const SET_ALL_FREES = "SET_ALL_FREES";

const PROCESSING_FREE = "PROCESSING_FREE";
const PROCESSING_FREE_FAILURE = "PROCESSING_FREE_FAILURE";
const PROCESSING_FREE_SUCCESS = "PROCESSING_FREE_SUCCESS";
const CLEAR_PROCESSING_FREE_FAILURE = "CLEAR_PROCESSING_FREE_FAILURE";

const ADD_FREE_IN_STORE = "ADD_FREE_IN_STORE";
const UPDATE_FREE_IN_STORE = "UPDATE_FREE_IN_STORE";
const DELETE_FREE_FROM_STORE = "DELETE_FREE_FROM_STORE";

export const processing = isProcessing => ({type: PROCESSING_FREE, isProcessing});
export const processingFailure = error => ({type: PROCESSING_FREE_FAILURE, error});
export const processingSuccess = message => ({type: PROCESSING_FREE_SUCCESS, message});
export const clearProcessingFailure = () => ({type: CLEAR_PROCESSING_FREE_FAILURE});

export const setAllFrees = frees => ({type: SET_ALL_FREES, payload: frees});
export const addFreeInStore = free => ({type: ADD_FREE_IN_STORE, payload: free});
export const updateFreeInStore = free => ({type: UPDATE_FREE_IN_STORE, payload: free});
export const deleteFreeFromStore = freeId => ({type: DELETE_FREE_FROM_STORE, freeId});


export const saveFree = freeDTO => {
    return (dispatch) => {
        dispatch(clearProcessingFailure());
        dispatch(processing(true));
        gradingFreePointAPI.saveGradingFreePointDTO(freeDTO).then(result => {
            dispatch(addFreeInStore(result.data));
            dispatch(processingSuccess("Successfully added a grading free point!"));
        }).catch(e => {
            console.log("Failed to add a grading free point: ", e.response ? e.response.data : 'no server message!');
            dispatch(processingFailure(new Error(`Failed to add a grading free point: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(processing(false)));
    }
}

export const updateFree = freeDTO => {
    return (dispatch) => {
        dispatch(clearProcessingFailure());
        dispatch(processing(true));
        gradingFreePointAPI.updateGradingFreePointDTO(freeDTO).then(result => {
            dispatch(updateFreeInStore(result.data));
            dispatch(processingSuccess("Successfully updated the grading free point!"));
        }).catch(e => {
            console.log("Failed to update a grading free point: ", e.response ? e.response.data : 'no server message!');
            dispatch(processingFailure(new Error(`Failed to add a grading free point: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(processing(false)));
    }
}

export const deleteFree = freeId => {
    return (dispatch) => {
        dispatch(clearProcessingFailure());
        dispatch(processing(true));
        gradingFreePointAPI.deleteGradingFreePointDTO(freeId).then(() => {
            dispatch(deleteFreeFromStore(freeId));
            dispatch(processingSuccess("Successfully deleted the grading free point!"));
        }).catch(e => {
            console.log("Failed to delete a grading free point: ", e.response ? e.response.data : 'no server message!');
            dispatch(processingFailure(new Error(`Failed to delete a grading free point: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(processing(false)));
    }
}