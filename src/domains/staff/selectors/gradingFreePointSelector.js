import {createSelector} from "reselect";
import {gradingsFreePointTransformer} from "../../../utils/transformers/gradingsFreePointTransformer";

const dummy = {value: "", label: "Select"};

export const getAllGradingsFreePoint = (state) => state.staff.gradingsFreePoint ? state.staff.gradingsFreePoint.content : null;

//------------------------------------------------Re-selectors----------------------------------------------------------

export const getAllGradingsFreePointForSelect = createSelector(getAllGradingsFreePoint, (gradings) => {
    if (!gradings) return [dummy];
    return gradingsFreePointTransformer.toSelectWithDummy(gradings);
});

export const getAllGradingsFreePointForFilter = createSelector(getAllGradingsFreePoint, (gradings) => {
    if (!gradings) return null;
    return gradingsFreePointTransformer.toObject(gradings);
});