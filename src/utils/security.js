const manageableByDepAdmin = ["ROLE_LAB_ASSISTANT", "ROLE_INSTRUCTOR"];
const manageableByFacAdmin = [...manageableByDepAdmin, "ROLE_DEP_ADMIN"];
const manageableByOrgAdmin = [...manageableByFacAdmin, "ROLE_FAC_ADMIN"];
const manageableByGlobalAdmin = [...manageableByOrgAdmin, "ROLE_ORG_ADMIN"];

/**
 * Is the role manageable by myself?
 * Or can I manage smth. allowed for me based on my role?
 * @param role
 * @param actualRole
 * @returns {boolean}
 */
export const isRoleManageable = (role, actualRole) => {
    switch (actualRole) {
        case 'ROLE_DEP_ADMIN':
            return manageableByDepAdmin.some(item => role.includes(item));
        case 'ROLE_FAC_ADMIN':
            return manageableByFacAdmin.some(item => role.includes(item));
        case 'ROLE_ORG_ADMIN':
            return manageableByOrgAdmin.some(item => role.includes(item));
        case 'ROLE_GLOBAL_ADMIN':
            return manageableByGlobalAdmin.some(item => role.includes(item));
        default:
            return false;
    }
}

/**
 * Is cell editable inside a table based on private/dep-private security settings
 * @param authenticated
 * @param staff
 * @param access
 * @returns {boolean}
 */
export const isEditable = (authenticated, staff, access) => {
    if (access.name === 'dep-private') return true;
    return (staff.staffId === authenticated.userId)
}

/**
 * Generates LTI client secret programmatically;
 * For this we use, about 70 symbols
 * @deprecated
 * @param length
 * @returns {string} client secret for LTI tool consumer
 */
export const generateClientSecret = length => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}