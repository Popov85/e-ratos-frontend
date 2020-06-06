import {dev} from "../../profile";

const allowedRolesGlobalAdmin = ["ROLE_GLOBAL-ADMIN"];
const allowedRolesAtLeastOrgAdmin = [...allowedRolesGlobalAdmin, "ROLE_ORG-ADMIN"];
const allowedRolesAtLeastFacAdmin = [...allowedRolesAtLeastOrgAdmin, "ROLE_FAC-ADMIN"];
const allowedRolesAtLeastDepAdmin = [...allowedRolesAtLeastFacAdmin, "ROLE_DEP-ADMIN"];
const allowedRolesAtLeastInstructor = [...allowedRolesAtLeastDepAdmin, "ROLE_INSTRUCTOR"];

const testInitState = {
    "authenticated": {
        "userId": 1,
        "name": "Daniel",
        "surname": "Naroditsky",
        "email": "staff.staff@example.com",
        "role": "ROLE_GLOBAL-ADMIN",
        "lms": false,
        "staff": {
            "position": {
                "posId": 1,
                "name": "System admin"
            },
            "department": {
                "depId": 1,
                "name": "Department",
                "faculty": {
                    "facId": 1,
                    "name": "Faculty",
                    "organisation" : {
                        "orgId": 1,
                        "name": "Organisation",
                    }
                }
            }
        },
        isGlobalAdmin:true,
        isAtLeastOrgAdmin: true,
        isAtLeastFacAdmin: true,
        isAtLeastDepAdmin: true,
        isAtLeastInstructor: true
    }
}

const initState = {
    authenticated: null
}

export const userReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "LOADING_USER_INFO": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_USER_INFO_FAILURE": {
            return {...state, errorUser: action.error};
        }
        case "SET_USER_INFO": {
            let authenticated = action.payload;
            let actual_role = authenticated.role;
            authenticated.isGlobalAdmin = allowedRolesGlobalAdmin.includes(actual_role);
            authenticated.isAtLeastOrgAdmin = allowedRolesAtLeastOrgAdmin.includes(actual_role);
            authenticated.isAtLeastFacAdmin = allowedRolesAtLeastFacAdmin.includes(actual_role);
            authenticated.isAtLeastDepAdmin = allowedRolesAtLeastDepAdmin.includes(actual_role);
            authenticated.isAtLeastInstructor = allowedRolesAtLeastInstructor.includes(actual_role);
            return {authenticated};
        }
        case "UPDATE_USER_PROFILE": {
            const {name, surname, email} = action.payload;
            return {...state, authenticated: {...state.authenticated, name, surname, email}};
        }
        case "CLEAR_USER_INFO": {
            return {...state, authenticated: null};
        }
        default:
            return state;
    }
}