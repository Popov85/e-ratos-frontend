import {createSelector} from "reselect";
import {gradingsTwoPointTransformer} from "../../../utils/transformers/gradingsTwoPointTransformer";

const dummy = {value: "", label: "Select"};

export const getAllGradingsTwoPoint = (state) => state.staff.gradingsTwoPoint ? state.staff.gradingsTwoPoint.content : null;

//------------------------------------------------Re-selectors----------------------------------------------------------

export const getAllGradingsTwoPointForSelect = createSelector(getAllGradingsTwoPoint, (gradings) => {
    if (!gradings) return [dummy];
    return gradingsTwoPointTransformer.toSelectWithDummy(gradings);
});

export const getAllGradingsTwoPointForFilter = createSelector(getAllGradingsTwoPoint, (gradings) => {
    if (!gradings) return null;
    return gradingsTwoPointTransformer.toObject(gradings);
});