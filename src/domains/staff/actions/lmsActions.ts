import {createAsyncThunk} from "@reduxjs/toolkit";
import {lmsAPI, LMSDropDown} from "../_api/lmsAPI";
import {LMS} from "../types/LMS";

// Async thunks
export const getAllLMSByOrganisation = createAsyncThunk<LMS[], void,  { rejectValue: string }>(
    "lms/getAllLMSByOrganisation",
    async (_, { rejectWithValue }) => {
        try {
            const lmses: LMS[] = await lmsAPI.fetchAllLMSByOrganisationForTable();
            return lmses;
        } catch (e: any) {
            console.warn("Error fetching all org. LMS-es!", e);
            return rejectWithValue((e as Error).message);
        }
    }
);

export const getLMSesByOrganisationForDropDown = createAsyncThunk<LMSDropDown[], void,  { rejectValue: string }>(
    "lms/getLMSesByOrganisationForDropDown",
    async (_, { rejectWithValue }) => {
        try {
            const lmses: LMSDropDown[] = await lmsAPI.fetchAllLMSByOrganisationForDropDown();
            return lmses;
        } catch (e: any) {
            console.warn("Error fetching all org. LMS-es for drop down!", e);
            return rejectWithValue((e as Error).message);
        }
    }
);

export const getAllLMSByOrganisationId = createAsyncThunk<LMS[], number,  { rejectValue: string }>(
    "lms/getAllLMSByOrganisationId",
    async (orgId: number, { rejectWithValue }) => {
        try {
            const lmses: LMS[] = await lmsAPI.fetchAllLMSByOrganisationIdForTable(orgId);
            return lmses;
        } catch (e: any) {
            console.warn("Error fetching LMS by orgId!", e);
            return rejectWithValue((e as Error).message);
        }
    }
);

export const updateLMSName = createAsyncThunk<{ lmsId: number; name: string }, { lmsId: number; name: string },  { rejectValue: string }>(
    "lms/updateLMSName",
    async ({ lmsId, name }: { lmsId: number; name: string }, { rejectWithValue }) => {
        try {
            await lmsAPI.updateLMSName(lmsId, name);
            return { lmsId, name };
        } catch (e: any) {
            console.warn("Error updating LMS name!", e);
            return rejectWithValue((e as Error).message);
        }
    }
);

export const deleteLMS = createAsyncThunk<number, number,  { rejectValue: string }>(
    "lms/deleteLMS",
    async (lmsId: number, { rejectWithValue }) => {
        try {
            await lmsAPI.deleteLMS(lmsId);
            return lmsId;
        } catch (e: any) {
            console.warn("Error deleting LMS!", e);
            return rejectWithValue((e as Error).message);
        }
    }
);