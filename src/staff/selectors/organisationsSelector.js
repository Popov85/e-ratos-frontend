import {createSelector} from "reselect";
import {organisationsTransformer} from "../../utils/transformers/organisationsTransformer";
import {dummy} from "../../utils/constants";

export const getOrgIdFromProps = (state, props) => props.orgId;

export const getAllOrganisations = (state) => state.organisations.content;

//--------------------------------------------------Re-selectors--------------------------------------------------------
// For editing (from table)
export const getOrgById = createSelector(getAllOrganisations, getOrgIdFromProps, (organisations, orgId) => {
    if (!organisations) return null;
    return organisations.find(o => o.orgId === orgId);
});

// For Table filter
export const getAllOrgForFilter = createSelector(getAllOrganisations, (organisations) => {
    if (!organisations) return null;
    return organisationsTransformer.toObject(organisations);
});

// For Select drop-down
export const getAllOrgForEdit = createSelector(getAllOrganisations, (organisations) => {
    if (!organisations) return null;
    return organisationsTransformer.toSelect(organisations);
});

// For new form with empty default option
export const getAllOrgForNew = createSelector(getAllOrgForEdit, (organisations) => {
    if (!organisations) return null;
    organisations.unshift(dummy);
    return organisations;
});


