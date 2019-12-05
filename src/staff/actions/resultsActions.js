import {resultsAPI} from "../_api/resultsAPI";
import {coursesAPI} from "../_api/coursesAPI";
import {schemesAPI} from "../_api/schemesAPI";
import {facultiesAPI} from "../_api/facultiesAPI";
import {clearSelected, setSelected} from "./affiliationSelectorActions";


const LOADING_DEP_RESULTS = "LOADING_DEP_RESULTS";
const LOADING_DEP_RESULTS_FAILURE = "LOADING_DEP_RESULTS_FAILURE";
const CLEAR_LOADING_DEP_RESULTS_FAILURE = "CLEAR_LOADING_DEP_RESULTS_FAILURE";
const SET_DEP_RESULTS = "SET_DEP_RESULTS";
/**
 * This action is performed at the start of loading result table component,setExistingDepResultsFilterSchemes
 * in order to serve all the required data at once for it!
 * @type {string}
 */
const SET_DEP_RESULTS_BUNCH = "SET_DEP_RESULTS_BUNCH";

const SET_DEP_RESULTS_FILTER_SCHEMES = "SET_DEP_RESULTS_FILTER_SCHEMES";
const SET_EXISTING_DEP_RESULTS_FILTER_SCHEMES = "SET_EXISTING_DEP_RESULTS_FILTER_SCHEMES";


export const loading = isLoading => ({type: LOADING_DEP_RESULTS, isLoading});
export const loadingFailure = error => ({type: LOADING_DEP_RESULTS_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_DEP_RESULTS_FAILURE});
export const setDepResults = (results) => ({type: SET_DEP_RESULTS, payload: results});
export const setDepResultsBunch = (bunch) => ({type: SET_DEP_RESULTS_BUNCH, payload: bunch});

export const setDepResultsFilterSchemes = (key, schemes) => ({type: SET_DEP_RESULTS_FILTER_SCHEMES, key, payload: schemes});
export const setExistingDepResultsFilterSchemes = (key) => ({type: SET_EXISTING_DEP_RESULTS_FILTER_SCHEMES, key});



// For any dep staff {lab/inst/dep.admins}

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

// Used by any admin {fac/org/global}

export const getDepResultsAdmin = (depId, params) => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        resultsAPI.fetchDepResultsAdmin(depId, params).then(result => {
            dispatch(setDepResults(result.data));
        }).catch(e => {
            dispatch(loadingFailure(new Error(`Failed to fetch dep. results, depId = ${depId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getDepResultsWithSpecAdmin = (depId, params, spec) => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        resultsAPI.fetchDepResultsWithSpecAdmin(depId, params, spec).then(result => {
            dispatch(setDepResults(result.data));
        }).catch(e => {
            dispatch(loadingFailure(new Error(`Failed to fetch dep. results with spec, depId = ${depId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

//--------------------INIT all data (the whole bunch) for table ---------------

export const getAllDepResultsDataForTable=()=> {
    return dispatch => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        Promise.all([
            resultsAPI.fetchDepResults(),
            coursesAPI.fetchAllCoursesByDepartmentForDropDown(),
            schemesAPI.fetchAllSchemesForFilterByDepartment(),
            facultiesAPI.fetchAllFacultiesByOrganisationForDropDown()
        ]).then(result=> {
            dispatch(setDepResultsBunch(result));
            dispatch(clearSelected());
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to prepare data for results table!")));
        }).finally(() => dispatch(loading(false)));;
    }
}

export const getAllDepResultsDataForTableAdmin=(affiliation)=> {
    return dispatch => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        const {depId} = affiliation;
        Promise.all([
            resultsAPI.fetchDepResultsAdmin(depId),
            coursesAPI.fetchAllCoursesByDepartmentIdForDropDown(depId),
            schemesAPI.fetchAllSchemesForFilterByDepartmentId(depId),
            facultiesAPI.fetchAllFacultiesByOrganisationForDropDown()
        ]).then(result=> {
            dispatch(setDepResultsBunch(result));
            dispatch(setSelected(affiliation));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to prepare data for results table (admin)!")));
        }).finally(() => dispatch(loading(false)));;
    }
}

export const getAllDepResultsDataForTableGlobalAdmin=(affiliation)=> {
    return dispatch => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        const {orgId, depId} = affiliation;
        Promise.all([
            resultsAPI.fetchDepResultsAdmin(depId),
            coursesAPI.fetchAllCoursesByDepartmentIdForDropDown(depId),
            schemesAPI.fetchAllSchemesForFilterByDepartmentId(depId),
            facultiesAPI.fetchAllFacultiesByOrganisationIdForDropDown(orgId)
        ]).then(result=> {
            dispatch(setDepResultsBunch(result));
            dispatch(setSelected(affiliation));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to prepare data for results table (admin)!")));
        }).finally(() => dispatch(loading(false)));;
    }
}



export const getAllSchemesForDepResultsTableFilterByCourseId = (courseId) => {
    return (dispatch) => {
        schemesAPI.fetchAllSchemesForFilterByCourseId(courseId).then(result => {
            let schemes = result.data;
            dispatch(setDepResultsFilterSchemes(courseId, schemes));
        }).catch(e => {
            console.log("Error fetching course's schemes for filter!", e);
        });
    }
}