

export const getContext = (state) => {
    const {panelInfo, schemeInfo} = state;
    let context = {};
    context.schemeId = schemeInfo.schemeId;
    context.isLMS = panelInfo.lms;
    return context;
}

export const getMode = (state) => {
    return state.schemeInfo.mode;
}
