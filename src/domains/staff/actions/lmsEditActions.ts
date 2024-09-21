import {lmsAPI} from "../_api/lmsAPI";
import {addLMSInStore, updateLMSInStore} from "./lmsActions";
import {LMS} from "../types/LMS";
import {createAsyncThunk} from "@reduxjs/toolkit";

// Async thunk for saving LMS
export const saveLMS = createAsyncThunk(
    'lmsEdit/saveLMS',
    async (lms: LMS, { dispatch, rejectWithValue }) => {
        try {
            const savedLMS: LMS = await lmsAPI.saveLMS(lms); // Await the promise
            dispatch(addLMSInStore(savedLMS));  // Dispatch action on success
            return 'Successfully added an LMS!';  // Return success message
        } catch (error: any) {
            console.warn("Error saving LMS!", error);
            return rejectWithValue('Failed to save LMS');  // Pass the error message
        }
    }
);

// Async thunk for updating LMS
export const updateLMS = createAsyncThunk(
    'lmsEdit/updateLMS',
    async (lms: LMS, { dispatch, rejectWithValue }) => {
        try {
            const updatedLMS: LMS = await lmsAPI.updateLMS(lms); // Await the API call
            dispatch(updateLMSInStore(updatedLMS));  // Dispatch the action to store the updated LMS
            return 'Successfully updated the LMS!';  // Return success message
        } catch (error: any) {
            console.warn("Error updating LMS!", error);
            return rejectWithValue('Failed to update LMS');  // Handle the error
        }
    }
);
