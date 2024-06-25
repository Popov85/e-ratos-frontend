import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FaCompress, FaExpand, FaPlus, FaSync} from "react-icons/fa";
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
import ResourceEditModal from "./ResourceEditModal";
import ResourcesTable from "./ResourcesTable";

class Resources extends Component {

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
        const {resources} = this.props;
        if (!resources.content) this.loadResourcesBasedOnRole();
    }

    loadResourcesBasedOnRole() {
        // If there is some depId selected by AffiliationSelector,
        // and the current role is at least fac admin, load this different department resources
        this.props.getAllResourcesByDepartment();
    }

    deactivateModal() {
        this.setState({newMode: false});
    }

    expandedSwitch() {
        this.setState({expanded: !this.state.expanded});
    }

    handleUpdate(resId, dataField, newValue) {
        switch (dataField) {
            case "link": {
                this.props.updateResourceUrl(resId, newValue);
                return;
            }
            case "description": {
                this.props.updateResourceDescription(resId, newValue);
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
        const {authorization, resources} = this.props;
        const {isLoading, isUpdating, error, errorUpdate} = resources;

        return (
            <div className="container-fluid p-0">
                <div className="p-1">
                    <div className="alert alert-secondary text-center mb-1">
                        <h5 className="alert-heading">
                            <strong>Resources management</strong>
                        </h5>
                    </div>
                    {
                        (error || errorUpdate) &&
                        <Error message="Operation failed!" close={() => this.props.clearAllResourcesFailures()}/>
                    }
                    {
                        !isLoading &&
                        <div className="d-flex justify-content-between mb-1">
                            <div>
                                {
                                    resources.content &&
                                    <button type="button" className="btn btn-sm btn-secondary" title="Expand/compress"
                                            onClick={() => this.expandedSwitch()}>
                                        {expanded ? <FaCompress/> : <FaExpand/>}
                                    </button>
                                }
                            </div>

                            <div>
                                {
                                    authorization.isAtLeastInstructor &&
                                    <button type="button" className="btn btn-sm btn-success"
                                            onClick={() => this.setState({newMode: true})}>
                                        <FaPlus/>&nbsp;New
                                    </button>
                                }
                                <button type="button" className="btn btn-sm btn-info ml-2"
                                        onClick={() => this.loadResourcesBasedOnRole()}>
                                    <FaSync/>&nbsp;Refresh
                                </button>
                            </div>
                        </div>
                    }
                    {
                        resources.content &&
                        <div className="pb-5">
                            <LoadingOverlay
                                active={!!isUpdating}
                                spinner
                                text='Performing API call...'>
                                <ResourcesTable
                                    authorization={authorization}
                                    resources={resources.content}
                                    expanded={expanded}
                                    deleteResource={this.props.deleteResource}
                                    onTableChange={this.handleTableChange}
                                />
                            </LoadingOverlay>
                        </div>
                    }
                    <Overlay show={!!isLoading}/>
                    {
                        newMode &&
                        <ResourceEditModal show={this.state.newMode} deactivateModal={this.deactivateModal}/>
                    }
                </div>
            </div>
        );
    }
}

Resources.propTypes = {
    userInfo: PropTypes.object.isRequired,
    authorization: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,

    getAllResourcesByDepartment: PropTypes.func.isRequired,
    clearAllResourcesFailures: PropTypes.func.isRequired,
    updateResourceUrl: PropTypes.func.isRequired,
    updateResourceDescription: PropTypes.func.isRequired,
    deleteResource: PropTypes.func.isRequired
};

export default Resources;