import { Dispatch } from 'redux';
import registrationAPI from "../_api/registrationAPI";
import { GenericAction } from "../types/GenericAction";
import { Student } from "../types/Student";
import { Organisation } from "../types/Organisation";
import { Faculty } from "../types/Faculty";
import { Class } from "../types/Class";
import { RegOptions } from "../types/RegOptions";

// Action Types
export const REGISTERING = "REGISTERING";
export const REGISTERING_FAILURE = "REGISTERING_FAILURE";
export const RESET_REGISTERING_FAILURE = "RESET_REGISTERING_FAILURE";
export const SET_REGISTERED_CREDENTIALS = "SET_REGISTERED_CREDENTIALS";
export const CLEAR_REGISTERED_CREDENTIALS = "CLEAR_REGISTERED_CREDENTIALS";

export const LOADING_DERIVED_ORGANISATION = "LOADING_DERIVED_ORGANISATION";
export const LOADING_DERIVED_ORGANISATION_FAILURE = "LOADING_DERIVED_ORGANISATION_FAILURE";
export const SET_DERIVED_ORGANISATION = "SET_DERIVED_ORGANISATION";

export const LOADING_ORGANISATIONS = "LOADING_ORGANISATIONS";
export const LOADING_ORGANISATIONS_FAILURE = "LOADING_ORGANISATIONS_FAILURE";
export const SET_ORGANISATIONS = "SET_ORGANISATIONS";
export const CLEAR_ORGANISATIONS = "CLEAR_ORGANISATIONS";

export const LOADING_FACULTIES = "LOADING_FACULTIES";
export const LOADING_FACULTIES_FAILURE = "LOADING_FACULTIES_FAILURE";
export const SET_FACULTIES = "SET_FACULTIES";
export const CLEAR_FACULTIES = "CLEAR_FACULTIES";

export const LOADING_CLASSES = "LOADING_CLASSES";
export const LOADING_CLASSES_FAILURE = "LOADING_CLASSES_FAILURE";
export const SET_CLASSES = "SET_CLASSES";
export const CLEAR_CLASSES = "CLEAR_CLASSES";

export const LOADING_REG_OPTIONS = "LOADING_REG_OPTIONS";
export const LOADING_REG_OPTIONS_FAILURE = "LOADING_REG_OPTIONS_FAILURE";
export const SET_REG_OPTIONS = "SET_REG_OPTIONS";

// Action Creators
export type RegisteringAction = GenericAction<typeof REGISTERING, { isLoading: boolean }>;
export type RegisteringFailureAction = GenericAction<typeof REGISTERING_FAILURE, { error: Error }>;
export type ResetRegisteringFailureAction = GenericAction<typeof RESET_REGISTERING_FAILURE>;
export type SetRegisteredCredentialsAction = GenericAction<typeof SET_REGISTERED_CREDENTIALS, { credentials: Student }>;
export type ClearRegisteredCredentialsAction = GenericAction<typeof CLEAR_REGISTERED_CREDENTIALS>;

export const registering = (isLoading: boolean): RegisteringAction => ({ type: REGISTERING, payload: { isLoading } });
export const registeringFailure = (error: Error): RegisteringFailureAction => ({ type: REGISTERING_FAILURE, payload: { error } });
export const resetRegisteringFailure = (): ResetRegisteringFailureAction => ({ type: RESET_REGISTERING_FAILURE });
export const setRegisteredCredentials = (credentials: Student): SetRegisteredCredentialsAction => ({ type: SET_REGISTERED_CREDENTIALS, payload: { credentials } });
export const clearRegisteredCredentials = (): ClearRegisteredCredentialsAction => ({ type: CLEAR_REGISTERED_CREDENTIALS });

export type LoadingDerivedOrganisationAction = GenericAction<typeof LOADING_DERIVED_ORGANISATION, { isLoading: boolean }>;
export type LoadingDerivedOrganisationFailureAction = GenericAction<typeof LOADING_DERIVED_ORGANISATION_FAILURE, { error: Error }>;
export type SetDerivedOrganisationAction = GenericAction<typeof SET_DERIVED_ORGANISATION, { organisation: number }>;

