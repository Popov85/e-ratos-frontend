import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FaPlus, FaSync} from "react-icons/fa";
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
import OrgTable from "./OrgTable";
import OrgEditModal from "./OrgEditModal";
import {Redirect} from "react-router-dom";

class Organisations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newMode: false
        }
        this.handleTableChange = this.handleTableChange.bind(this);
        this.deactivateModal = this.deactivateModal.bind(this);
    }

    componentDidMount() {
        this.props.getAllOrganisations();
    }

    deactivateModal() {
        this.setState({newMode: false});
    }

    handleUpdate(orgId, dataField, newValue) {
        switch (dataField) {
            case "name": {
                this.props.updateOrgName(orgId, newValue);
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
        const {newMode} = this.state;
        const authorization = this.props.authorization;
        if (!authorization.isGlobalAdmin) return <Redirect to="/unauthorized"/>;

        const {organisations} = this.props;
        const {isLoading, isUpdating, error, errorUpdate} = organisations;

        return (
            <div className="container-fluid p-0">
                <div className="row p-3">
                    <div className="col-12">
                        {
                            (error || errorUpdate) &&
                            <Error message="Operation failed!" close={() => this.props.clearAllOrgFailures()}/>
                        }
                        {
                            !isLoading &&
                            <div className="text-right mb-1">
                                <button className="btn btn-sm btn-success"
                                        onClick={() => this.setState({newMode: true})}>
                                    <FaPlus/>&nbsp;New
                                </button>
                                <button className="btn btn-sm btn-info ml-2"
                                        onClick={() => this.props.getAllOrganisations()}>
                                    <FaSync/>&nbsp;Refresh
                                </button>
                            </div>
                        }
                        {
                            organisations.content &&
                            <div className="pb-5">
                                <LoadingOverlay
                                    active={!!isUpdating}
                                    spinner
                                    text='Performing API call...'>
                                    <OrgTable
                                        organisations={organisations.content}
                                        deleteOrg={this.props.deleteOrg}
                                        onTableChange={this.handleTableChange}
                                    />
                                </LoadingOverlay>
                            </div>
                        }
                        <Overlay show={!!isLoading}/>
                        {
                            newMode &&
                            <OrgEditModal show={newMode} deactivateModal={this.deactivateModal}/>
                        }
                    </div>
                </div>
            </div>

        );
    }
}

Organisations.propTypes = {
    authorization: PropTypes.object.isRequired,
    organisations: PropTypes.object.isRequired,

    getAllOrganisations: PropTypes.func.isRequired,
    clearAllOrgFailures: PropTypes.func.isRequired,
    updateOrgName: PropTypes.func.isRequired,
    deleteOrg: PropTypes.func.isRequired
};

export default Organisations;