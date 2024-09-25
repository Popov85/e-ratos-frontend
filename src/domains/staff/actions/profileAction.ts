// Async thunks for profile update
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Profile} from "../types/Profile";
import {profileAPI} from "../_api/profileAPI";
import {updateUserProfile} from "../../common/actions/authActions";
import {Password} from "../types/Password";


export const getProfileUpdated  = createAsyncThunk<void, Profile, { rejectValue: string }>(
    'profile/updateProfile',
    async (profile, { dispatch, rejectWithValue }) => {
        try {
            await profileAPI.updateProfile(profile);
            dispatch(updateUserProfile(profile)); // Dispatching external action
        } catch (e: any) {
            console.warn("Error updating user profile!", e);
            return rejectWithValue((e as Error).message);
        }
    }
);

// Async thunks for password update
export const getPasswordUpdated  = createAsyncThunk<void, Password, { rejectValue: string }>(
    'profile/updatePassword',
    async (password, { rejectWithValue }) => {
        try {
            await profileAPI.updatePassword(password);
        } catch (e: any) {
            console.warn("Error updating user password!", e);
            return rejectWithValue((e as Error).message);
        }
    }
);