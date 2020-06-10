import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FaCompress, FaExpand, FaPlus, FaSync} from "react-icons/fa";
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
import LmsTable from "./LmsTable";
import LmsEditModal from "./LmsEditModal";

class Lms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newMode: false,
            expanded: false
        }
        this.handleTableChange = this.handleTableChange.bind(this);
        this.deactivateModal = this.deactivateModal.bind(this);
        this.expandedSwitch = this.expandedSwitch.bind(this);

    }

    componentDidMount() {
        const {lms} = this.props;
        if (!lms.content) this.loadLMSBasedOnRole();
    }

    loadLMSBasedOnRole() {
        // If there is some depId selected by AffiliationSelector,
        // the the current role is at least fac admin, load this different org. LMS-es
        this.props.getAllLMSByOrganisation();
    }

    deactivateModal() {
        this.setState({newMode: false});
    }

    expandedSwitch() {
        this.setState({expanded: !this.state.expanded});
    }

    handleUpdate(lmsId, dataField, newValue) {
        switch (dataField) {
            case "name": {
                this.props.updateLMSName(lmsId, newValue);
                return;
            }
            default:
                return;
        }
    }

    handleTableChange(type, {cellEdit}) {
        if (cellEdit) {
            const {rowId, dataField, newValue} = cellEdit;
            this.handleUpdate(rowId, dataField, newValue);
        }
    }

    render() {
        const {newMode, expanded} = this.state;
        const {userInfo, lms} = this.props;
        const {isLoading, isUpdating, error, errorUpdate} = lms;

        return (
            <div className="p-1">
                <div className="alert alert-secondary text-center mb-1">
                    <h5 className="alert-heading">
                        <strong>LMS management</strong>
                    </h5>
                </div>
                {
                    (error || errorUpdate) &&
                    <Error message="Operation failed!" close={() => this.props.clearAllLMSFailures()}/>
                }
                {
                    !isLoading &&
                    <div className="d-flex justify-content-between mb-1">
                        <div>
                            {
                                lms.content &&
                                <button type="button" className="btn btn-sm btn-secondary" title="Expand/compress"
                                        onClick={() => this.expandedSwitch()}>
                                    {expanded ? <FaCompress/> : <FaExpand/>}
                                </button>
                            }
                        </div>

                        <div>
                            {
                                userInfo.authenticated.isAtLeastOrgAdmin &&
                                <button type="button" className="btn btn-sm btn-success"
                                        onClick={() => this.setState({newMode: true})}>
                                    <FaPlus/>&nbsp;New
                                </button>
                            }
                            <button type="button" className="btn btn-sm btn-info ml-2"
                                    onClick={() => this.loadLMSBasedOnRole()}>
                                <FaSync/>&nbsp;Refresh
                            </button>
                        </div>
                    </div>
                }
                {
                    lms.content &&
                    <div className="pb-5">
                        <LoadingOverlay
                            active={isUpdating ? true : false}
                            spinner
                            text='Performing API call...'>
                            <LmsTable
                                userInfo={userInfo}
                                lms={lms.content}
                                expanded={expanded}
                                deleteLMS={this.props.deleteLMS}
                                onTableChange={this.handleTableChange}
                            />
                        </LoadingOverlay>
                    </div>
                }
                <Overlay show={isLoading ? true : false}/>
                {
                    newMode &&
                    <LmsEditModal show={this.state.newMode} deactivateModal={this.deactivateModal}/>
                }
            </div>
        );
    }
}

Lms.propTypes = {
    userInfo: PropTypes.object.isRequired,
    lms: PropTypes.object.isRequired,

    getAllLMSByOrganisation: PropTypes.func.isRequired,
    getAllLMSByOrganisationId: PropTypes.func.isRequired,
    clearAllLMSFailures: PropTypes.func.isRequired,
    updateLMSName: PropTypes.func.isRequired,
    deleteLMS: PropTypes.func.isRequired
};

export default Lms;