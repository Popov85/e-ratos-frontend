import {createSelector} from "reselect";

export const getResultIdFromProps = (state, props) => props.resultId;

export const getAllResults = state => {
    const {results} = state.staff;
    if (results && results.data) {
        return results.data.content;
    }
    return null;

}

//---------------------------------------------------Re-selectors-------------------------------------------------------

export const getResultById = createSelector(getAllResults, getResultIdFromProps, (results, resultId) => {
    if (!results) return null;
    return results.find(r => r.resultId === resultId);
});

