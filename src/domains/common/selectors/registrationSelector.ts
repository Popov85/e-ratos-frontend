import {RootState} from "../../../store/rootReducer";
import {SavedCredentials} from "../types/SavedCredentials";

export const getOrgIdSelector = (state: RootState): number | null => {
    const { DO } = state.registration;
    return state.registration.DO ?? null;
}

export const getSavedCredentialsSelector = (state: RootState): SavedCredentials | null => {
    return state.registration.savedCredentials ?? null;
}

export const isLMSSelector = (state: RootState): boolean => {
    return state.registration.regOptions?.lms ?? false;
};
