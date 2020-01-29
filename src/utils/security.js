const manageableByDepAdmin = ["ROLE_LAB-ASSISTANT", "ROLE_INSTRUCTOR"];
const manageableByFacAdmin = [...manageableByDepAdmin, "ROLE_DEP-ADMIN"];
const manageableByOrgAdmin = [...manageableByFacAdmin, "ROLE_FAC-ADMIN"];
const manageableByGlobalAdmin = [...manageableByOrgAdmin, "ROLE_ORG-ADMIN"];

/**
 * Is the role manageable by myself?
 * Or can I manage smth. allowed for me based on my role?
 * @param role
 * @param authenticated
 * @returns {boolean}
 */
export const isRoleManageable = (role, authenticated) => {
    switch (authenticated.role) {
        case 'ROLE_DEP-ADMIN':
            return manageableByDepAdmin.includes(role);
        case 'ROLE_FAC-ADMIN':
            return manageableByFacAdmin.includes(role);
        case 'ROLE_ORG-ADMIN':
            return manageableByOrgAdmin.includes(role);
        case 'ROLE_GLOBAL-ADMIN':
            return manageableByGlobalAdmin.includes(role);
        default:
            throw new Error("Failed to determine roles set based on current user role");
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