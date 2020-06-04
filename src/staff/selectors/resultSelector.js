import {createSelector} from "reselect";

export const getResultIdFromProps = (state, props) => props.resultId;

export const getAllResults = state => state.results.data.content;

//---------------------------------------------------Re-selectors-------------------------------------------------------

export const getResultById = createSelector(getAllResults, getResultIdFromProps, (results, resultId) => {
    if (!results) throw new Error("Result was not found!");
    return results.find(r => r.resultId === resultId);
});

