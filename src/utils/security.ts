import {SecurityRole} from "../domains/common/types/SecurityRole";
import {UserInfo} from "../domains/common/types/UserInfo";
import {Staff} from "../domains/staff/types/Staff";

const manageableByDepAdmin: Array<SecurityRole> = [SecurityRole.ROLE_LAB_ASSISTANT, SecurityRole.ROLE_INSTRUCTOR];
const manageableByFacAdmin: Array<SecurityRole> = [...manageableByDepAdmin, SecurityRole.ROLE_DEP_ADMIN];
const manageableByOrgAdmin: Array<SecurityRole> = [...manageableByFacAdmin, SecurityRole.ROLE_FAC_ADMIN];
const manageableByGlobalAdmin: Array<SecurityRole> = [...manageableByOrgAdmin, SecurityRole.ROLE_ORG_ADMIN];

/**
 * Is the role manageable by myself?
 * Or can I manage smth. allowed for me based on my role?
 * @param role
 * @param actualRole
 * @returns {boolean}
 */
export const isRoleManageable = (role: SecurityRole, actualRole: SecurityRole): boolean => {
    switch (actualRole) {
        case SecurityRole.ROLE_DEP_ADMIN:
            return manageableByDepAdmin.some((item: SecurityRole) => role.includes(item));
        case SecurityRole.ROLE_FAC_ADMIN:
            return manageableByFacAdmin.some((item: SecurityRole) => role.includes(item));
        case SecurityRole.ROLE_ORG_ADMIN:
            return manageableByOrgAdmin.some((item: SecurityRole) => role.includes(item));
        case SecurityRole.ROLE_GLOBAL_ADMIN:
            return manageableByGlobalAdmin.some((item: SecurityRole) => role.includes(item));
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
export const isEditable = (authenticated: UserInfo, staff: Staff, access: any): boolean => {
    if (access.name === 'dep-private') return true;
    return (staff.staffId === authenticated.userId)
}

/**
 * Generates LTI client secret programmatically;
 * For this we use, about 70 symbols
 * @param length
 * @returns {string} client secret for LTI tool consumer
 */
export const generateClientSecret = (length: number) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}