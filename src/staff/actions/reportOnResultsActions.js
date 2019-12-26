import {reportsAPI} from "../_api/reportsAPI";
import {organisationsAPI} from "../_api/organisationsAPI";
import {facultiesAPI} from "../_api/facultiesAPI";
import {departmentsAPI} from "../_api/departmentsAPI";
import {coursesAPI} from "../_api/coursesAPI";
import {schemesAPI} from "../_api/schemesAPI";

const LOADING_REPORT_ON_RESULTS = "LOADING_REPORT_ON_RESULTS";
const LOADING_REPORT_ON_RESULTS_FAILURE = "LOADING_REPORT_ON_RESULTS_FAILURE";
const VALIDATION_REPORT_ON_RESULTS_FAILURE = "VALIDATION_REPORT_ON_RESULTS_FAILURE";
const CLEAR_LOADING_REPORT_ON_RESULTS = "CLEAR_LOADING_REPORT_ON_RESULTS";
const SET_REPORT_ON_RESULTS = "SET_REPORT_ON_RESULTS";
const CLEAR_REPORT_ON_RESULTS = "CLEAR_REPORT_ON_RESULTS";

const LOADING_COMPONENT_OF_REPORT_ON_RESULTS = "LOADING_COMPONENT_OF_REPORT_ON_RESULTS";
const LOADING_COMPONENT_OF_REPORT_ON_RESULTS_FAILURE = "LOADING_COMPONENT_OF_REPORT_ON_RESULTS_FAILURE";
const CLEAR_LOADING_COMPONENT_OF_REPORT_ON_RESULTS_FAILURE = "CLEAR_LOADING_COMPONENT_OF_REPORT_ON_RESULTS_FAILURE";

const SET_ORGANISATIONS_FOR_REPORT_ON_RESULTS = "SET_ORGANISATIONS_FOR_REPORT_ON_RESULTS";
const SET_FACULTIES_FOR_REPORT_ON_RESULTS = "SET_FACULTIES_FOR_REPORT_ON_RESULTS";
const SET_DEPARTMENTS_FOR_REPORT_ON_RESULTS = "SET_DEPARTMENTS_FOR_REPORT_ON_RESULTS";
const SET_COURSES_FOR_REPORT_ON_RESULTS = "SET_COURSES_FOR_REPORT_ON_RESULTS";
const SET_SCHEMES_FOR_REPORT_ON_RESULTS = "SET_SCHEMES_FOR_REPORT_ON_RESULTS";

const CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_ORGANISATION_RESET = "CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_ORGANISATION_RESET";
const CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_FACULTY_RESET = "CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_FACULTY_RESET";
const CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_DEPARTMENT_RESET = "CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_DEPARTMENT_RESET";
const CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_COURSE_RESET = "CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_COURSE_RESET";

export const loading = isLoading => ({type: LOADING_REPORT_ON_RESULTS, isLoading});
export const loadingFailure = error => ({type: LOADING_REPORT_ON_RESULTS_FAILURE, error});
export const validationFailure = validationErrorMessage => ({type: VALIDATION_REPORT_ON_RESULTS_FAILURE, validationErrorMessage});
export const clearLoadingReportOnResults = () => ({type: CLEAR_LOADING_REPORT_ON_RESULTS});
export const setReportOnResults = (report) => ({type: SET_REPORT_ON_RESULTS, payload: report});
export const clearReportOnResults = () => ({type: CLEAR_REPORT_ON_RESULTS});



export const loadingComponent = isLoading => ({type: LOADING_COMPONENT_OF_REPORT_ON_RESULTS, isLoading});
export const loadingComponentFailure = error => ({type: LOADING_COMPONENT_OF_REPORT_ON_RESULTS_FAILURE, error});
export const clearComponentFailure = () => ({type: CLEAR_LOADING_COMPONENT_OF_REPORT_ON_RESULTS_FAILURE});

export const setOrganisationsForReportOnResults = (organisations) => ({type: SET_ORGANISATIONS_FOR_REPORT_ON_RESULTS, payload: organisations});
export const setFacultiesForReportOnResults = (faculties) => ({type: SET_FACULTIES_FOR_REPORT_ON_RESULTS, payload: faculties});
export const setDepartmentsForReportOnResults = (departments) => ({type: SET_DEPARTMENTS_FOR_REPORT_ON_RESULTS, payload: departments});
export const setCoursesForReportOnResults = (courses) => ({type: SET_COURSES_FOR_REPORT_ON_RESULTS, payload: courses});
export const setSchemesForReportOnResults = (schemes) => ({type: SET_SCHEMES_FOR_REPORT_ON_RESULTS, payload: schemes});

export const clearAllSelectsForReportOnResultsOnOrganisationReset = () => ({type: CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_ORGANISATION_RESET});
export const clearAllSelectsForReportOnResultsOnFacultyReset = () => ({type: CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_FACULTY_RESET});
export const clearAllSelectsForReportOnResultsOnDepartmentReset = () => ({type: CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_DEPARTMENT_RESET});
export const clearAllSelectsForReportOnResultsOnCourseReset = () => ({type: CLEAR_ALL_SELECTS_FOR_REPORT_ON_RESULTS_ON_COURSE_RESET});

