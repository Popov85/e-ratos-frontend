//@ts-ignore
import {dummy} from "../constants";
import {FormSelect} from "../../domains/staff/types/form/FormSelect";
import {LMS} from "../../domains/staff/types/LMS";
import {TableObject} from "../../domains/staff/types/table/TableObject";
import {LMSDropDown} from "../../domains/staff/_api/lmsAPI";

export const lmsTransformer = {


    toSelect(lmses: LMS[]): FormSelect[] {
        return lmses.map((lms: LMS): FormSelect => ({
            value: lms.lmsId?.toString() as string,
            label: lms.name,
        }));
    },

    toFilter (lmses: Array<LMS>): TableObject {
        return lmses.reduce((map: TableObject, lms: LMS)=> {
            map[lms.lmsId!] = lms.name;
            return map;
        }, {});
    },

    toSelectWithDummy(lmses: Array<LMS> | Array<LMSDropDown> | null): FormSelect[] {
        if (!lmses) {
            return [dummy];
        }
        let result: FormSelect[] = this.toSelect(lmses);
        result.unshift(dummy);
        return result;
    }

}