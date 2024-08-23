import {organisationsAPI} from "../_api/organisationsAPI";
import {facultiesAPI} from "../_api/facultiesAPI";
import {departmentsAPI} from "../_api/departmentsAPI";
import {GenericAction} from "../../common/types/GenericAction";
import {Dispatch} from "redux";
import {Organisation} from "../types/Organisation";
import {Faculty} from "../types/Faculty";
import {Department} from "../types/Department";
import {SecurityRole} from "../../common/types/SecurityRole";
import {Staff} from "../types/Staff";

export const LOADING_COMPONENT_OF_AFFILIATION_SELECTOR = "LOADING_COMPONENT_OF_AFFILIATION_SELECTOR" as const;
export const LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE = "LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE" as const;
export const CLEAR_LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE = "CLEAR_LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE" as const;
export const SET_ORGANISATIONS_FOR_SELECTOR = "SET_ORGANISATIONS_FOR_SELECTOR" as const;
export const SET_FACULTIES_FOR_SELECTOR = "SET_FACULTIES_FOR_SELECTOR" as const;
export const SET_DEPARTMENTS_FOR_SELECTOR = "SET_DEPARTMENTS_FOR_SELECTOR" as const;
export const CLEAR_ALL_ON_ORGANISATION_RESET = "CLEAR_ALL_ON_ORGANISATION_RESET" as const;
export const CLEAR_ALL_ON_FACULTY_RESET = "CLEAR_ALL_ON_FACULTY_RESET" as const;

// Action types using GenericAction
type LoadingAction = GenericAction<typeof LOADING_COMPONENT_OF_AFFILIATION_SELECTOR, { isLoading: boolean }>;
type LoadingFailureAction = GenericAction<typeof LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE, { error: Error }>;
type ClearLoadingFailureAction = GenericAction<typeof CLEAR_LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE>;

type SetOrgForSelectorAction = GenericAction<typeof SET_ORGANISATIONS_FOR_SELECTOR, { organisations: Array<Organisation> }>;
type SetFacForSelectorAction = GenericAction<typeof SET_FACULTIES_FOR_SELECTOR, { faculties: Array<Faculty> }>;
type SetDepForSelectorAction = GenericAction<typeof SET_DEPARTMENTS_FOR_SELECTOR, { departments: Array<Department> }>;

type ClearAllOnOrganisationResetAction = GenericAction<typeof CLEAR_ALL_ON_ORGANISATION_RESET>;
type ClearAllOnFacultyResetAction = GenericAction<typeof CLEAR_ALL_ON_FACULTY_RESET>;

// Union type for all actions
export type AffiliationActionTypes =
    | LoadingAction
    | LoadingFailureAction
    | ClearLoadingFailureAction
    | SetOrgForSelectorAction
    | SetFacForSelectorAction
    | SetDepForSelectorAction
    | ClearAllOnOrganisationResetAction
    | ClearAllOnFacultyResetAction;

// Action creators using the generic type
const loading = (isLoading: boolean): LoadingAction => ({
    type: LOADING_COMPONENT_OF_AFFILIATION_SELECTOR,
    payload: {isLoading},
});

const loadingFailure = (error: Error): LoadingFailureAction => ({
    type: LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE,
    payload: {error},
});

const clearLoadingFailure = (): ClearLoadingFailureAction => ({
    type: CLEAR_LOADING_COMPONENT_OF_AFFILIATION_SELECTOR_FAILURE,
});

const setOrganisationsForSelector = (organisations: Array<Organisation>): SetOrgForSelectorAction => ({
    type: SET_ORGANISATIONS_FOR_SELECTOR,
    payload: {organisations},
});

const setFacultiesForSelector = (faculties: Array<Faculty>): SetFacForSelectorAction => ({
    type: SET_FACULTIES_FOR_SELECTOR,
    payload: {faculties},
});

const setDepartmentsForSelector = (departments: Array<Department>): SetDepForSelectorAction => ({
    type: SET_DEPARTMENTS_FOR_SELECTOR,
    payload: {departments},
});

export const clearAllOnOrganisationReset = (): ClearAllOnOrganisationResetAction => ({
    type: CLEAR_ALL_ON_ORGANISATION_RESET,
});

export const clearAllOnFacultyReset = (): ClearAllOnFacultyResetAction => ({
    type: CLEAR_ALL_ON_FACULTY_RESET,
});

