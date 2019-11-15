
export const getContext = (state) => {
    const {userInfo, schemeInfo} = state;
    let context = {};
    context.schemeId = schemeInfo.schemeId;
    context.isLMS = userInfo.lms;
    return context;
}

export const isLMS = (state) => {
    return state.userInfo.lms;
}

export const getMode = (state) => {
    return state.schemeInfo.mode;
}
