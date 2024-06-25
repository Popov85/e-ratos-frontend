import {createSelector} from "reselect";

export const getAllPositions = (state) => state.staff.positions;

//---------------------------------------------------Re-selectors-------------------------------------------------------
export const getPositions = createSelector(getAllPositions, (positions) => {
    console.log("getPositions selector..");
    if (!positions) return null;
    return positions;
});