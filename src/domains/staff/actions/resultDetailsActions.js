import {resultDetailsAPI} from "../_api/resultDetailsAPI";
import {resultsAPI} from "../_api/resultsAPI";
import {setResult} from "./resultsActions";

const LOADING_RESULT_DETAILS = "LOADING_RESULT_DETAILS";
const LOADING_RESULT_DETAILS_FAILURE = "LOADING_RESULT_DETAILS_FAILURE";
const CLEAR_LOADING_RESULT_DETAILS_FAILURE = "CLEAR_LOADING_RESULT_DETAILS_FAILURE";
const CLEAR_ALL_RESULT_DETAILS_FAILURES = "CLEAR_ALL_RESULT_DETAILS_FAILURES";
const SET_RESULT_DETAILS = "SET_RESULT_DETAILS";

export const loading = isLoading => ({type: LOADING_RESULT_DETAILS, isLoading});
export const loadingFailure = error => ({type: LOADING_RESULT_DETAILS_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_RESULT_DETAILS_FAILURE});
export const clearAllResultDetailsFailures = () => ({type: CLEAR_ALL_RESULT_DETAILS_FAILURES});

export const setResultDetails = (resultId, resultDetails) => ({type: SET_RESULT_DETAILS, resultId,  payload: resultDetails});


export const getResult = resultId => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        Promise.all([
            resultsAPI.fetchResult(resultId),
            resultDetailsAPI.fetchResultDetails(resultId)
        ])
            .then(([result, resultDetails]) => {
                dispatch(setResult(resultId, result.data));
                dispatch(setResultDetails(resultId, resultDetails.data));
            })
            .catch(e => {
                console.log("Failed to fetch result or result details: ", e.response ? e.response.data : 'no server message!');
                dispatch(loadingFailure(new Error(`Failed to fetch result or result details: ${e.response ? e.response.data.message : 'no server message!'}`)));
            })
            .finally(() => {
                dispatch(loading(false));
            });
    }
}

export const getResultDetails = resultId => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        resultDetailsAPI.fetchResultDetails(resultId).then(result => {
            dispatch(setResultDetails(resultId, result.data));
        }).catch(e => {
            console.log("Failed to fetch result details: ", e.response ? e.response.data : 'no server message!');
            dispatch(loadingFailure(new Error(`Failed to fetch result details: ${e.response ? e.response.data.message : 'no server message!'}`)));
        }).finally(() => dispatch(loading(false)));
    }
}
