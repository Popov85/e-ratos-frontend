import {createSelector} from "reselect";
import {gradingsFourPointTransformer} from "../../../utils/transformers/gradingsFourPointTransformer";

const dummy = {value: "", label: "Select"};

export const getAllGradingsFourPoint = (state) => state.staff.gradingsFourPoint ? state.staff.gradingsFourPoint.content : null;

//------------------------------------------------Re-selectors----------------------------------------------------------

export const getAllGradingsFourPointForSelect = createSelector(getAllGradingsFourPoint, (gradings) => {
    if (!gradings) return [dummy];
    return gradingsFourPointTransformer.toSelectWithDummy(gradings);
});

export const getAllGradingsFourPointForFilter = createSelector(getAllGradingsFourPoint, (gradings) => {
    if (!gradings) return null;
    return gradingsFourPointTransformer.toObject(gradings);
});