import {reportsAPI} from "../_api/reportsAPI";

const LOADING_REPORT_ON_CONTENT = "LOADING_REPORT_ON_CONTENT";
const LOADING_REPORT_ON_CONTENT_FAILURE = "LOADING_REPORT_ON_CONTENT_FAILURE";
const VALIDATION_REPORT_ON_CONTENT_FAILURE = "VALIDATION_REPORT_ON_CONTENT_FAILURE";
const CLEAR_LOADING_REPORT_ON_CONTENT = "CLEAR_LOADING_REPORT_ON_CONTENT";
const SET_REPORT_ON_CONTENT = "SET_REPORT_ON_CONTENT";


export const loading = isLoading => ({type: LOADING_REPORT_ON_CONTENT, isLoading});
export const loadingFailure = error => ({type: LOADING_REPORT_ON_CONTENT_FAILURE, error});
export const validationFailure = validationErrorMessage => ({type: VALIDATION_REPORT_ON_CONTENT_FAILURE, validationErrorMessage});

export const clearReportOnContent = () => ({type: CLEAR_LOADING_REPORT_ON_CONTENT});

export const setReportOnContent = (requestedColumns, report) => ({type: SET_REPORT_ON_CONTENT, requestedColumns, payload: report});


export const getReportOnContent = (requestedColumns) => {
    return (dispatch) => {
        dispatch(clearReportOnContent());
        dispatch(loading(true));
        reportsAPI.fetchReportOnContent(requestedColumns).then(result => {
            dispatch(setReportOnContent(requestedColumns, result.data));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to create report on content")));
        }).finally(() => dispatch(loading(false)));
    }
}