export const loadingDerivedOrganisation = (isLoading: boolean): LoadingDerivedOrganisationAction => ({ type: LOADING_DERIVED_ORGANISATION, payload: { isLoading } });
export const loadingDerivedOrganisationFailure = (error: Error): LoadingDerivedOrganisationFailureAction => ({ type: LOADING_DERIVED_ORGANISATION_FAILURE, payload: { error } });
export const setDerivedOrganisation = (organisation: number): SetDerivedOrganisationAction => ({ type: SET_DERIVED_ORGANISATION, payload: { organisation } });

export type LoadingOrganisationsAction = GenericAction<typeof LOADING_ORGANISATIONS, { isLoading: boolean }>;
export type LoadingOrganisationsFailureAction = GenericAction<typeof LOADING_ORGANISATIONS_FAILURE, { error: Error }>;
export type SetOrganisationsAction = GenericAction<typeof SET_ORGANISATIONS, { organisations: Array<Organisation> }>;
export type ClearOrganisationsAction = GenericAction<typeof CLEAR_ORGANISATIONS>;

export const loadingOrganisations = (isLoading: boolean): LoadingOrganisationsAction => ({ type: LOADING_ORGANISATIONS, payload: { isLoading } });
export const loadingOrganisationsFailure = (error: Error): LoadingOrganisationsFailureAction => ({ type: LOADING_ORGANISATIONS_FAILURE, payload: { error } });
export const setOrganisations = (organisations: Array<Organisation>): SetOrganisationsAction => ({ type: SET_ORGANISATIONS, payload: { organisations } });
export const clearOrganisations = (): ClearOrganisationsAction => ({ type: CLEAR_ORGANISATIONS });

export type LoadingFacultiesAction = GenericAction<typeof LOADING_FACULTIES, { isLoading: boolean }>;
export type LoadingFacultiesFailureAction = GenericAction<typeof LOADING_FACULTIES_FAILURE, { error: Error }>;
export type SetFacultiesAction = GenericAction<typeof SET_FACULTIES, { faculties: Array<Faculty> }>;
export type ClearFacultiesAction = GenericAction<typeof CLEAR_FACULTIES>;

export const loadingFaculties = (isLoading: boolean): LoadingFacultiesAction => ({ type: LOADING_FACULTIES, payload: { isLoading } });
export const loadingFacultiesFailure = (error: Error): LoadingFacultiesFailureAction => ({ type: LOADING_FACULTIES_FAILURE, payload: { error } });
export const setFaculties = (faculties: Array<Faculty>): SetFacultiesAction => ({ type: SET_FACULTIES, payload: { faculties } });
export const clearFaculties = (): ClearFacultiesAction => ({ type: CLEAR_FACULTIES });

export type LoadingClassesAction = GenericAction<typeof LOADING_CLASSES, { isLoading: boolean }>;
export type LoadingClassesFailureAction = GenericAction<typeof LOADING_CLASSES_FAILURE, { error: Error }>;
export type SetClassesAction = GenericAction<typeof SET_CLASSES, { classes: Array<Class> }>;
export type ClearClassesAction = GenericAction<typeof CLEAR_CLASSES>;

export const loadingClasses = (isLoading: boolean): LoadingClassesAction => ({ type: LOADING_CLASSES, payload: { isLoading } });
export const loadingClassesFailure = (error: Error): LoadingClassesFailureAction => ({ type: LOADING_CLASSES_FAILURE, payload: { error } });
export const setClasses = (classes: Array<Class>): SetClassesAction => ({ type: SET_CLASSES, payload: { classes } });
export const clearClasses = (): ClearClassesAction => ({ type: CLEAR_CLASSES });

export type LoadingRegOptionsAction = GenericAction<typeof LOADING_REG_OPTIONS, { isLoading: boolean }>;
export type LoadingRegOptionsFailureAction = GenericAction<typeof LOADING_REG_OPTIONS_FAILURE, { error: Error }>;
export type SetRegOptionsAction = GenericAction<typeof SET_REG_OPTIONS, { regOptions: RegOptions }>;

