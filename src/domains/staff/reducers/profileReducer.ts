import {
    CLEAR_USER_PASSWORD_FAILURE,
    CLEAR_USER_PROFILE_FAILURE, SET_USER_PASSWORD_UPDATED, SET_USER_PROFILE_UPDATED,
    UPDATING_USER_PASSWORD,
    UPDATING_USER_PASSWORD_FAILURE,
    UPDATING_USER_PROFILE,
    UPDATING_USER_PROFILE_FAILURE, UpdatingUserProfileActionTypes
} from "../actions/profileAction";

// Define the state interface
type ProfileState = {
    isProfileUpdating: boolean;
    isPasswordUpdating: boolean;
    errorUpdatingProfile: Error | null;
    errorUpdatingPassword: Error | null;
    message: string | null;
}

const initState: ProfileState = {
    isProfileUpdating: false,
    isPasswordUpdating: false,
    errorUpdatingProfile: null,
    errorUpdatingPassword: null,
    message: null
}

export const profileReducer = (state: ProfileState = initState, action: UpdatingUserProfileActionTypes): ProfileState => {
    switch (action.type) {
        case UPDATING_USER_PROFILE: {
            return {...state, isProfileUpdating: action.payload?.isUpdating ?? false};
        }
        case UPDATING_USER_PASSWORD: {
            return {...state, isPasswordUpdating: action.payload?.isUpdating ?? false};
        }
        case UPDATING_USER_PROFILE_FAILURE: {
            return {...state, errorUpdatingProfile: action.payload?.error ?? null};
        }
        case UPDATING_USER_PASSWORD_FAILURE: {
            return {...state, errorUpdatingPassword: action.payload?.error ?? null};
        }
        case CLEAR_USER_PROFILE_FAILURE: {
            return {...state, errorUpdatingProfile: null, message: null};
        }
        case CLEAR_USER_PASSWORD_FAILURE: {
            return {...state, errorUpdatingPassword: null, message: null};
        }
        case SET_USER_PROFILE_UPDATED: {
            return {...state, message: action.payload?.message ?? null};
        }
        case SET_USER_PASSWORD_UPDATED: {
            return {...state, message: action.payload?.message ?? null};
        }
        default:
            return state;
    }
}




