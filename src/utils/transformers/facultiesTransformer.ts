//@ts-ignore
import {dummy} from "../constants";
import {TableObject} from "../../domains/staff/types/table/TableObject";
import {Faculty} from "../../domains/staff/types/Faculty";
import {FormSelect} from "../../domains/staff/types/form/FormSelect";

export const facultiesTransformer = {

    /**
     * Transform array of faculties from server form into an object required for table
     * @param faculties
     * @returns {*}
     */
    toObject(faculties: Faculty[]): TableObject {
        return faculties.reduce((map: TableObject, fac: Faculty) => {
            map[fac.facId!] = fac.name;
            return map;
        }, {});
    },

    /**
     * Transform array of faculties from server form into an array required by select component
     * @param faculties
     * @returns {*}
     */
    toSelect(faculties: Faculty[]): FormSelect[] {
        return faculties.map((f: Faculty) => ({
            value: f.facId as string,
            label: f.name,
        }));
    },

    /**
     * Transform array of faculties from server form into an array required by select component with dummy value
     * @param faculties
     * @returns {*}
     */
    toSelectWithDummy(faculties: Faculty[]): FormSelect[] {
        let result: FormSelect[] = facultiesTransformer.toSelect(faculties);
        result.unshift(dummy);
        return result;
    },

    //--------------------------------------------------Bad design!!!---------------------------------------------------

    /**
     * TODO: consider to remove/rework!
     * Transform array of users from server form into an array required by table filter
     * @param users
     * @returns {*}
     */
    //@ts-ignore
    toFilter(users) {
        //@ts-ignore
        return users.reduce((map, user) => {
            map[user.department.faculty.facId] = user.department.faculty.name;
            return map;
        }, {});
    }

}