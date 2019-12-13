import {organisationsAPI} from "../_api/organisationsAPI";
import {facultiesAPI} from "../_api/facultiesAPI";
import {departmentsAPI} from "../_api/departmentsAPI";

const LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_CACHEABLE = "LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_CACHEABLE";
const LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_CACHEABLE_FAILURE = "LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_CACHEABLE_FAILURE";
const CLEAR_LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_CACHEABLE_FAILURE = "CLEAR_LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_CACHEABLE_FAILURE";

const SET_ORGANISATIONS_FOR_SELECTOR_CACHEABLE = "SET_ORGANISATIONS_FOR_SELECTOR_CACHEABLE";
const SET_FACULTIES_FOR_SELECTOR_CACHEABLE = "SET_FACULTIES_FOR_SELECTOR_CACHEABLE";
const SET_DEPARTMENTS_FOR_SELECTOR_CACHEABLE = "SET_DEPARTMENTS_FOR_SELECTOR_CACHEABLE";

const SET_EXISTING_ORGANISATIONS_FOR_SELECTOR_CACHEABLE = "SET_EXISTING_ORGANISATIONS_FOR_SELECTOR_CACHEABLE";
const SET_EXISTING_FACULTIES_FOR_SELECTOR_CACHEABLE = "SET_EXISTING_FACULTIES_FOR_SELECTOR_CACHEABLE";
const SET_EXISTING_DEPARTMENTS_FOR_SELECTOR_CACHEABLE = "SET_EXISTING_DEPARTMENTS_FOR_SELECTOR_CACHEABLE";

const SET_SELECTED_CACHEABLE = "SET_SELECTED_CACHEABLE";


const CLEAR_SELECTED_CACHEABLE = "CLEAR_SELECTED_CACHEABLE";
const CLEAR_ALL_ON_ORGANISATION_RESET_CACHEABLE = "CLEAR_ALL_ON_ORGANISATION_RESET_CACHEABLE";
const CLEAR_ALL_ON_FACULTY_RESET_CACHEABLE = "CLEAR_ALL_ON_FACULTY_RESET_CACHEABLE";


export const loading = isLoading => ({type: LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_CACHEABLE, isLoading});
export const loadingFailure = error => ({type: LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_CACHEABLE_FAILURE, error});
export const clearLoadingFailure = () => ({type: CLEAR_LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_CACHEABLE_FAILURE});

export const setOrganisationsForSelector = (key, organisations) => ({type: SET_ORGANISATIONS_FOR_SELECTOR_CACHEABLE, key, payload: organisations});
export const setFacultiesForSelector = (key, faculties) => ({type: SET_FACULTIES_FOR_SELECTOR_CACHEABLE, key, payload: faculties});
export const setDepartmentsForSelector = (key, departments) => ({type: SET_DEPARTMENTS_FOR_SELECTOR_CACHEABLE, key, payload: departments});

export const setExistingOrganisationsForSelector = (key) => ({type: SET_EXISTING_ORGANISATIONS_FOR_SELECTOR_CACHEABLE, key});
export const setExistingFacultiesForSelector = (key) => ({type: SET_EXISTING_FACULTIES_FOR_SELECTOR_CACHEABLE, key});
export const setExistingDepartmentsForSelector = (key) => ({type: SET_EXISTING_DEPARTMENTS_FOR_SELECTOR_CACHEABLE, key});

export const setSelected = (affiliation) => ({type: SET_SELECTED_CACHEABLE, payload: affiliation});
export const clearSelected = () => ({type: CLEAR_SELECTED_CACHEABLE});

export const clearAllOnOrganisationReset = () => ({type: CLEAR_ALL_ON_ORGANISATION_RESET_CACHEABLE});
export const clearAllOnFacultyReset = () => ({type: CLEAR_ALL_ON_FACULTY_RESET_CACHEABLE});


export const getAllOrganisationsForSelector = () => {
    return (dispatch) => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        organisationsAPI.fetchAllOrganisationsForDropDown().then(result => {
            let org = result.data;
            dispatch(setOrganisationsForSelector("All", org));
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
            dispatch(setFacultiesForSelector("All", fac));
        }).catch(e => {
            dispatch(loadingFailure(new Error('Failed to load all org. faculties.')));
        }).finally(() => dispatch(loading(false)));
    }
}

