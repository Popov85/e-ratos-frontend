import {gradingTwoPointAPI} from "../_api/gradingTwoPointAPI";

const SET_ALL_TWOS = "SET_ALL_TWOS";

const PROCESSING_TWO = "PROCESSING_TWO";
const PROCESSING_TWO_FAILURE = "PROCESSING_TWO_FAILURE";
const PROCESSING_TWO_SUCCESS = "PROCESSING_TWO_SUCCESS";
const CLEAR_PROCESSING_TWO_FAILURE = "CLEAR_PROCESSING_TWO_FAILURE";

const ADD_TWO_IN_STORE = "ADD_TWO_IN_STORE";
const UPDATE_TWO_IN_STORE = "UPDATE_TWO_IN_STORE";
const DELETE_TWO_FROM_STORE = "DELETE_TWO_FROM_STORE";

export const processing = isProcessing => ({type: PROCESSING_TWO, isProcessing});
export const processingFailure = error => ({type: PROCESSING_TWO_FAILURE, error});
export const processingSuccess = message => ({type: PROCESSING_TWO_SUCCESS, message});
export const clearProcessingFailure = () => ({type: CLEAR_PROCESSING_TWO_FAILURE});

export const setAllTwos = twos => ({type: SET_ALL_TWOS, payload: twos});
export const addTwoInStore = two => ({type: ADD_TWO_IN_STORE, payload: two});
export const updateTwoInStore = two => ({type: UPDATE_TWO_IN_STORE, payload: two});
export const deleteTwoFromStore = twoId => ({type: DELETE_TWO_FROM_STORE, twoId});


export const saveTwo = twoDTO => {
    return (dispatch) => {
        dispatch(clearProcessingFailure());
        dispatch(processing(true));
        gradingTwoPointAPI.saveGradingTwoPointDTO(twoDTO).then(result => {
            dispatch(addTwoInStore(result.data));
            dispatch(processingSuccess("Successfully added a grading two point!"));
        }).catch(e => {
            console.log("Failed to add a grading two point: ", e.response ? e.response.data : 'no server message!');
            dispatch(processingFailure(new Error(`Failed to add a grading two point: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(processing(false)));
    }
}

export const updateTwo = twoDTO => {
    return (dispatch) => {
        dispatch(clearProcessingFailure());
        dispatch(processing(true));
        gradingTwoPointAPI.updateGradingTwoPointDTO(twoDTO).then(result => {
            dispatch(updateTwoInStore(result.data));
            dispatch(processingSuccess("Successfully updated the grading two point!"));
        }).catch(e => {
            console.log("Failed to update a grading two point: ", e.response ? e.response.data : 'no server message!');
            dispatch(processingFailure(new Error(`Failed to add a grading two point: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(processing(false)));
    }
}

export const deleteTwo = twoId => {
    return (dispatch) => {
        dispatch(clearProcessingFailure());
        dispatch(processing(true));
        gradingTwoPointAPI.deleteGradingTwoPointDTO(twoId).then(() => {
            dispatch(deleteTwoFromStore(twoId));
            dispatch(processingSuccess("Successfully deleted the grading two point!"));
        }).catch(e => {
            console.log("Failed to delete a grading two point: ", e.response ? e.response.data : 'no server message!');
            dispatch(processingFailure(new Error(`Failed to delete a grading two point: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(processing(false)));
    }
}