import {
    CHECKING_LOGGING,
    CHECKING_LOGGING_FAILURE,
    RESET_CHECKING_LOGGING_FAILURE,
    LOGGING_IN,
    LOGGING_IN_FAILURE,
    RESET_LOGGING_IN_FAILURE,
    SET_LOGGED_IN,
    SET_LOGGED_OUT,
    SET_AUTHORIZED,
    UPDATE_USER_INFO,
    SERVER_LOGGING_OUT,
    SERVER_LOGGING_OUT_FAILURE,
    SERVER_RESET_LOGGING_OUT_FAILURE,
    AuthActionTypes
} from "../actions/authActions";
import {UserInfo} from "../types/UserInfo";
import {SecurityRole} from "../types/SecurityRole";

const allowedRolesGlobalAdmin: SecurityRole[] = [SecurityRole.ROLE_GLOBAL_ADMIN];
const allowedRolesAtLeastOrgAdmin: SecurityRole[] = [...allowedRolesGlobalAdmin, SecurityRole.ROLE_ORG_ADMIN];
const allowedRolesAtLeastFacAdmin: SecurityRole[] = [...allowedRolesAtLeastOrgAdmin, SecurityRole.ROLE_FAC_ADMIN];
const allowedRolesAtLeastDepAdmin: SecurityRole[] = [...allowedRolesAtLeastFacAdmin, SecurityRole.ROLE_DEP_ADMIN];
const allowedRolesAtLeastInstructor: SecurityRole[] = [...allowedRolesAtLeastDepAdmin, SecurityRole.ROLE_INSTRUCTOR];

type State = {
    logged: boolean;
    authorized: boolean;
    authorization: Partial<Authorization> | null;
    userInfo: Partial<UserInfo> | null;
    checkLogging: boolean;
    errorCheckingLogging: Error | null;
    isLoggingIn: boolean;
    errorLoggingIn: Error | null;
    isLoggingOut: boolean;
    errorLoggingOut: Error | null;
}

const initState: State = {
    logged: false,
    authorized: false,
    authorization: null,
    userInfo: null,
    checkLogging: false,
    errorCheckingLogging: null,
    isLoggingIn: false,
    errorLoggingIn: null,
    isLoggingOut: false,
    errorLoggingOut: null
};

export const authReducer = (state: State = initState, action: AuthActionTypes): State => {
    switch (action.type) {
        case CHECKING_LOGGING: {
            const inProgress = action.payload?.inProgress ?? false;
            return {...state, checkLogging: inProgress};
        }
        case CHECKING_LOGGING_FAILURE: {
            console.warn("Failed to check logging, error = ", action.payload?.error);
            return {...state, errorCheckingLogging: action.payload?.error ?? null};
        }
        case RESET_CHECKING_LOGGING_FAILURE: {
            return {...state, errorCheckingLogging: null};
        }
        case LOGGING_IN: {
            const inProgress = action.payload?.inProgress ?? false;
            return {...state, isLoggingIn: inProgress};
        }
        case LOGGING_IN_FAILURE: {
            console.error("Failed to login, error = ", action.payload?.error);
            return {...state, errorLoggingIn: action.payload?.error ?? null};
        }
        case RESET_LOGGING_IN_FAILURE: {
            return {...state, errorLoggingIn: null};
        }
        case SET_LOGGED_IN: {
            const userInfo: UserInfo = action.payload!;
            return {
                ...state,
                logged: true,
                userInfo: userInfo,
                authorization: {
                    isGlobalAdmin: allowedRolesGlobalAdmin.includes(userInfo.role),
                    isAtLeastOrgAdmin: allowedRolesAtLeastOrgAdmin.includes(userInfo.role),
                    isAtLeastFacAdmin: allowedRolesAtLeastFacAdmin.includes(userInfo.role),
                    isAtLeastDepAdmin: allowedRolesAtLeastDepAdmin.includes(userInfo.role),
                    isAtLeastInstructor: allowedRolesAtLeastInstructor.includes(userInfo.role)
                }
            };
        }
        case SET_LOGGED_OUT: {
            return {...state, logged: false, userInfo: null, authorization: {}};
        }
        case SERVER_LOGGING_OUT: {
            const isProgress = action.payload?.isProgress ?? false;
            return {...state, isLoggingOut: isProgress};
        }
        case SERVER_LOGGING_OUT_FAILURE: {
            console.log("Failed to logout, error = ", action.payload?.error);
            return {...state, errorLoggingOut: action.payload?.error ?? null};
        }
        case SERVER_RESET_LOGGING_OUT_FAILURE: {
            return {...state, errorLoggingOut: null};
        }
        case SET_AUTHORIZED: {
            return {...state, authorized: action.payload?.authorized!};
        }
        case UPDATE_USER_INFO: {
            let userInfo = action.payload;
            if (!userInfo) {
                return state;
            }
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    name: userInfo.name,
                    surname: userInfo.surname,
                    email: userInfo.email,
                }
            };
        }
        default:
            return state;
    }
};
