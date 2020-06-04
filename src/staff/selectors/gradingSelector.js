import {createSelector} from "reselect";
import {gradingsTransformer} from "../../utils/transformers/gradingsTransformer";

const dummy = {value: "", label: "Select"};

export const getAllGradingsMin = (state) => state.gradings ? state.gradings.contentMin : null;

//------------------------------------------------Re-selectors----------------------------------------------------------

export const getAllGradingsForSelect = createSelector(getAllGradingsMin, (gradings) => {
    if (!gradings) return [dummy];
    return gradingsTransformer.toSelectWithDummy(gradings);
});

export const getAllGradingsForSelectWithoutDummy = createSelector(getAllGradingsMin, (gradings) => {
    if (!gradings) return [dummy];
    return gradingsTransformer.toSelect(gradings);
});

export const getAllGradingsForFilter = createSelector(getAllGradingsMin, (gradings) => {
    if (!gradings) return null;
    return gradingsTransformer.toObject(gradings);
});