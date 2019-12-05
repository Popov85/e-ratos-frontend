/**
 * This returns a convenience object to be passed around without the need to pass both
 * userInfo and schemeInfo simultaneously.
 * @param state
 */
export const getContext = (state) => {
    const {userInfo, schemeInfo} = state;
    let context = {};
    context.schemeId = schemeInfo.schemeId;
    context.isLMS = userInfo.authenticated.lms;
    return context;
}

export const getUserInfo = (state) => {
    return state.userInfo;
}

export const getSchemeInfo = (state) => {
    return state.schemeInfo;
}

export const isLMS = (state) => {
    return state.userInfo.lms;
}

export const getMode = (state) => {
    return state.schemeInfo.mode;
}
