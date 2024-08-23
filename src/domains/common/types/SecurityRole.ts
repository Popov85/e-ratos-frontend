export enum SecurityRole {
    ROLE_LTI = 'ROLE_LTI',
    ROLE_LMS_USER = 'ROLE_LMS_USER',
    ROLE_STUDENT = 'ROLE_STUDENT',
    ROLE_INSTRUCTOR = 'ROLE_INSTRUCTOR',
    ROLE_LAB_ASSISTANT = 'ROLE_LAB_ASSISTANT',
    ROLE_DEP_ADMIN = 'ROLE_DEP_ADMIN',
    ROLE_FAC_ADMIN = 'ROLE_FAC_ADMIN',
    ROLE_ORG_ADMIN = 'ROLE_ORG_ADMIN',
    ROLE_GLOBAL_ADMIN = 'ROLE_GLOBAL_ADMIN'
}

export const getSecurityRole = (role: string): SecurityRole | Array<SecurityRole> => {
    return role in SecurityRole
        ? SecurityRole[role as keyof typeof SecurityRole]
        : [];
};
