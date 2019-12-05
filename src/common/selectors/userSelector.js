export const getUserInfo = (state) => {
    return state.userInfo;
}

export const getRole = (state) => {
    let userInfo = getUserInfo(state);
    if (!userInfo) return null;
    return state.userInfo.role;
}