import React from 'react';
import {Field, reduxForm} from "redux-form";
import {number} from "../../utils/validators";
import {FaStepForward} from "react-icons/fa";
import PropTypes from 'prop-types';
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";
import ProtectedResource from "../../common/ProtectedResource";

let AffiliationSelectorForm = props => {

    const {authenticated} = props.userInfo;

    const orgOnChange =(orgId) => {
        props.change('facId', "");
        props.change('depId', "");
        props.clearAllOnOrganisationReset();
        const {affiliationSelector} = props;
        if (orgId) props.getAllFacultiesForSelectorByOrganisationId(orgId, affiliationSelector);
    }

    const facOnChange =(facId) => {
        props.change('depId', "");
        props.clearAllOnFacultyReset();
        const {affiliationSelector} = props;
        if (facId) props.getAllDepartmentsForSelectorByFacultyId(facId, affiliationSelector);
    }

    if (authenticated && !authenticated.isAtLeastFacAdmin) return <ProtectedResource/>;

    return (
        <form onSubmit={props.handleSubmit}>
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
            <Field name="depId" component={FieldSelectBadge} badge="Department"
                       items={props.affiliationSelector.departments}
                       validate={[number]}/>

            <div className="text-center">
                <button type="submit" value="Save" className="btn btn-sm btn-success pl-3 pr-3">
                    <div className="d-flex align-items-center">OK&nbsp;<FaStepForward/></div>
                </button>
            </div>
        </form>
    );
};

AffiliationSelectorForm.propTypes = {
    userInfo: PropTypes.string.isRequired,
    affiliationSelector: PropTypes.object.isRequired,

    getAllFacultiesForSelectorByOrganisationId: PropTypes.func.isRequired,
    getAllDepartmentsForSelectorByFacultyId: PropTypes.func.isRequired,
    clearAllOnOrganisationReset: PropTypes.func.isRequired,
    clearAllOnFacultyReset:PropTypes.func.isRequired,

    handleSubmit: PropTypes.func.isRequired
};

AffiliationSelectorForm = reduxForm({form: 'affiliationForm', enableReinitialize: true})(AffiliationSelectorForm)

export default AffiliationSelectorForm