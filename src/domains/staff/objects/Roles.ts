import {FormSelect} from "../types/form/FormSelect";
import {TableObject} from "../types/table/TableObject";

export class Roles {

    forNew: Array<FormSelect>;
    forEdit: Array<FormSelect>;
    forFilter: TableObject;

    constructor(forNew: Array<FormSelect>, forEdit: Array<FormSelect>, forFilter: TableObject) {
        this.forNew = forNew;
        this.forEdit = forEdit;
        this.forFilter = forFilter;
    }
}