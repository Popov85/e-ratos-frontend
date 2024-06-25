import {profileAPI} from "../../common/_api/profileAPI";
import {updateUserInfo} from "../../common/actions/authActions";

const UPDATING_USER_PROFILE = "UPDATING_USER_PROFILE";
const UPDATING_USER_PROFILE_FAILURE = "UPDATING_USER_PROFILE_FAILURE";

const UPDATING_USER_PASSWORD = "UPDATING_USER_PASSWORD";
const UPDATING_USER_PASSWORD_FAILURE = "UPDATING_USER_PASSWORD_FAILURE";

const SET_USER_PROFILE_UPDATED = "SET_USER_PROFILE_UPDATED";
const SET_USER_PASSWORD_UPDATED = "SET_USER_PASSWORD_UPDATED";

const CLEAR_USER_PROFILE_FAILURE = "CLEAR_USER_PROFILE_FAILURE";
const CLEAR_USER_PASSWORD_FAILURE = "CLEAR_USER_PASSWORD_FAILURE";

export const updatingUserProfile = isUpdating => ({type: UPDATING_USER_PROFILE, isUpdating});
export const updatingUserProfileFailure = error => ({type: UPDATING_USER_PROFILE_FAILURE, error});

export const updatingUserPassword = isUpdating => ({type: UPDATING_USER_PASSWORD, isUpdating});
export const updatingUserPasswordFailure = error => ({type: UPDATING_USER_PASSWORD_FAILURE, error});

export const setUserProfileUpdated = (message) => ({type: SET_USER_PROFILE_UPDATED, payload: message});
export const setUserPasswordUpdated = (message) => ({type: SET_USER_PASSWORD_UPDATED, payload: message});

export const clearUserProfileFailure = () => ({type: CLEAR_USER_PROFILE_FAILURE});
export const clearUserPasswordFailure = () => ({type: CLEAR_USER_PASSWORD_FAILURE});


export const getProfileUpdated = (profile) => {
    return (dispatch) => {
        dispatch(clearUserProfileFailure());
        dispatch(updatingUserProfile(true));
        profileAPI.updateProfile(profile).then(() => {
            dispatch(updateUserInfo(profile));
            dispatch(setUserProfileUpdated("Successfully updated profile!"));
        }).catch(e => {
            dispatch(updatingUserProfileFailure(new Error("Failed to update profile")));
        }).finally(() => dispatch(updatingUserProfile(false)));
    }
}

export const getPasswordUpdated = (passwords) => {
    return (dispatch) => {
        dispatch(clearUserPasswordFailure());
        dispatch(updatingUserPassword(true));
        profileAPI.updatePassword(passwords).then(() => {
            dispatch(setUserPasswordUpdated("Successfully updated password!"));
        }).catch(e => {
            dispatch(updatingUserPasswordFailure(new Error("Failed to update password")));
        }).finally(() => dispatch(updatingUserPassword(false)));
    }
}
