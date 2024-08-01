import {RootState} from "../../../store/rootReducer";
import {Mode, SchemeInfo} from "../types/SchemeInfo";
import {UserInfo} from "../../common/types/UserInfo";
import {Context} from "../types/Context";

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

export const getUserInfo = (state: RootState): UserInfo | null => {
    return state.auth.userInfo;
}

export const getSchemeInfo = (state: RootState): SchemeInfo | null => {
    return state.session.schemeInfo.schemeInfo ?? null;
}

export const isLMS = (state: RootState): boolean => {
    return state.auth.userInfo?.lms ?? false;
}

export const getMode = (state: RootState): Mode | null => {
    return state.session.schemeInfo.schemeInfo?.mode ?? null;
}
