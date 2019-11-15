export const getUserInfo = (state) => {
    return state.userInfo;
}

export const getRole = (state) => {
    let userInfo = getUserInfo(state);
    if (!userInfo) return null;
    return state.userInfo.role;
}

export const isDepAdmin = (state) => {
    let allowed_roles = [
        "ROLE_DEP-ADMIN",
        "ROLE_FAC-ADMIN",
        "ROLE_ORG-ADMIN",
        "ROLE_GLOBAL-ADMIN"
    ];
    let actual_role = getRole(state);
    return allowed_roles.includes(actual_role);
}