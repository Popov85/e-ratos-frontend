import {createSelector} from "reselect";
import {accessTransformer as accessesTransformer, accessTransformer} from "../../utils/transformers/accessTransformer";

const dummy = {value: "", label: "Select"};

export const getAllAccessesMin = (state) => state.access ? state.access.contentMin : null;

//------------------------------------------------Re-selectors----------------------------------------------------------

export const getAllAccessesForSelect = createSelector(getAllAccessesMin, (accesses) => {
    if (!accesses) return [dummy];
    return accessTransformer.toSelectWithDummy(accesses);
});

export const getAllAccessesForSelectWithoutDummy = createSelector(getAllAccessesMin, (accesses) => {
    if (!accesses) return [dummy];
    return accessTransformer.toSelect(accesses);
});

export const getAllAccessesForFilter = createSelector(getAllAccessesMin, (accesses) => {
    if (!accesses) return null;
    return accessesTransformer.toObject(accesses);
});