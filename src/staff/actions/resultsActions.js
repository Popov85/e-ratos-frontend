import {resultsAPI} from "../_api/resultsAPI";

const LOADING_DEP_RESULTS = "LOADING_DEP_RESULTS";
const LOADING_DEP_RESULTS_FAILURE = "LOADING_DEP_RESULTS_FAILURE";
const CLEAR_LOADING_DEP_RESULTS_FAILURE = "CLEAR_LOADING_DEP_RESULTS_FAILURE";
const SET_DEP_RESULTS = "SET_DEP_RESULTS";

export const loading = isLoading => ({type: LOADING_DEP_RESULTS, isLoading});
export const loadingFailure = error => ({type: LOADING_DEP_RESULTS_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_DEP_RESULTS_FAILURE});
export const setDepResults = (results) => ({type: SET_DEP_RESULTS, payload: results});

export const getDepResults = (params) => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        resultsAPI.fetchDepResults(params).then(result => {
            dispatch(setDepResults(result.data));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to fetch dep. results")));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getDepResultsWithSpec = (params, spec) => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        resultsAPI.fetchDepResultsWithSpec(params, spec).then(result => {
            dispatch(setDepResults(result.data));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to fetch dep. results with spec")));
        }).finally(() => dispatch(loading(false)));
    }
}