export const getAllOrganisationsForSelector = () => {
    return (dispatch: Dispatch<AffiliationActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        organisationsAPI.fetchAllOrganisationsForDropDown()
            .then((organisations: Array<Organisation>): void => {
                dispatch(setOrganisationsForSelector(organisations));
            }).catch((e: Error): void => {
            console.warn("Error fetching all organisations for selector!", e);
            dispatch(loadingFailure(new Error('Failed to load all organisations.')));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllFacultiesForSelectorByOrganisation = () => {
    return (dispatch: Dispatch<AffiliationActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        facultiesAPI.fetchAllFacultiesByOrganisationForDropDown()
            .then((faculties: Array<Faculty>): void => {
                dispatch(setFacultiesForSelector(faculties));
            }).catch((e: Error): void => {
            console.warn("Error fetching all faculties for selector!", e);
            dispatch(loadingFailure(new Error('Failed to load all org. faculties.')));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllFacultiesForSelectorByOrganisationId = (orgId: number) => {
    return (dispatch: Dispatch<AffiliationActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        facultiesAPI.fetchAllFacultiesByOrganisationIdForDropDown(orgId)
            .then((faculties: Array<Faculty>): void => {
                dispatch(setFacultiesForSelector(faculties));
            }).catch((e: Error): void => {
            console.warn("Error fetching all faculties by organisation for selector!", e);
            dispatch(loadingFailure(new Error(`Failed to load all faculties, orgId = ${orgId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllDepartmentsForSelectorByFaculty = () => {
    return (dispatch: Dispatch<AffiliationActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        departmentsAPI.fetchAllDepartmentsByFacultyForDropDown()
            .then((departments: Array<Department>): void => {
                dispatch(setDepartmentsForSelector(departments));
            }).catch((e: Error): void => {
            console.warn("Error fetching all departments by faculty for selector!", e);
            dispatch(loadingFailure(new Error('Failed to load all fac departments.')));
        }).finally(() => dispatch(loading(false)));
    }
}

export const getAllDepartmentsForSelectorByFacultyId = (facId: number) => {
    return (dispatch: Dispatch<AffiliationActionTypes>): void => {
        dispatch(clearLoadingFailure());
        dispatch(loading(true));
        departmentsAPI.fetchAllDepartmentsByFacultyIdForDropDown(facId)
            .then((departments: Array<Department>): void => {
                dispatch(setDepartmentsForSelector(departments));
            }).catch((e: Error): void => {
            console.warn(`Error fetching all departments by faculty ${facId} for selector!`, e);
            dispatch(loadingFailure(new Error(`Failed to load all departments, facId = ${facId}`)));
        }).finally(() => dispatch(loading(false)));
    }
}

/**
 * Invoke only in case when there is no previously selected values are present!
 * @param role
 * @returns {Function}
 */
export const initAffiliationSelector = (role: SecurityRole): Function => {
    return (dispatch: Dispatch<AffiliationActionTypes> | any): void => {
        if (role === SecurityRole.ROLE_GLOBAL_ADMIN) {
            // Fetch all organisations
            dispatch(getAllOrganisationsForSelector());
        } else if (role === SecurityRole.ROLE_ORG_ADMIN) {
            // Fetch all organisation's faculties
            dispatch(getAllFacultiesForSelectorByOrganisation());
        } else if (role === SecurityRole.ROLE_FAC_ADMIN) {
            // Fetch all faculty's departments
            dispatch(getAllDepartmentsForSelectorByFaculty());
        } else {
            console.error(`Role is not allowed, =  ${role.toString()}!`);
            return;
        }
    }
}

/**
 * Init AffiliationSelector for staff edit form usage
 * @param role
 * @param user
 * @returns {Function}
 */
export const initAffiliationSelectorForStaffEditForm = (role: SecurityRole, user: Staff): Function => {
    return (dispatch: Dispatch<AffiliationActionTypes> | any): void => {
        const depId: number = user.department?.depId as number;
        const facId: number = user.department!.faculty?.facId as number;
        const orgId: number = user.department!.faculty!.organisation?.orgId as number;
        if (role === SecurityRole.ROLE_FAC_ADMIN) {
            // Fetch all departments
            dispatch(getAllDepartmentsForSelectorByFaculty());
            return;
        }
        if (role === SecurityRole.ROLE_ORG_ADMIN) {
            // Fetch all faculties and departments
            dispatch(getAllFacultiesForSelectorByOrganisation());
            dispatch(getAllDepartmentsForSelectorByFacultyId(facId));
            return;
        }
        if (role === SecurityRole.ROLE_GLOBAL_ADMIN) {
            // Fetch all organisations and faculties and departments
            dispatch(getAllOrganisationsForSelector());
            dispatch(getAllFacultiesForSelectorByOrganisationId(orgId));
            dispatch(getAllDepartmentsForSelectorByFacultyId(facId));
            return;
        }
    }
}