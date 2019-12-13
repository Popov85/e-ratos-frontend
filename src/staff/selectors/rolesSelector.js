import {Roles} from "../objects/Roles";

const dummy = {value: "", label: "Select"};

const forEdit = [
    {
        value: 'ROLE_LAB-ASSISTANT',
        label: 'ROLE_LAB-ASSISTANT'
    },
    {
        value: 'ROLE_INSTRUCTOR',
        label: 'ROLE_INSTRUCTOR'
    }
];
const forEditFacAdmin = [...forEdit, {value: 'ROLE_DEP-ADMIN', label: 'ROLE_DEP-ADMIN'}];
const forEditOrgAdmin = [...forEditFacAdmin, {value: 'ROLE_FAC-ADMIN', label: 'ROLE_FAC-ADMIN'}];
const forEditGlobalAdmin = [...forEditOrgAdmin, {value: 'ROLE_ORG-ADMIN', label: 'ROLE_ORG-ADMIN'}];

const forNew = [...forEdit, dummy];
const forNewFacAdmin = [...forEditFacAdmin, dummy];
const forNewOrgAdmin = [...forEditOrgAdmin, dummy];
const forNewGlobalAdmin = [...forEditGlobalAdmin, dummy];

const forFilter = {
    'ROLE_LAB-ASSISTANT': 'ROLE_LAB-ASSISTANT',
    'ROLE_INSTRUCTOR': 'ROLE_INSTRUCTOR',
    'ROLE_DEP-ADMIN': 'ROLE_DEP-ADMIN',
    'ROLE_FAC-ADMIN': 'ROLE_FAC-ADMIN',
    'ROLE_ORG-ADMIN': 'ROLE_ORG-ADMIN'
}

export const getRoles = (state) => {
    const {authenticated} = state.userInfo;
    let roles = {};
    switch (authenticated.role) {
        case 'ROLE_DEP-ADMIN':
            roles = new Roles(forNew, forEdit, forFilter);
            break;
        case 'ROLE_FAC-ADMIN':
            roles = new Roles(forNewFacAdmin, forEditFacAdmin, forFilter);
            break;
        case 'ROLE_ORG-ADMIN':
            roles = new Roles(forNewOrgAdmin, forEditOrgAdmin, forFilter);
            break;
        case 'ROLE_GLOBAL-ADMIN':
            roles = new Roles(forNewGlobalAdmin, forEditGlobalAdmin, forFilter);
            break;
        default:
            throw new Error("Failed to determine roles set based on current user role");
    }
    return roles;
}