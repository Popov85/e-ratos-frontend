// Initial state
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LMSDropDown} from "../_api/lmsAPI";
import {LMS} from "../types/LMS";
import {
    deleteLMS,
    getAllLMSByOrganisation,
    getAllLMSByOrganisationId,
    getLMSesByOrganisationForDropDown,
    updateLMSName
} from "../actions/lmsActionsRTK";

// Define the state interface
type LMSState = {
    content: Array<LMS>;
    contentMin: Array<LMSDropDown>;
    isLoading: boolean;
    isUpdating: boolean;
    error: string | null;
    errorUpdate: string | null;
}

const initState: LMSState = {
    content: [] as Array<LMS>,
    contentMin: [] as Array<LMSDropDown>,
    isLoading: false,
    isUpdating: false,
    error: null,
    errorUpdate: null,
};

// LMS slice
const lmsSlice = createSlice({
    name: "lms",
    initialState: initState,
    reducers: {
        clearLoadingFailure(state) {
            state.error = null;
        },
        clearUpdatingFailure(state) {
            state.errorUpdate = null;
        },
        clearAllLMSFailures(state) {
            state.error = null;
            state.errorUpdate = null;
        },
        addLMSInStore(state, action: PayloadAction<LMS>) {
            state.content.push(action.payload);
        },
        updateLMSInStore(state, action: PayloadAction<LMS>) {
            const lms = action.payload;
            state.content = state.content.map((l) => (l.lmsId === lms.lmsId ? lms : l));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllLMSByOrganisation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllLMSByOrganisation.fulfilled, (state, action: PayloadAction<Array<LMS>>) => {
                state.isLoading = false;
                state.content = action.payload;
            })
            .addCase(getAllLMSByOrganisation.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllLMSByOrganisationId.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllLMSByOrganisationId.fulfilled, (state, action: PayloadAction<Array<LMS>>) => {
                state.isLoading = false;
                state.content = action.payload;
            })
            .addCase(getAllLMSByOrganisationId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateLMSName.pending, (state) => {
                state.isUpdating = true;
            })
            .addCase(updateLMSName.fulfilled, (state, action: PayloadAction<{ lmsId: number; name: string }>) => {
                state.isUpdating = false;
                const { lmsId, name } = action.payload;
                state.content = state.content.map((lms) => (lms.lmsId === lmsId ? { ...lms, name } : lms));
            })
            .addCase(updateLMSName.rejected, (state, action) => {
                state.isUpdating = false;
                state.errorUpdate = action.payload as string;
            })
            .addCase(deleteLMS.pending, (state) => {
                state.isUpdating = true;
            })
            .addCase(deleteLMS.fulfilled, (state, action: PayloadAction<number>) => {
                state.isUpdating = false;
                state.content = state.content.filter((lms) => lms.lmsId !== action.payload);
            })
            .addCase(deleteLMS.rejected, (state, action) => {
                state.isUpdating = false;
                state.errorUpdate = action.payload as string;
            })
            .addCase(getLMSesByOrganisationForDropDown.fulfilled, (state, action: PayloadAction<Array<LMSDropDown>>) => {
                state.contentMin = action.payload;
            })
            .addCase(getLMSesByOrganisationForDropDown.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const {
    clearLoadingFailure,
    clearUpdatingFailure,
    clearAllLMSFailures,
    addLMSInStore,
    updateLMSInStore,
} = lmsSlice.actions;

export default lmsSlice.reducer;