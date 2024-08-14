import {createSelector} from "reselect";
// @ts-ignore
import {organisationsTransformer} from "../../../utils/transformers/organisationsTransformer";
// @ts-ignore
import {dummy} from "../../../utils/constants";
import {RootState} from "../../../store/rootReducer";
import {Organisation} from "../types/Organisation";

interface OrgProps {
    orgId?: number;
}

export const getOrgIdFromProps = (_state: RootState, props: OrgProps) => props.orgId;

export const getAllOrganisations = (state: RootState): Array<Organisation> => state.staff.organisations.content;

//--------------------------------------------------Re-selectors--------------------------------------------------------
// For editing (from table)
export const getOrgById = createSelector(
    [getAllOrganisations, getOrgIdFromProps],
    (organisations: Array<Organisation>, orgId?: number): Organisation | null => {
        if (!orgId) return null;
        return organisations.find((o: Organisation): boolean => o.orgId === orgId) || null;
    }
) as (state: RootState, props: OrgProps) => Organisation | null;

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


