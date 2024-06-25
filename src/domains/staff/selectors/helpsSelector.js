import {createSelector} from "reselect";

export const getAllHelps = (state) => state.staff.helps.content;

export const getHelpIdFromProps = (state, props) => props.helpId;

export const getSelectedHelpIdFromProps = (state, props) => props.match.params.helpId;

//---------------------------------------------------Re-selectors-------------------------------------------------------
export const getHelpById = createSelector(getAllHelps, getHelpIdFromProps, (helps, helpId) => {
    if (!helps) return null;
    return helps.find(h => h.helpId === helpId);
});

// This method throw Error if a valid result cannot be obtained!
export const getHelpBySelectedId = createSelector(getAllHelps, getHelpIdFromProps, (helps, helpId) => {
    if (!helps) throw new Error('No helps are present in the local store!');
    let result = helps.find(h => h.helpId === Number(helpId));
    if (!result) throw new Error('Help is not found in the local store!');
    return result;
});

