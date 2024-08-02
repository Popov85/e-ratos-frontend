import {RootState} from "../../../store/rootReducer";
import {Mode, SchemeInfo} from "../types/SchemeInfo";
import {Context} from "../types/Context";
import {FinishInfo} from "../types/FinishInfo";

/**
 * This returns a convenience object to be passed around without the need to pass both
 * userInfo and schemeInfo simultaneously.
 * @param state
 */
export const getContext = (state: RootState): Context | null => {
    const { auth: { userInfo }, session: { schemeInfo } } = state;
    if (!userInfo || !schemeInfo.schemeInfo) return null;
    return {
        schemeId: schemeInfo.schemeInfo.schemeId,
        isLMS: userInfo?.lms ?? false
    } as Context;
}

export const getSchemeInfo = (state: RootState): SchemeInfo | null => {
    return state.session.schemeInfo.schemeInfo ?? null;
}

export const getMode = (state: RootState): Mode | null => {
    return state.session.schemeInfo.schemeInfo?.mode ?? null;
}

export const getResult = (state: RootState): FinishInfo | null => {
    return state.session.session.result ?? null;
}
