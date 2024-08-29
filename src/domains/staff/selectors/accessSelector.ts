import {createSelector} from "reselect";
import {RootState} from "../../../store/rootReducer";
import {Access} from "../types/Access";
import {accessTransformer} from "../../../utils/transformers/accessTransformer";
import {FormSelect} from "../types/form/FormSelect";
import {TableObject} from "../types/table/TableObject";

const dummy = {value: "", label: "Select"};

export const getAllAccesses = (state: RootState): Array<Access> => state.staff.access.content;

//------------------------------------------------Re-selectors----------------------------------------------------------

export const getAllAccessesForSelect = createSelector(
    [getAllAccesses],
    (accesses: Access[]): Array<FormSelect> => {
        if (!accesses || accesses.length === 0) return [dummy];
        return accessTransformer.toSelectWithDummy(accesses) || [];
    }) as (state: RootState) => Array<FormSelect>;

export const getAllAccessesForSelectWithoutDummy = createSelector(
    [getAllAccesses],
    (accesses: Access[]) => {
        if (!accesses || accesses.length === 0) return [dummy];
        return accessTransformer.toSelect(accesses) || [];
    }) as (state: RootState) => Array<FormSelect>;

export const getAllAccessesForTable = createSelector(
    [getAllAccesses],
    (accesses: Access[]): TableObject | null => {
        if (!accesses || accesses.length === 0) return null;
        return accessTransformer.toObject(accesses);
    }) as (state: RootState) => TableObject | null;