export const loadingRegOptions = (isLoading: boolean): LoadingRegOptionsAction => ({ type: LOADING_REG_OPTIONS, payload: { isLoading } });
export const loadingRegOptionsFailure = (error: Error): LoadingRegOptionsFailureAction => ({ type: LOADING_REG_OPTIONS_FAILURE, payload: { error } });
export const setRegOptions = (regOptions: RegOptions): SetRegOptionsAction => ({ type: SET_REG_OPTIONS, payload: { regOptions } });

export type RegActionTypes =
    | RegisteringAction
    | RegisteringFailureAction
    | ResetRegisteringFailureAction
    | SetRegisteredCredentialsAction
    | ClearRegisteredCredentialsAction
    | LoadingDerivedOrganisationAction
    | LoadingDerivedOrganisationFailureAction
    | SetDerivedOrganisationAction
    | LoadingOrganisationsAction
    | LoadingOrganisationsFailureAction
    | SetOrganisationsAction
    | ClearOrganisationsAction
    | LoadingFacultiesAction
    | LoadingFacultiesFailureAction
    | SetFacultiesAction
    | ClearFacultiesAction
    | LoadingClassesAction
    | LoadingClassesFailureAction
    | SetClassesAction
    | ClearClassesAction
    | LoadingRegOptionsAction
    | LoadingRegOptionsFailureAction
    | SetRegOptionsAction;

export const getRegistered = (regData: Student, isLMS: boolean) => {
    return (dispatch: Dispatch<RegActionTypes>) => {
        dispatch(resetRegisteringFailure());
        dispatch(registering(true));
        registrationAPI.register(regData, isLMS).then(() => {
            dispatch(setRegisteredCredentials(regData));
        }).catch(error => {
            const { message } = error.response.data;
            dispatch(registeringFailure(new Error(message)));
        }).finally(() => dispatch(registering(false)));
    }
}

export const getDerivedOrganisation = () => {
    return (dispatch: Dispatch<RegActionTypes>) => {
        dispatch(loadingDerivedOrganisation(true));
        registrationAPI.fetchDerivedOrganisation().then((orgId: number) => {
            dispatch(setDerivedOrganisation(orgId));
            dispatch(getFaculties(orgId, true) as any);
        }).catch(() => {
            dispatch(loadingDerivedOrganisationFailure(new Error("Failed to fetch derived organisation info")));
        }).finally(() => dispatch(loadingDerivedOrganisation(false)));
    }
}

export const getOrganisations = (isLMS: boolean) => {
    return (dispatch: Dispatch<RegActionTypes>) => {
        dispatch(loadingOrganisations(true));
        registrationAPI.fetchOrganisations(isLMS).then((organisations: Array<Organisation>) => {
            dispatch(setOrganisations(organisations));
        }).catch(() => {
            dispatch(loadingOrganisationsFailure(new Error("Failed to fetch organisations info")));
        }).finally(() => dispatch(loadingOrganisations(false)));
    }
}

export const getFaculties = (orgId: number, isLMS: boolean) => {
    return (dispatch: Dispatch<RegActionTypes>) => {
        dispatch(loadingFaculties(true));
        registrationAPI.fetchFaculties(orgId, isLMS).then((faculties: Array<Faculty>) => {
            dispatch(setFaculties(faculties));
        }).catch(() => {
            dispatch(loadingFacultiesFailure(new Error("Failed to fetch faculties info")));
        }).finally(() => dispatch(loadingFaculties(false)));
    }
}

export const getClasses = (facId: number, isLMS: boolean) => {
    return (dispatch: Dispatch<RegActionTypes>) => {
        dispatch(loadingClasses(true));
        registrationAPI.fetchClasses(facId, isLMS).then((classes: Array<Class>) => {
            dispatch(setClasses(classes));
        }).catch(() => {
            dispatch(loadingClassesFailure(new Error("Failed to fetch classes info")));
        }).finally(() => dispatch(loadingClasses(false)));
    }
}

export const getRegOptions = () => {
    return (dispatch: Dispatch<RegActionTypes>) => {
        dispatch(loadingRegOptions(true));
        registrationAPI.fetchRegOptions().then((data: RegOptions) => {
            dispatch(setRegOptions(data));
        }).catch(e => {
            console.log("Error loading RegOptions!", e);
            dispatch(loadingRegOptionsFailure(new Error("Failed to load RegOptions")));
        }).finally(() => dispatch(loadingRegOptions(false)));
    }
}
