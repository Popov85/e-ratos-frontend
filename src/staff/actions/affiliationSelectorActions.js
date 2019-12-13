import {organisationsAPI} from "../_api/organisationsAPI";
import {facultiesAPI} from "../_api/facultiesAPI";
import {departmentsAPI} from "../_api/departmentsAPI";

const LOADING_COMPONENT_OF_AFFILIATION_SELECTOR = "LOADING_COMPONENT_OF_AFFILIATION_SELECTOR";
const LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE = "LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE";
const CLEAR_LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE = "CLEAR_LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE";

const SET_ORGANISATIONS_FOR_SELECTOR = "SET_ORGANISATIONS_FOR_SELECTOR";
const SET_FACULTIES_FOR_SELECTOR = "SET_FACULTIES_FOR_SELECTOR";
const SET_DEPARTMENTS_FOR_SELECTOR = "SET_DEPARTMENTS_FOR_SELECTOR";

const SET_SELECTED = "SET_SELECTED";

const CLEAR_SELECTED = "CLEAR_SELECTED";
const CLEAR_ALL_ON_ORGANISATION_RESET = "CLEAR_ALL_ON_ORGANISATION_RESET";
const CLEAR_ALL_ON_FACULTY_RESET = "CLEAR_ALL_ON_FACULTY_RESET";

export const loading = isLoading => ({type: LOADING_COMPONENT_OF_AFFILIATION_SELECTOR, isLoading});
export const loadingFailure = error => ({type: LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE});

export const setOrganisationsForSelector = (organisations) => ({type: SET_ORGANISATIONS_FOR_SELECTOR, payload: organisations});
export const setFacultiesForSelector = (faculties) => ({type: SET_FACULTIES_FOR_SELECTOR, payload: faculties});
export const setDepartmentsForSelector = (departments) => ({type: SET_DEPARTMENTS_FOR_SELECTOR, payload: departments});

export const setSelected = (affiliation) => ({type: SET_SELECTED, payload: affiliation});
export const clearSelected = () => ({type: CLEAR_SELECTED});

export const clearAllOnOrganisationReset = () => ({type: CLEAR_ALL_ON_ORGANISATION_RESET});
export const clearAllOnFacultyReset = () => ({type: CLEAR_ALL_ON_FACULTY_RESET});


export const getAllOrganisationsForSelector = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        organisationsAPI.fetchAllOrganisationsForDropDown().then(result => {
            let org = result.data;
            dispatch(setOrganisationsForSelector(org));
        }).catch(e => {
            dispatch(loadingFailure(new Error('Failed to load all organisations.')));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllFacultiesForSelectorByOrganisation = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        facultiesAPI.fetchAllFacultiesByOrganisationForDropDown().then(result => {
            let fac = result.data;
            dispatch(setFacultiesForSelector(fac));
        }).catch(e => {
            dispatch(loadingFailure(new Error('Failed to load all org. faculties.')));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllFacultiesForSelectorByOrganisationId = (orgId) => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        facultiesAPI.fetchAllFacultiesByOrganisationIdForDropDown(orgId).then(result => {
            let fac = result.data;
            dispatch(setFacultiesForSelector(fac));
        }).catch(e => {
            dispatch(loadingFailure(new Error(`Failed to load all faculties, orgId = ${orgId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllDepartmentsForSelectorByFaculty = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        departmentsAPI.fetchAllDepartmentsByFacultyForDropDown().then(result => {
            let dep = result.data;
            dispatch(setDepartmentsForSelector(dep));
        }).catch(e => {
            dispatch(loadingFailure(new Error('Failed to load all fac departments.')));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllDepartmentsForSelectorByFacultyId = (facId) => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        departmentsAPI.fetchAllDepartmentsByFacultyIdForDropDown(facId).then(result => {
            let dep = result.data;
            dispatch(setDepartmentsForSelector(dep));
        }).catch(e => {
            dispatch(loadingFailure(new Error(`Failed to load all departments, facId = ${facId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

/**
 * Invoke only in case when there is no previously selected values are present!
 * @param role
 * @returns {Function}
 */
export const initAffiliationSelector = (authenticated) => {
    return (dispatch) => {
        const {role} = authenticated;
        if (role === 'ROLE_GLOBAL-ADMIN') {
            // Fetch all organisations
            dispatch(getAllOrganisationsForSelector());
        } else if (role === 'ROLE_ORG-ADMIN') {
            // Fetch all organisation's faculties
            dispatch(getAllFacultiesForSelectorByOrganisation());
        } else if (role === 'ROLE_FAC-ADMIN') {
            // Fetch all faculty's departments
            dispatch(getAllDepartmentsForSelectorByFaculty());
        } else {
            throw new Error("Unrecognized role of user!");
        }
    }
}

/**
 * Init AffiliationSelector for staff edit form usage
 * @param authenticated
 * @param affiliationSelector
 * @returns {Function}
 */
export const initAffiliationSelectorForStaffEditForm = (authenticated, user) => {
    return (dispatch) => {
        const {depId} = user.department;
        const {facId} = user.department.faculty;
        const {orgId} = user.department.faculty.organisation;
        if (authenticated.role==='ROLE_FAC-ADMIN') {
           // Fetch all departments
            dispatch(getAllDepartmentsForSelectorByFaculty());
            return;
        }
        if (authenticated.role==='ROLE_ORG-ADMIN') {
            // Fetch all faculties and departments
            dispatch(getAllFacultiesForSelectorByOrganisation());
            dispatch(getAllDepartmentsForSelectorByFacultyId(facId));
            return;
        }
        if (authenticated.role==='ROLE_GLOBAL-ADMIN') {
           // Fetch all organisations and faculties and departments
            dispatch(getAllOrganisationsForSelector());
            dispatch(getAllFacultiesForSelectorByOrganisationId(orgId));
            dispatch(getAllDepartmentsForSelectorByFacultyId(facId));
            return;
        }
    }
}