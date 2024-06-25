import {gradingFourPointAPI} from "../_api/gradingFourPointAPI";

const SET_ALL_FOURS = "SET_ALL_FOURS";

const PROCESSING_FOUR = "PROCESSING_FOUR";
const PROCESSING_FOUR_FAILURE = "PROCESSING_FOUR_FAILURE";
const PROCESSING_FOUR_SUCCESS = "PROCESSING_FOUR_SUCCESS";
const CLEAR_PROCESSING_FOUR_FAILURE = "CLEAR_PROCESSING_FOUR_FAILURE";

const ADD_FOUR_IN_STORE = "ADD_FOUR_IN_STORE";
const UPDATE_FOUR_IN_STORE = "UPDATE_FOUR_IN_STORE";
const DELETE_FOUR_FROM_STORE = "DELETE_FOUR_FROM_STORE";

export const processing = isProcessing => ({type: PROCESSING_FOUR, isProcessing});
export const processingFailure = error => ({type: PROCESSING_FOUR_FAILURE, error});
export const processingSuccess = message => ({type: PROCESSING_FOUR_SUCCESS, message});
export const clearProcessingFailure = () => ({type: CLEAR_PROCESSING_FOUR_FAILURE});

export const setAllFours = fours => ({type: SET_ALL_FOURS, payload: fours});
export const addFourInStore = four => ({type: ADD_FOUR_IN_STORE, payload: four});
export const updateFourInStore = four => ({type: UPDATE_FOUR_IN_STORE, payload: four});
export const deleteFourFromStore = fourId => ({type: DELETE_FOUR_FROM_STORE, fourId});


export const saveFour = fourDTO => {
    return (dispatch) => {
        dispatch(clearProcessingFailure());
        dispatch(processing(true));
        gradingFourPointAPI.saveGradingFourPointDTO(fourDTO).then(result => {
            dispatch(addFourInStore(result.data));
            dispatch(processingSuccess("Successfully added a grading four point!"));
        }).catch(e => {
            console.log("Failed to add a grading four point: ", e.response ? e.response.data : 'no server message!');
            dispatch(processingFailure(new Error(`Failed to add a grading four point: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(processing(false)));
    }
}

export const updateFour = fourDTO => {
    return (dispatch) => {
        dispatch(clearProcessingFailure());
        dispatch(processing(true));
        gradingFourPointAPI.updateGradingFourPointDTO(fourDTO).then(result => {
            dispatch(updateFourInStore(result.data));
            dispatch(processingSuccess("Successfully updated the grading four point!"));
        }).catch(e => {
            console.log("Failed to update a grading four point: ", e.response ? e.response.data : 'no server message!');
            dispatch(processingFailure(new Error(`Failed to add a grading four point: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(processing(false)));
    }
}

export const deleteFour = fourId => {
    return (dispatch) => {
        dispatch(clearProcessingFailure());
        dispatch(processing(true));
        gradingFourPointAPI.deleteGradingFourPointDTO(fourId).then(() => {
            dispatch(deleteFourFromStore(fourId));
            dispatch(processingSuccess("Successfully deleted the grading four point!"));
        }).catch(e => {
            console.log("Failed to delete a grading four point: ", e.response ? e.response.data : 'no server message!');
            dispatch(processingFailure(new Error(`Failed to delete a grading four point: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(processing(false)));
    }
}