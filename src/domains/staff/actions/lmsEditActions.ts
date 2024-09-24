import {lmsAPI} from "../_api/lmsAPI";
import {LMS} from "../types/LMS";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {addLMSInStore, updateLMSInStore} from "../reducers/lmsReducer";

// Async thunk for saving LMS
export const saveLMS = createAsyncThunk<string, LMS,  { rejectValue: string }>(
    'lmsEdit/saveLMS',
    async (lms: LMS, { dispatch, rejectWithValue }) => {
        try {
            const savedLMS: LMS = await lmsAPI.saveLMS(lms); // Await the promise
            dispatch(addLMSInStore(savedLMS));  // Dispatch action on success
            return 'Successfully added an LMS!';  // Return success message
        } catch (e: any) {
            console.warn("Error saving LMS!", e);
            return rejectWithValue((e as Error).message);  // Pass the error message
        }
    }
);

// Async thunk for updating LMS
export const updateLMS = createAsyncThunk<string, LMS,  { rejectValue: string }>(
    'lmsEdit/updateLMS',
    async (lms: LMS, { dispatch, rejectWithValue }) => {
        try {
            const updatedLMS: LMS = await lmsAPI.updateLMS(lms); // Await the API call
            dispatch(updateLMSInStore(updatedLMS));  // Dispatch the action to store the updated LMS
            return 'Successfully updated the LMS!';  // Return success message
        } catch (e: any) {
            console.warn("Error updating LMS!", e);
            return rejectWithValue((e as Error).message);  // Pass the error message
        }
    }
);
