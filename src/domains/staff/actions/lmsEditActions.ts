import {lmsAPI} from "../_api/lmsAPI";
import {addLMSInStore, updateLMSInStore} from "./lmsActions";
import {LMS} from "../types/LMS";
import {createAsyncThunk} from "@reduxjs/toolkit";

// Async thunk for saving LMS
export const saveLMS = createAsyncThunk(
    'lmsEdit/saveLMS',
    async (lms: LMS, { dispatch, rejectWithValue }) => {
        return lmsAPI.saveLMS(lms)
            .then((savedLMS: LMS): string => {
                dispatch(addLMSInStore(savedLMS));
                return 'Successfully added an LMS!';
            })
            .catch((error: Error) => {
                console.warn("Error saving LMS!", error);
                return rejectWithValue('Failed to save LMS');
            });
    }
);

// Async thunk for updating LMS
export const updateLMS = createAsyncThunk(
    'lmsEdit/updateLMS',
    async (lms: LMS, { dispatch, rejectWithValue }) => {
        return lmsAPI.updateLMS(lms)
            .then((updatedLMS: LMS): string => {
                dispatch(updateLMSInStore(updatedLMS));  // Dispatch success action
                return 'Successfully updated the LMS!';  // Return success message
            })
            .catch((error: Error) => {
                console.warn("Error updating LMS!", error);
                return rejectWithValue('Failed to update LMS');  // Handle error
            });
    }
);
