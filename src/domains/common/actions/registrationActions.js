import appAPI from "../_api/appAPI";

const REGISTERING = "REGISTERING";
const REGISTERING_FAILURE = "REGISTERING_FAILURE";
const RESET_REGISTERING_FAILURE = "RESET_REGISTERING_FAILURE";
const SET_REGISTERED_CREDENTIALS = "SET_REGISTERED_CREDENTIALS";
const CLEAR_REGISTERED_CREDENTIALS = "CLEAR_REGISTERED_CREDENTIALS";

export const registering = isLoading => ({type: REGISTERING, isLoading});
export const registeringFailure = error => ({type: REGISTERING_FAILURE, error});
export const resetRegisteringFailure = () => ({type: RESET_REGISTERING_FAILURE});
export const setRegisteredCredentials = credentials=> ({type: SET_REGISTERED_CREDENTIALS, payload: credentials});
export const clearRegisteredCredentials = ()=> ({type: CLEAR_REGISTERED_CREDENTIALS});

const LOADING_DERIVED_ORGANISATION = "LOADING_DERIVED_ORGANISATION";
const LOADING_DERIVED_ORGANISATION_FAILURE = "LOADING_DERIVED_ORGANISATION_FAILURE";
const SET_DERIVED_ORGANISATION = "SET_DERIVED_ORGANISATION";

export const loadingDerivedOrganisation = isLoading => ({type: LOADING_DERIVED_ORGANISATION, isLoading});
export const loadingDerivedOrganisationFailure = error => ({type: LOADING_DERIVED_ORGANISATION_FAILURE, error});
export const setDerivedOrganisation = organisation=> ({type: SET_DERIVED_ORGANISATION, payload: organisation});

const LOADING_ORGANISATIONS = "LOADING_ORGANISATIONS";
const LOADING_ORGANISATIONS_FAILURE = "LOADING_ORGANISATIONS_FAILURE";
const SET_ORGANISATIONS = "SET_ORGANISATIONS";
const CLEAR_ORGANISATIONS = "CLEAR_ORGANISATIONS";

export const loadingOrganisations = isLoading => ({type: LOADING_ORGANISATIONS, isLoading});
export const loadingOrganisationsFailure = error => ({type: LOADING_ORGANISATIONS_FAILURE, error});
export const setOrganisations = organisations=> ({type: SET_ORGANISATIONS, payload: organisations});
export const clearOrganisations = ()=> ({type: CLEAR_ORGANISATIONS});

const LOADING_FACULTIES = "LOADING_FACULTIES";
const LOADING_FACULTIES_FAILURE = "LOADING_FACULTIES_FAILURE";
const SET_FACULTIES = "SET_FACULTIES";
const CLEAR_FACULTIES = "CLEAR_FACULTIES";

export const loadingFaculties = isLoading => ({type: LOADING_FACULTIES, isLoading});
export const loadingFacultiesFailure = error => ({type: LOADING_FACULTIES_FAILURE, error});
export const setFaculties = faculties=> ({type: SET_FACULTIES, payload: faculties});
export const clearFaculties = ()=> ({type: CLEAR_FACULTIES});

const LOADING_CLASSES = "LOADING_CLASSES ";
const LOADING_CLASSES_FAILURE = "LOADING_CLASSES_FAILURE";
const SET_CLASSES= "SET_CLASSES";
const CLEAR_CLASSES = "CLEAR_CLASSES";

export const loadingClasses = isLoading => ({type: LOADING_CLASSES, isLoading});
export const loadingClassesFailure = error => ({type: LOADING_CLASSES_FAILURE, error});
export const setClasses = classes=> ({type: SET_CLASSES, payload: classes});
export const clearClasses = ()=> ({type: CLEAR_CLASSES});

const LOADING_REG_OPTIONS = "LOADING_REG_OPTIONS";
const LOADING_REG_OPTIONS_FAILURE = "LOADING_REG_OPTIONS_FAILURE";
const SET_REG_OPTIONS = "SET_REG_OPTIONS";

export const loadingRegOptions = isLoading => ({type: LOADING_REG_OPTIONS, payload: isLoading});
export const loadingRegOptionsFailure = error => ({type: LOADING_REG_OPTIONS_FAILURE, payload: error});
export const setRegOptions = regOptions=> ({type: SET_REG_OPTIONS, payload: regOptions});

export const getRegistered = (regData, isLMS) => {
    return (dispatch) => {
        dispatch(resetRegisteringFailure());
        dispatch(registering(true));
        appAPI.register(regData, isLMS).then(() => {
            dispatch(setRegisteredCredentials(regData));
        }).catch(error => {
            const {message} = error.response.data;
            dispatch(registeringFailure(new Error(message)));
        }).finally(() => dispatch(registering(false)));
    }
}

export const getDerivedOrganisation = () => {
    return (dispatch) => {
        dispatch(loadingDerivedOrganisation(true));
        appAPI.fetchDerivedOrganisation().then(result => {
            let org = result.data;
            dispatch(setDerivedOrganisation(org));
            dispatch(getFaculties(org.orgId, true));
        }).catch(() => {
            dispatch(loadingDerivedOrganisationFailure(new Error("Failed to fetch derived organisation info")));
        }).finally(() => dispatch(loadingDerivedOrganisation(false)));
    }
}

export const getOrganisations = (isLMS) => {
    return (dispatch) => {
        dispatch(loadingOrganisations(true));
        appAPI.fetchOrganisations(isLMS).then(result => {
            dispatch(setOrganisations(result.data));
        }).catch(() => {
            dispatch(loadingOrganisationsFailure(new Error("Failed to fetch organisations info")));
        }).finally(() => dispatch(loadingOrganisations(false)));
    }
}

export const getFaculties = (orgId, isLMS) => {
    return (dispatch) => {
        dispatch(loadingFaculties(true));
        appAPI.fetchFaculties(orgId, isLMS).then(result => {
            dispatch(setFaculties(result.data));
        }).catch(() => {
            dispatch(loadingFacultiesFailure(new Error("Failed to fetch faculties info")));
        }).finally(() => dispatch(loadingFaculties(false)));
    }
}

export const getClasses = (facId, isLMS) => {
    return (dispatch) => {
        dispatch(loadingClasses(true));
        appAPI.fetchClasses(facId, isLMS).then(result => {
            dispatch(setClasses(result.data));
        }).catch(() => {
            dispatch(loadingClassesFailure(new Error("Failed to fetch classes info")));
        }).finally(() => dispatch(loadingClasses(false)));
    }
}

export const getRegOptions = () => {
    return (dispatch) => {
        dispatch(loadingRegOptions(true));
        appAPI.fetchRegOptions().then(result => {
            //console.log("Result (regOptions) = ", result.data);
            dispatch(setRegOptions(result.data));
        }).catch(e => {
            console.log("Error loading RegOptions!", e);
            dispatch(loadingRegOptionsFailure(new Error("Failed to load RegOptions")));
        }).finally(() => dispatch(loadingRegOptions(false)));
    }
}