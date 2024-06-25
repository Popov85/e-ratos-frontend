export const getOrgId = (state) => {
    const {DO} = state.registration;
    return DO ? DO.orgId : null;
}

export const getSavedCredentials = (state) => {
    return state.registration.savedCredentials
}

export const isLMS = (state) => {
    return state.registration.regOptions.lms;
}