export const getAllOrganisationsForReportOnResults = () => {
    return (dispatch) => {
        dispatch(clearComponentFailure());
        dispatch(loadingComponent(true));
        organisationsAPI.fetchAllOrganisationsForDropDown().then(result => {
            dispatch(setOrganisationsForReportOnResults(result.data));
        }).catch(e => {
            dispatch(loadingComponentFailure(new Error('Failed to load all organisations.')));
        }).finally(() => dispatch(loadingComponent(false)));
    }
}

export const getAllFacultiesForReportOnResults = () => {
    return (dispatch) => {
        dispatch(clearComponentFailure());
        dispatch(loadingComponent(true));
        facultiesAPI.fetchAllFacultiesByOrganisationForDropDown().then(result => {
            dispatch(setFacultiesForReportOnResults(result.data));
        }).catch(e => {
            dispatch(loadingComponentFailure(new Error('Failed to load all faculties.')));
        }).finally(() => dispatch(loadingComponent(false)));
    }
}

export const getAllFacultiesForReportOnResultsByOrganisationId = (orgId) => {
    return (dispatch) => {
        dispatch(clearComponentFailure());
        dispatch(loadingComponent(true));
        facultiesAPI.fetchAllFacultiesByOrganisationIdForDropDown(orgId).then(result => {
            dispatch(setFacultiesForReportOnResults(result.data));
        }).catch(e => {
            dispatch(loadingComponentFailure(new Error(`Failed to load all faculties, orgId = ${orgId}`)));
        }).finally(() => dispatch(loadingComponent(false)));
    }
}

export const getAllDepartmentsForReportOnResults = () => {
    return (dispatch) => {
        dispatch(clearComponentFailure());
        dispatch(loadingComponent(true));
        departmentsAPI.fetchAllDepartmentsByFacultyForDropDown().then(result => {
            dispatch(setDepartmentsForReportOnResults(result.data));
        }).catch(e => {
            dispatch(loadingComponentFailure(new Error('Failed to load all departments.')));
        }).finally(() => dispatch(loadingComponent(false)));
    }
}

export const getAllDepartmentsForReportOnResultsByFacultyId = (facId) => {
    return (dispatch) => {
        dispatch(clearComponentFailure());
        dispatch(loadingComponent(true));
        departmentsAPI.fetchAllDepartmentsByFacultyIdForDropDown(facId).then(result => {
            dispatch(setDepartmentsForReportOnResults(result.data));
        }).catch(e => {
            dispatch(loadingComponentFailure(new Error(`Failed to load all departments, facId = ${facId}`)));
        }).finally(() => dispatch(loadingComponent(false)));
    }
}

export const getAllCoursesForReportOnResults = () => {
    return (dispatch) => {
        dispatch(clearComponentFailure());
        dispatch(loadingComponent(true));
        coursesAPI.fetchAllCoursesByDepartmentForDropDown().then(result => {
            dispatch(setCoursesForReportOnResults(result.data));
        }).catch(e => {
            dispatch(loadingComponentFailure(new Error('Failed to load all courses.')));
        }).finally(() => dispatch(loadingComponent(false)));
    }
}

export const getAllCoursesForReportOnResultsByDepartmentId = (depId) => {
    return (dispatch) => {
        dispatch(clearComponentFailure());
        dispatch(loadingComponent(true));
        coursesAPI.fetchAllCoursesByDepartmentIdForDropDown(depId).then(result => {
            dispatch(setCoursesForReportOnResults(result.data));
        }).catch(e => {
            dispatch(loadingComponentFailure(new Error(`Failed to load all courses, depId =  ${depId}`)));
        }).finally(() => dispatch(loadingComponent(false)));
    }
}

export const getAllSchemesForReportOnResultsByCourseId = (courseId) => {
    return (dispatch) => {
        dispatch(clearComponentFailure());
        dispatch(loadingComponent(true));
        schemesAPI.fetchAllSchemesForFilterByCourseId(courseId).then(result => {
            dispatch(setSchemesForReportOnResults(result.data));
        }).catch(e => {
            dispatch(loadingComponentFailure(new Error(`Failed to load all schemes, courseId =  ${courseId}`)));
        }).finally(() => dispatch(loadingComponent(false)));
    }
}

export const initReportOnResultsForm = (authenticated) => {
    return (dispatch) => {
        if (authenticated.role==='ROLE_GLOBAL-ADMIN') {
            dispatch(getAllOrganisationsForReportOnResults());
            return;
        }
        if (authenticated.role==="ROLE_ORG-ADMIN") {
            dispatch(getAllFacultiesForReportOnResults());
            return;
        }
        if (authenticated.role==="ROLE_FAC-ADMIN") {
            // Fetch all departments of his faculty
            dispatch(getAllDepartmentsForReportOnResults());
            return;
        }
        // Any dep. staff, fetch all courses of his dep.
        dispatch(getAllCoursesForReportOnResults());
    }
}


export const getReportOnResults = (restrictingParams) => {
    return (dispatch) => {
        dispatch(clearReportOnResults());
        dispatch(clearLoadingReportOnResults());
        dispatch(loading(true));
        reportsAPI.fetchReportOnResults(restrictingParams).then(result => {
            dispatch(setReportOnResults(result.data));
        }).catch(e => {
            dispatch(loadingFailure(new Error("Failed to create report on results")));
        }).finally(() => dispatch(loading(false)));
    }
}