import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProtectedResource from "../../common/ProtectedResource";
import {FaPlus, FaSync} from "react-icons/fa";
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/Error";
import Overlay from "../../common/Overlay";
import OrgTable from "./OrgTable";
import OrgEditModal from "./OrgEditModal";

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
        const {organisations} = this.props;
        if (!organisations.content) this.props.getAllOrganisations();
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
        const {authenticated} = this.props.userInfo;
        if (!authenticated.isGlobalAdmin) return <ProtectedResource/>;

        const {organisations} = this.props;
        const {isLoading, isUpdating, error, errorUpdate} = organisations;

        return (
            <div className="row p-3">
                <div className="col-12">
                    {
                        (error || errorUpdate) &&
                        <Error message="Operation failed!" close={() => this.props.clearAllOrgFailures()}/>
                    }
                    {
                        !isLoading &&
                        <div className="text-right mb-1">
                            <button className="btn btn-sm btn-success" onClick={()=>this.setState({newMode: true})}>
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
                                active={isUpdating ? true : false}
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
                    <Overlay show={isLoading ? true : false}/>
                    {
                        newMode &&
                        <OrgEditModal show={newMode} deactivateModal={this.deactivateModal}/>
                    }
                </div>

            </div>
        );
    }
}

Organisations.propTypes = {
    userInfo: PropTypes.object.isRequired,
    organisations: PropTypes.object.isRequired,

    getAllOrganisations: PropTypes.func.isRequired,
    clearAllOrgFailures: PropTypes.func.isRequired,
    updateOrgName: PropTypes.func.isRequired,
    deleteOrg: PropTypes.func.isRequired
};

export default Organisations;