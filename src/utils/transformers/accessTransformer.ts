//@ts-ignore
import {dummy} from "../constants";
import {TableObject} from "../../domains/staff/types/table/TableObject";
import {Access} from "../../domains/staff/types/Access";
import {FormSelect} from "../../domains/staff/types/form/FormSelect";

export const accessTransformer = {

    toObject(accesses: Access[]): TableObject {
        return accesses.reduce((map: TableObject, access: Access) => {
            map[access.accessId!] = access.name;
            return map;
        }, {});
    },

    toSelect(accesses: Access[]): FormSelect[] {
        return accesses.map((a: Access): FormSelect => ({
            value: a.accessId.toString(),
            label: a.name,
        }));
    },

    toSelectWithDummy(accesses: Access[]): FormSelect[] {
        let result: FormSelect[] = this.toSelect(accesses);
        result.unshift(dummy);
        return result;
    }

}