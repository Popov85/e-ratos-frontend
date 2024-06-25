import React from 'react';
import {FormSection, reduxForm} from "redux-form";
import {FaStepForward} from "react-icons/fa";
import PropTypes from 'prop-types';
import AffiliationSelectorFields from "./AffiliationSelectorFields";
import {Redirect} from "react-router-dom";

let AffiliationSelectorForm = props => {

    const authorization = props.authorization;

    if (!authorization.isAtLeastFacAdmin) return <Redirect to="/unauthorized"/>;

    return (
        <form onSubmit={props.handleSubmit}>
            {
                authorization.isAtLeastFacAdmin &&
                <FormSection name="affiliation">
                    <AffiliationSelectorFields
                        userInfo = {props.userInfo}
                        authorization={authorization}
                        affiliationSelector = {props.affiliationSelector}
                        getAllFacultiesForSelectorByOrganisationId={props.getAllFacultiesForSelectorByOrganisationId}
                        getAllDepartmentsForSelectorByFacultyId={props.getAllDepartmentsForSelectorByFacultyId}
                        clearAllOnOrganisationReset={props.clearAllOnOrganisationReset}
                        clearAllOnFacultyReset={props.clearAllOnFacultyReset}
                        change = {props.change}
                    />
                </FormSection>
            }

            <div className="text-center">
                <button type="submit" value="Save" className="btn btn-sm btn-success pl-3 pr-3">
                    <div className="d-flex align-items-center">OK&nbsp;<FaStepForward/></div>
                </button>
            </div>
        </form>
    );
};

AffiliationSelectorForm.propTypes = {
    authorization: PropTypes.object.isRequired,
    affiliationSelector: PropTypes.object.isRequired,

    getAllFacultiesForSelectorByOrganisationId: PropTypes.func.isRequired,
    getAllDepartmentsForSelectorByFacultyId: PropTypes.func.isRequired,
    clearAllOnOrganisationReset: PropTypes.func.isRequired,
    clearAllOnFacultyReset:PropTypes.func.isRequired,

    handleSubmit: PropTypes.func.isRequired
};

AffiliationSelectorForm = reduxForm({form: 'affiliationForm', enableReinitialize: true})(AffiliationSelectorForm)

export default AffiliationSelectorForm