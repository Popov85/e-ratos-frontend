import {createSelector} from "reselect";
// @ts-ignore
import {accessTransformer} from "../../../utils/transformers/accessTransformer";
import {RootState} from "../../../store/rootReducer";
import {Access} from "../types/Access";

const dummy = {value: "", label: "Select"};

export const getAllAccesses = (state: RootState): Array<Access> => state.staff.access.content;

//------------------------------------------------Re-selectors----------------------------------------------------------

export const getAllAccessesForSelect = createSelector(getAllAccesses, (accesses: Access[]) => {
    if (!accesses) return [dummy];
    return accessTransformer.toSelectWithDummy(accesses);
});

export const getAllAccessesForSelectWithoutDummy = createSelector(getAllAccesses, (accesses: Access[]) => {
    if (!accesses) return [dummy];
    return accessTransformer.toSelect(accesses);
});

export const getAllAccessesForTable = createSelector(getAllAccesses, (accesses: Access[]) => {
    if (!accesses) return null;
    return accessTransformer.toObject(accesses);
});