// If such array already present in a map, just load it from there without API call!
export const getAllFacultiesForSelectorByOrganisationId = (orgId, affiliationSelector) => {
    return (dispatch) => {
        const {facultiesMap} = affiliationSelector;
        if (facultiesMap.has(orgId)) {
            dispatch(setExistingFacultiesForSelector(orgId));
            return;
        }
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        facultiesAPI.fetchAllFacultiesByOrganisationIdForDropDown(orgId).then(result => {
            let fac = result.data;
            dispatch(setFacultiesForSelector(orgId, fac));
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
            dispatch(setDepartmentsForSelector("All", dep));
        }).catch(e => {
            dispatch(loadingFailure(new Error('Failed to load all fac departments.')));
        }).finally(() => dispatch(loading(false)));
    }
}

// If such array already present in a map, just load it from there without API call!
export const getAllDepartmentsForSelectorByFacultyId = (facId, affiliationSelector) => {
    return (dispatch) => {
        const {departmentsMap} = affiliationSelector;
        if (departmentsMap.has(facId)) {
            dispatch(setExistingDepartmentsForSelector(facId));
            return;
        }
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        departmentsAPI.fetchAllDepartmentsByFacultyIdForDropDown(facId).then(result => {
            let dep = result.data;
            dispatch(setDepartmentsForSelector(facId, dep));
        }).catch(e => {
            dispatch(loadingFailure(new Error(`Failed to load all departments, facId = ${facId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

/**
 * Invoke only in case when there is no previously selected values are present!
 * @param role
 * @param affiliationSelector
 * @returns {Function}
 */
export const initAffiliationSelector = (role, affiliationSelector) => {
    return (dispatch) => {
        const {organisationsMap, facultiesMap, departmentsMap} = affiliationSelector;
        if (role === 'ROLE_GLOBAL-ADMIN') {
            if (organisationsMap.has('All')) {
                dispatch(setExistingOrganisationsForSelector('All'));
                return;
            }
            // Fetch all organisations
            dispatch(getAllOrganisationsForSelector());
        } else if (role === 'ROLE_ORG-ADMIN') {
            if (facultiesMap.has('All')) {
                dispatch(setExistingFacultiesForSelector('All'));
                return;
            }
            // Fetch all organisation's faculties
            dispatch(getAllFacultiesForSelectorByOrganisation());
        } else if (role === 'ROLE_FAC-ADMIN') {
            if (departmentsMap.has('All')) {
                dispatch(setExistingDepartmentsForSelector('All'));
                return;
            }
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
export const initAffiliationSelectorForStaffEditForm = (authenticated, user, affiliationSelector) => {
    return (dispatch) => {
        const {organisationsMap, facultiesMap, departmentsMap} = affiliationSelector;
        const {depId} = user.department;
        const {facId} = user.department.faculty;
        const {orgId} = user.department.faculty.organisation;
        if (authenticated.role==='ROLE_FAC-ADMIN') {
            // Make sure all {dep} lists with key All are loaded
            if (departmentsMap.has('All')) {
                dispatch(setExistingDepartmentsForSelector('All'));
            } else {// Fetch all departments
                dispatch(getAllDepartmentsForSelectorByFaculty());
            }
            return;
        }
        if (authenticated.role==='ROLE_ORG-ADMIN') {
            // Make sure all {fac, dep} lists with key All are loaded
            if (facultiesMap.has('All')) {
                dispatch(setExistingFacultiesForSelector('All'));
            } else {// Fetch all faculties
                dispatch(getAllFacultiesForSelectorByOrganisation());
            }
            dispatch(getAllDepartmentsForSelectorByFacultyId(facId, affiliationSelector));
            return;
        }
        if (authenticated.role==='ROLE_GLOBAL-ADMIN') {
            // Make sure all {org, fac, dep} lists with key All are loaded
            if (organisationsMap.has('All')) {
                dispatch(setExistingOrganisationsForSelector('All'));
            } else {// Fetch all organisations
                dispatch(getAllOrganisationsForSelector());
            }
            dispatch(getAllFacultiesForSelectorByOrganisationId(orgId, affiliationSelector));
            dispatch(getAllDepartmentsForSelectorByFacultyId(facId, affiliationSelector));
            return;
        }
    }
}