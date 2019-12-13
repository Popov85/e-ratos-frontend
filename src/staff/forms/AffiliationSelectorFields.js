import React from 'react';
import PropTypes from 'prop-types';
import {Field} from "redux-form";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";
import {number} from "../../utils/validators";

const AffiliationSelectorFields = (props) => {

    const {affiliationSelector} = props;
    const {authenticated} = props.userInfo;

    if (authenticated && !authenticated.isAtLeastFacAdmin) return null;

    const orgOnChange =(orgId) => {
        props.change('affiliation.facId', "");
        props.change('affiliation.depId', "");
        props.clearAllOnOrganisationReset();
        if (orgId) props.getAllFacultiesForSelectorByOrganisationId(orgId, affiliationSelector);
    }

    const facOnChange =(facId) => {
        props.change('affiliation.depId', "");
        props.clearAllOnFacultyReset();
        if (facId) props.getAllDepartmentsForSelectorByFacultyId(facId, affiliationSelector);
    }

    return (
        <div className = "ratos-form-fieldset">
            <fieldset>
                <legend>Affiliation</legend>
            {
                authenticated.isGlobalAdmin &&
                <Field name="orgId" component={FieldSelectBadge} badge="Organisation"
                       items={props.affiliationSelector.organisations}
                       validate={[number]}
                       onChange={(event, newValue, previousValue, name) => orgOnChange(newValue)}/>
            }
            {
                authenticated.isAtLeastOrgAdmin &&
                <Field name="facId" component={FieldSelectBadge} badge="Faculty"
                       items={props.affiliationSelector.faculties}
                       validate={[number]}
                       onChange={(event, newValue, previousValue, name) => facOnChange(newValue)}/>
            }
            {
                authenticated.isAtLeastFacAdmin &&
                <Field name="depId" component={FieldSelectBadge} badge="Department"
                       items={props.affiliationSelector.departments}
                       validate={[number]}/>
            }
            </fieldset>
        </div>
    );

}

AffiliationSelectorFields.propTypes = {
    userInfo: PropTypes.object.isRequired,
    affiliationSelector: PropTypes.object.isRequired,
    getAllFacultiesForSelectorByOrganisationId: PropTypes.func.isRequired,
    getAllDepartmentsForSelectorByFacultyId: PropTypes.func.isRequired,
    clearAllOnOrganisationReset: PropTypes.func.isRequired,
    clearAllOnFacultyReset: PropTypes.func.isRequired,
};

export default AffiliationSelectorFields;