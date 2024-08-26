import {profileAPI} from "../_api/profileAPI";
import {updateUserProfile} from "../../common/actions/authActions";
import {Profile} from "../types/Profile";
import {GenericAction} from "../../common/types/GenericAction";
import {Dispatch} from "redux";
import {Password} from "../types/Password";

export const UPDATING_USER_PROFILE = "UPDATING_USER_PROFILE" as const;
export const UPDATING_USER_PROFILE_FAILURE = "UPDATING_USER_PROFILE_FAILURE" as const;
export const CLEAR_USER_PROFILE_FAILURE = "CLEAR_USER_PROFILE_FAILURE" as const;
export const SET_USER_PROFILE_UPDATED = "SET_USER_PROFILE_UPDATED" as const;

export const UPDATING_USER_PASSWORD = "UPDATING_USER_PASSWORD" as const;
export const UPDATING_USER_PASSWORD_FAILURE = "UPDATING_USER_PASSWORD_FAILURE" as const;
export const SET_USER_PASSWORD_UPDATED = "SET_USER_PASSWORD_UPDATED" as const;
export const CLEAR_USER_PASSWORD_FAILURE = "CLEAR_USER_PASSWORD_FAILURE" as const;

// Action types using GenericAction
export type UpdatingUserProfileAction = GenericAction<typeof UPDATING_USER_PROFILE, { isUpdating: boolean }>;
export type UpdatingUserProfileFailureAction = GenericAction<typeof UPDATING_USER_PROFILE_FAILURE, { error: Error }>;
export type ClearUserProfileFailuresAction = GenericAction<typeof CLEAR_USER_PROFILE_FAILURE>;
export type SetUserprofileUpdatedAction = GenericAction<typeof SET_USER_PROFILE_UPDATED, { message: string }>;

export type UpdatingUserPasswordAction = GenericAction<typeof UPDATING_USER_PASSWORD, { isUpdating: boolean }>;
export type UpdatingUserPasswordFailureAction = GenericAction<typeof UPDATING_USER_PASSWORD_FAILURE, { error: Error }>;
export type ClearUserPasswordFailuresAction = GenericAction<typeof CLEAR_USER_PASSWORD_FAILURE>;
export type SetUserPasswordUpdatedAction = GenericAction<typeof SET_USER_PASSWORD_UPDATED, { message: string }>;

// Union type for all actions
export type UpdatingUserProfileActionTypes =
    | UpdatingUserProfileAction
    | UpdatingUserProfileFailureAction
    | ClearUserProfileFailuresAction
    | SetUserprofileUpdatedAction
    | UpdatingUserPasswordAction
    | UpdatingUserPasswordFailureAction
    | ClearUserPasswordFailuresAction
    | SetUserPasswordUpdatedAction


// Action creators using the generic type
const updatingUserProfile = (isUpdating: boolean): UpdatingUserProfileAction => ({
    type: UPDATING_USER_PROFILE,
    payload: {isUpdating},
});

const updatingUserProfileFailure = (error: Error): UpdatingUserProfileActionTypes => ({
    type: UPDATING_USER_PROFILE_FAILURE,
    payload: {error},
});

export const clearUserProfileFailure = (): ClearUserProfileFailuresAction => ({
    type: CLEAR_USER_PROFILE_FAILURE
});

export const setUserProfileUpdated = (message: string): SetUserprofileUpdatedAction => ({
    type: SET_USER_PROFILE_UPDATED,
    payload: {message}
});

const updatingUserPassword = (isUpdating: boolean): UpdatingUserPasswordAction => ({
    type: UPDATING_USER_PASSWORD,
    payload: {isUpdating},
});

export const updatingUserPasswordFailure = (error: Error): UpdatingUserPasswordFailureAction => ({
    type: UPDATING_USER_PASSWORD_FAILURE,
    payload: {error}
});

export const clearUserPasswordFailure = () :ClearUserPasswordFailuresAction  => ({
    type: CLEAR_USER_PASSWORD_FAILURE
});

export const setUserPasswordUpdated= (message: string): SetUserPasswordUpdatedAction => ({
    type: SET_USER_PASSWORD_UPDATED,
    payload: {message}
});


export const getProfileUpdated = (profile: Profile) => {
    return (dispatch: Dispatch<UpdatingUserProfileActionTypes> | any): void => {
        dispatch(clearUserProfileFailure());
        dispatch(updatingUserProfile(true));
        profileAPI.updateProfile(profile)
            .then((status: number): void => {
                if (status >= 200 && status < 300) {
                    dispatch(updateUserProfile(profile));
                    dispatch(setUserProfileUpdated("Successfully updated profile!"));
                } else {
                    throw new Error("Failed to execute API to update profile!");
                }
        }).catch((e: Error): void => {
            console.warn("Error updating user profile!", e);
            dispatch(updatingUserProfileFailure(new Error("Failed to update profile")));
        }).finally(() => dispatch(updatingUserProfile(false)));
    }
}

export const getPasswordUpdated = (password: Password) => {
    return (dispatch: Dispatch<UpdatingUserProfileActionTypes> | any): void => {
        dispatch(clearUserPasswordFailure());
        dispatch(updatingUserPassword(true));
        profileAPI.updatePassword(password)
            .then((status: number): void => {
                if (status >= 200 && status < 300) {
                    dispatch(setUserPasswordUpdated("Successfully updated password!"));
                } else {
                    throw new Error("Failed to execute API to update password!");
                }
        }).catch((e: Error): void => {
            console.warn("Error updating user password!", e);
            dispatch(updatingUserPasswordFailure(new Error("Failed to update password")));
        }).finally(() => dispatch(updatingUserPassword(false)));
    }
}
