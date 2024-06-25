const allowedRolesGlobalAdmin = ["ROLE_GLOBAL_ADMIN"];
const allowedRolesAtLeastOrgAdmin = [...allowedRolesGlobalAdmin, "ROLE_ORG_ADMIN"];
const allowedRolesAtLeastFacAdmin = [...allowedRolesAtLeastOrgAdmin, "ROLE_FAC_ADMIN"];
const allowedRolesAtLeastDepAdmin = [...allowedRolesAtLeastFacAdmin, "ROLE_DEP_ADMIN"];
const allowedRolesAtLeastInstructor = [...allowedRolesAtLeastDepAdmin, "ROLE_INSTRUCTOR"];

const initState = {
    logged: false,
    authorized: false,
    authorization: {},
    userInfo: {}
}

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "CHECKING_LOGGING": {
            return {...state, checkLogging: action.inProgress};
        }
        case "CHECKING_LOGGING_FAILURE": {
            console.warn("Failed to check logging, error = ", action.error);
            return {...state, errorCheckingLogging: action.error};
        }
        case "RESET_CHECKING_LOGGING_FAILURE": {
            return {...state, errorCheckingLogging: null};
        }
        case "LOGGING_IN": {
            return {...state, isLoggingIn: action.inProgress};
        }
        case "LOGGING_IN_FAILURE": {
            console.error("Failed to login, error = ", action.error);
            return {...state, errorLoggingIn: action.error};
        }
        case "RESET_LOGGING_IN_FAILURE": {
            return {...state, errorLoggingIn: null};
        }
        case "SET_LOGGED_IN": {
            const userInfo = action.payload;
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
        case "SET_LOGGED_OUT": {
            return {...state, logged: false, userInfo: {}};
        }
        case "SERVER_LOGGING_OUT": {
            return { ...state, isLoggingOut: action.isProgress };
        }
        case "SERVER_LOGGING_OUT_FAILURE": {
            console.log("Failed to logout, error = ", action.error);
            return { ...state, errorLoggingOut: action.error};
        }
        case "SERVER_RESET_LOGGING_OUT_FAILURE": {
            return { ...state, errorLoggingOut: null};
        }
        case "SET_AUTHORIZED": {
            return {...state, authorized: action.authorized};
        }
        case "UPDATE_USER_INFO": {
            return {...state, userInfo:
                    {...state.userInfo,
                        name: action.userInfo.name,
                        surname: action.userInfo.surname,
                        email: action.userInfo.email,
                    }};
        }
        default:
            return state;
    }
}