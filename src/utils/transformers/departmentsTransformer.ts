import {FormSelect} from "../../domains/staff/types/form/FormSelect";
import {Department} from "../../domains/staff/types/Department";
import {Staff} from "../../domains/staff/types/Staff";
import {TableObject} from "../../domains/staff/types/table/TableObject";

export const departmentsTransformer = {
    /**
     * Transform array of departments from server form into an array required by select component
     * @param departments
     * @returns {*}
     */
    toSelect(departments: Department[]): FormSelect[] {
        return departments.map((d: Department): FormSelect => ({
            value: d.depId as string,
            label: d.name,
        }));
    },

    //--------------------------------------------------Bad design!!!---------------------------------------------------
    /**
     * Transform array of users from server form into an array required by table filter
     * @param users
     * @returns {*}
     */
    toFilter(users: Array<Staff>): TableObject {
        return users.reduce((map: TableObject, user: Staff) => {
            map[user.department?.depId!] = user.department?.name!;
            return map;
        }, {});
    }
}