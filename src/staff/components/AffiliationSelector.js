import React, {Component} from 'react';
import AffiliationSelectorForm from "../forms/AffiliationSelectorForm";
import {Affiliation} from "../objects/Affiliation";
import {FaStepForward} from "react-icons/fa";
import PropTypes from 'prop-types';

import ProtectedResource from "../../common/components/ProtectedResource";
import Error from "../../common/components/Error";

/**
 * Used to select org/fac/dep to view results;
 * FAC-ADMIN sees only departments dropdown by his faculty
 * ORG-ADMIN sees only faculties list by his organisation
 * GLOBAl-ADMIN sees organisation list of ratos instance;
 *
 * Here goes a form with validation aiming to select a certain affiliation,
 * being used for further processing and API calls;
 *
 * After form submission a user is directed to ResultContainer (+ selected affiliation)
 */

class AffiliationSelector extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {affiliationSelector, userInfo} = this.props;
        const {authenticated} = userInfo;
        if (authenticated && !affiliationSelector.selected)
        // Init selector lists only if container doesn't contain any selected state!
            this.props.initAffiliationSelector(authenticated.role, affiliationSelector);
        // Adjust lists, make sure that corresponding lists are not empty!
        if (affiliationSelector.selected) {
            const {org, fac, dep} = affiliationSelector.selected;
            if (org && fac && dep) {
                this.props.setExistingOrganisationsForSelector('All');
                this.props.setExistingFacultiesForSelector(org.value.toString());
                this.props.setExistingDepartmentsForSelector(fac.value.toString());
            } else if (fac && dep) {
                this.props.setExistingFacultiesForSelector('All');
                this.props.setExistingDepartmentsForSelector(fac.value.toString());
            } else {
                this.props.setExistingDepartmentsForSelector('All');
            }
        }
    }

    handleSubmit(formData) {
        const {affiliation} = formData;
        let aff = new Affiliation(
            affiliation.orgId,
            affiliation.facId,
            affiliation.depId);
        // Invoke a function to have job done!
        this.props.afterAffiliationSelected(aff);
    }

    handleOwnDepartment() {
        // Invoke a function to have a job done!
        this.props.afterOwnDepartmentSelected()
    }

    render() {
        const {authenticated} = this.props.userInfo;
        if (authenticated && !authenticated.isAtLeastFacAdmin) return <ProtectedResource/>;

        const {userInfo, affiliationSelector} = this.props;
        const {isLoading, error, selected} = affiliationSelector;
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="card bg-transparent">
                            {
                                isLoading &&
                                <div className="text-secondary text-center mb-n3">Loading...</div>
                            }
                            {
                                error &&
                                <div className="pl-1 pr-1 mt-2 mb-n3">
                                    <Error message="Operation failed!" close={() => this.props.clearLoadingFailure()}/>
                                </div>
                            }
                            <div className="ratos-form-card card-body">
                                <AffiliationSelectorForm
                                    initialValues={selected ?
                                        {
                                            affiliation: {
                                                orgId: selected.org ? selected.org.value : null,
                                                facId: selected.fac ? selected.fac.value : null,
                                                depId: selected.dep ? selected.dep.value : null,
                                            }
                                        }
                                        : null
                                    }
                                    userInfo={userInfo}
                                    affiliationSelector={affiliationSelector}
                                    getAllFacultiesForSelectorByOrganisationId={this.props.getAllFacultiesForSelectorByOrganisationId}
                                    getAllDepartmentsForSelectorByFacultyId={this.props.getAllDepartmentsForSelectorByFacultyId}
                                    clearAllOnOrganisationReset={this.props.clearAllOnOrganisationReset}
                                    clearAllOnFacultyReset={this.props.clearAllOnFacultyReset}
                                    onSubmit={formData => this.handleSubmit(formData)}
                                />
                            </div>
                            <button type="button" value="Own" className="btn btn-sm btn-info p-2"
                                    onClick={() => this.handleOwnDepartment()}>
                                <div className="align-middle">Select my department&nbsp; <FaStepForward/></div>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

AffiliationSelector.propTypes = {
    userInfo: PropTypes.object.isRequired,
    affiliationSelector: PropTypes.object.isRequired,

    initAffiliationSelector: PropTypes.func.isRequired,

    setExistingOrganisationsForSelector: PropTypes.func.isRequired,
    setExistingFacultiesForSelector: PropTypes.func.isRequired,
    setExistingDepartmentsForSelector: PropTypes.func.isRequired,

    getAllFacultiesForSelectorByOrganisationId: PropTypes.func.isRequired,
    getAllDepartmentsForSelectorByFacultyId: PropTypes.func.isRequired,

    clearLoadingFailure: PropTypes.func.isRequired,

    clearAllOnOrganisationReset: PropTypes.func.isRequired,
    clearAllOnFacultyReset: PropTypes.func.isRequired,

    // These functions should be supplied by calling component, not the container!
    afterAffiliationSelected: PropTypes.func.isRequired,
    afterOwnDepartmentSelected: PropTypes.func.isRequired
};

export default AffiliationSelector;