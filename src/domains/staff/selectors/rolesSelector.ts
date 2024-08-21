import {RootState} from "../../../store/rootReducer";
import {Roles} from "../objects/Roles";
import {SecurityRole} from "../../common/types/SecurityRole";
import {UserInfo} from "../../common/types/UserInfo";
import {TableObject} from "../types/table/TableObject";

const dummy = {value: "", label: "Select"};

const forEdit = [
    {
        value: SecurityRole.ROLE_LAB_ASSISTANT.toString(),
        label: SecurityRole.ROLE_LAB_ASSISTANT.toString()
    },
    {
        value: SecurityRole.ROLE_INSTRUCTOR.toString(),
        label: SecurityRole.ROLE_INSTRUCTOR.toString()
    }
];
const forEditFacAdmin = [...forEdit, {value: SecurityRole.ROLE_DEP_ADMIN.toString(), label: SecurityRole.ROLE_DEP_ADMIN.toString()}];
const forEditOrgAdmin = [...forEditFacAdmin, {value: SecurityRole.ROLE_FAC_ADMIN.toString(), label: SecurityRole.ROLE_FAC_ADMIN.toString()}];
const forEditGlobalAdmin = [...forEditOrgAdmin, {value: SecurityRole.ROLE_ORG_ADMIN.toString(), label: SecurityRole.ROLE_ORG_ADMIN.toString()}];

const forNew = [...forEdit, dummy];
const forNewFacAdmin = [...forEditFacAdmin, dummy];
const forNewOrgAdmin = [...forEditOrgAdmin, dummy];
const forNewGlobalAdmin = [...forEditGlobalAdmin, dummy];

const forFilter = Object.values(SecurityRole).reduce((acc: TableObject, role: string) => {
    acc[role] = role;
    return acc;
}, {} as TableObject);

export const getRoles = (state: RootState): Roles | null => {
    const userInfo: UserInfo | null  = state.auth.userInfo;
    if (!userInfo) return null;
    let roles: SecurityRole = userInfo.role;
    switch (roles) {
        case SecurityRole.ROLE_DEP_ADMIN:
            return new Roles(forNew, forEdit, forFilter);
        case SecurityRole.ROLE_FAC_ADMIN:
            return new Roles(forNewFacAdmin, forEditFacAdmin, forFilter);
        case SecurityRole.ROLE_ORG_ADMIN:
            return new Roles(forNewOrgAdmin, forEditOrgAdmin, forFilter);
        case SecurityRole.ROLE_GLOBAL_ADMIN:
            return new Roles(forNewGlobalAdmin, forEditGlobalAdmin, forFilter);
        default:
            return new Roles([], [], {});
    }
}