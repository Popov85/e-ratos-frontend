const manageableByDepAdmin = ["ROLE_LAB-ASSISTANT","ROLE_INSTRUCTOR"];
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