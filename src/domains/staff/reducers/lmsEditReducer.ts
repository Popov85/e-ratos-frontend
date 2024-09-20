import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveLMS, updateLMS } from '../actions/lmsEditActions'; // Import async thunks

type LMSEditState = {
    isLoading: boolean;
    errorMessage: string | null;
    successMessage: string | null;
};

const initialState: LMSEditState = {
    isLoading: false,
    errorMessage: null,
    successMessage: null,
};

const lmsEditSlice = createSlice({
    name: 'lmsEdit',
    initialState,
    reducers: {
        clearLMSState: (state) => {
            state.errorMessage = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveLMS.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })
            .addCase(saveLMS.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.successMessage = action.payload;
            })
            .addCase(saveLMS.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload as string;
            })
            .addCase(updateLMS.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
                state.successMessage = null;
            })
            .addCase(updateLMS.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.successMessage = action.payload;
            })
            .addCase(updateLMS.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload as string;
            });
    },
});

export const { clearLMSState } = lmsEditSlice.actions;
export const lmsEditReducer = lmsEditSlice.reducer;