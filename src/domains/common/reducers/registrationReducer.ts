import {Organisation} from "../types/Organisation";
import {Faculty} from "../types/Faculty";
import {Class} from "../types/Class";
import {RegOptions} from "../types/RegOptions";
import {
    CLEAR_CLASSES,
    CLEAR_FACULTIES,
    CLEAR_ORGANISATIONS,
    CLEAR_REGISTERED_CREDENTIALS,
    LOADING_CLASSES,
    LOADING_CLASSES_FAILURE,
    LOADING_DERIVED_ORGANISATION,
    LOADING_DERIVED_ORGANISATION_FAILURE,
    LOADING_FACULTIES,
    LOADING_FACULTIES_FAILURE,
    LOADING_ORGANISATIONS,
    LOADING_ORGANISATIONS_FAILURE,
    LOADING_REG_OPTIONS,
    LOADING_REG_OPTIONS_FAILURE,
    REGISTERING,
    REGISTERING_FAILURE,
    RESET_REGISTERING_FAILURE,
    SET_CLASSES,
    SET_DERIVED_ORGANISATION,
    SET_FACULTIES,
    SET_ORGANISATIONS,
    SET_REG_OPTIONS,
    SET_REGISTERED_CREDENTIALS,
    RegActionTypes
} from '../actions/registrationActions';
import {SavedCredentials} from "../types/SavedCredentials";

export type RegistrationState = {
    isLoading: boolean;
    ORG: Array<Organisation>;
    FAC: Array<Faculty>;
    CLA: Array<Class>;
    savedCredentials?: SavedCredentials | null;
    isLoadingRegOptions: boolean;
    regOptions: RegOptions | null;
    error: Error | null;
    isLoadingDO: boolean;
    errorDO: Error | null;
    DO: number | null;
    isLoadingO: boolean;
    errorO: Error | null;
    isLoadingF: boolean;
    errorF: Error | null;
    isLoadingC: boolean;
    errorC: Error | null;
    errorLoadingRegOptions: Error | null;
}

const initState: RegistrationState = {
    isLoading: false,
    ORG: [
        {orgId: "", name: "Select"},
    ],
    FAC: [
        {facId: "", name: "Select"},
    ],
    CLA: [
        {classId: "", name: "Select"},
    ],
    savedCredentials: {
        email: "global.admin@example.com",
        password: "jS5ph7Wm"
    },
    isLoadingRegOptions: false,
    regOptions: null,
    error: null,
    isLoadingDO: false,
    errorDO: null,
    DO: null,
    isLoadingO: false,
    errorO: null,
    isLoadingF: false,
    errorF: null,
    isLoadingC: false,
    errorC: null,
    errorLoadingRegOptions: null
}

export const registrationReducer = (state: RegistrationState = initState, action: RegActionTypes): RegistrationState => {
    switch (action.type) {
        case REGISTERING: {
            const isLoading = action.payload?.isLoading ?? false;
            return {...state, isLoading};
        }
        case REGISTERING_FAILURE: {
            console.log("Error during registration!", action.payload?.error);
            return {...state, error: action.payload?.error ?? null};
        }
        case RESET_REGISTERING_FAILURE: {
            return {...state, error: null};
        }
        case SET_REGISTERED_CREDENTIALS: {
            const {email, password} = action.payload?.credentials.user!;
            console.log("Credentials = ", email, password);
            return {
                ...state, savedCredentials: {
                    email: email,
                    password: password
                }
            };
        }
        case CLEAR_REGISTERED_CREDENTIALS: {
            return {...state, savedCredentials: null};
        }
        case LOADING_DERIVED_ORGANISATION: {
            const isLoading = action.payload?.isLoading ?? false;
            return {...state, isLoadingDO: isLoading};
        }
        case LOADING_DERIVED_ORGANISATION_FAILURE: {
            console.log("Error fetching derived organisation!", action.payload?.error);
            return {...state, errorDO: action.payload?.error ?? null};
        }
        case SET_DERIVED_ORGANISATION: {
            return {...state, DO: action.payload?.organisation ?? null};
        }
        case LOADING_ORGANISATIONS: {
            const isLoading = action.payload?.isLoading ?? false;
            return {...state, isLoadingO: isLoading};
        }
        case LOADING_ORGANISATIONS_FAILURE: {
            console.log("Error fetching organisations!", action.payload?.error);
            return {...state, errorO: action.payload?.error ?? null};
        }
        case SET_ORGANISATIONS: {
            let organisations: Array<Organisation> = action.payload?.organisations!;
            organisations.unshift({orgId: "", name: "Select"});
            return {...state, ORG: organisations};
        }
        case CLEAR_ORGANISATIONS: {
            let organisations: Array<Organisation> = [{orgId: "", name: "Select"}];
            return {...state, ORG: organisations};
        }
        case LOADING_FACULTIES: {
            const isLoading = action.payload?.isLoading ?? false;
            return {...state, isLoadingF: isLoading};
        }
        case LOADING_FACULTIES_FAILURE: {
            console.log("Error fetching faculties!", action.payload?.error);
            return {...state, errorF: action.payload?.error ?? null};
        }
        case SET_FACULTIES: {
            let faculties: Array<Faculty> = action.payload?.faculties!;
            faculties.unshift({facId: "", name: "Select"});
            return {...state, FAC: faculties};
        }
        case CLEAR_FACULTIES: {
            let faculties = [{facId: "", name: "Select"}];
            return {...state, FAC: faculties};
        }
        case LOADING_CLASSES: {
            const isLoading = action.payload?.isLoading ?? false;
            return {...state, isLoadingC: isLoading};
        }
        case LOADING_CLASSES_FAILURE: {
            console.log("Error fetching classes!", action.payload?.error);
            return {...state, errorC: action.payload?.error ?? null};
        }
        case SET_CLASSES: {
            let classes: Array<Class> = action.payload?.classes!;
            classes.unshift({classId: "", name: "Select"});
            return {...state, CLA: classes};
        }
        case CLEAR_CLASSES: {
            let classes = [{classId: "", name: "Select"}];
            return {...state, CLA: classes};
        }
        case LOADING_REG_OPTIONS: {
            const isLoading = action.payload?.isLoading ?? false;
            return {...state, isLoadingRegOptions: isLoading};
        }
        case LOADING_REG_OPTIONS_FAILURE: {
            return {...state, errorLoadingRegOptions: action.payload?.error ?? null};
        }
        case SET_REG_OPTIONS: {
            return {...state, regOptions: action.payload?.regOptions ?? null};
        }
        default:
            return state;
    }
}
