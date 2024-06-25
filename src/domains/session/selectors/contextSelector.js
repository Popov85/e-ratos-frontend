/**
 * This returns a convenience object to be passed around without the need to pass both
 * userInfo and schemeInfo simultaneously.
 * @param state
 */
export const getContext = (state) => {
    const { auth: { userInfo }, session: { schemeInfo } } = state;
    return {
        schemeId: schemeInfo.schemeInfo.schemeId,
        isLMS: userInfo.lms
    };
}

export const getUserInfo = (state) => {
    return state.auth.userInfo;
}

export const getSchemeInfo = (state) => {
    return state.session.schemeInfo.schemeInfo;
}

export const isLMS = (state) => {
    return state.auth.userInfo.lms;
}

export const getMode = (state) => {
    return state.session.schemeInfo.schemeInfo.mode;
}
