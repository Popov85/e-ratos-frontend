//@ts-ignore
import {dummy} from "../constants";
import {Organisation} from "../../domains/staff/types/Organisation";
import {TableObject} from "../../domains/staff/types/table/TableObject";
import {FormSelect} from "../../domains/staff/types/form/FormSelect";


export const organisationsTransformer = {

    /**
     * Transform array of organisations from server form into an object required for table
     * @param organisations
     * @returns {*}
     */
    toObject(organisations: Organisation[]): TableObject {
        return organisations.reduce((map: TableObject, org: Organisation) => {
            map[org.orgId] = org.name;
            return map;
        }, {});
    },

    /**
     * Transform array of organisations from server form into an array required by select component
     * @param organisations
     * @returns {*}
     */
    toSelect(organisations: Organisation[]): FormSelect[] {
        return organisations.map((o: Organisation) => ({
            value: o.orgId as string,
            label: o.name,
        }));
    },

    /**
     * Transform array of organisations from server form into an array required by select component with dummy value
     * @param organisations
     * @returns {*}
     */
    toSelectWithDummy(organisations: Organisation[]): FormSelect[] {
        let result: Array<FormSelect> = this.toSelect(organisations);
        result.unshift(dummy);
        return result;
    },

    //--------------------------------------------------Bad design!!----------------------------------------------------

    /**
     * Transform array of users from server form into an array required by table filter
     * @param users
     * @returns {*}
     */
    //@ts-ignore
    fromUsersToFilter (users) {
        //@ts-ignore
        return users.reduce((map, user)=> {
            map[user.department.faculty.organisation.orgId] = user.department.faculty.organisation.name;
            return map;
        }, {});
    }

}