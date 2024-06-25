import {Roles} from "../objects/Roles";

const dummy = {value: "", label: "Select"};

const forEdit = [
    {
        value: 'ROLE_LAB_ASSISTANT',
        label: 'ROLE_LAB_ASSISTANT'
    },
    {
        value: 'ROLE_INSTRUCTOR',
        label: 'ROLE_INSTRUCTOR'
    }
];
const forEditFacAdmin = [...forEdit, {value: 'ROLE_DEP_ADMIN', label: 'ROLE_DEP_ADMIN'}];
const forEditOrgAdmin = [...forEditFacAdmin, {value: 'ROLE_FAC_ADMIN', label: 'ROLE_FAC_ADMIN'}];
const forEditGlobalAdmin = [...forEditOrgAdmin, {value: 'ROLE_ORG_ADMIN', label: 'ROLE_ORG_ADMIN'}];

const forNew = [...forEdit, dummy];
const forNewFacAdmin = [...forEditFacAdmin, dummy];
const forNewOrgAdmin = [...forEditOrgAdmin, dummy];
const forNewGlobalAdmin = [...forEditGlobalAdmin, dummy];

const forFilter = {
    'ROLE_LAB_ASSISTANT': 'ROLE_LAB_ASSISTANT',
    'ROLE_INSTRUCTOR': 'ROLE_INSTRUCTOR',
    'ROLE_DEP_ADMIN': 'ROLE_DEP_ADMIN',
    'ROLE_FAC_ADMIN': 'ROLE_FAC_ADMIN',
    'ROLE_ORG_ADMIN': 'ROLE_ORG_ADMIN'
}

export const getRoles = (state) => {
    const userInfo = state.auth.userInfo;
    let roles = userInfo.role;
    switch (roles) {
        case 'ROLE_DEP_ADMIN':
            roles = new Roles(forNew, forEdit, forFilter);
            break;
        case 'ROLE_FAC_ADMIN':
            roles = new Roles(forNewFacAdmin, forEditFacAdmin, forFilter);
            break;
        case 'ROLE_ORG_ADMIN':
            roles = new Roles(forNewOrgAdmin, forEditOrgAdmin, forFilter);
            break;
        case 'ROLE_GLOBAL_ADMIN':
            roles = new Roles(forNewGlobalAdmin, forEditGlobalAdmin, forFilter);
            break;
        default:
            return new Roles([], [], []);
    }
    return roles;
}