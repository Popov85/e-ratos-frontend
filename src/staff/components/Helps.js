import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FaCompress, FaExpand, FaPlus, FaSync} from "react-icons/fa";
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/Error";
import Overlay from "../../common/Overlay";
import HelpsTable from "./HelpsTable";
import HelpEditModal from "./HelpEditModal";

class Helps extends Component {

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
        const {helps} = this.props;
        if (!helps.content) this.loadHelpsBasedOnRole();
    }

    loadHelpsBasedOnRole() {
        // If there is some depId selected by AffiliationSelector,
        // and the current role is at least fac admin, load this different department helps
        this.props.getAllHelpsByDepartment();
    }

    deactivateModal() {
        this.setState({newMode: false});
    }

    expandedSwitch() {
        this.setState({expanded: !this.state.expanded});
    }

    handleUpdate(helpId, dataField, newValue) {
        switch (dataField) {
            case "name": {
                this.props.updateHelpName(helpId, newValue);
                return;
            }
            case "help": {
                this.props.updateHelpText(helpId, newValue);
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
        const {userInfo, helps} = this.props;
        const {isLoading, isUpdating, error, errorUpdate} = helps;

        return (
            <div className="p-1">
                <div className="alert alert-secondary text-center mb-1">
                    <h5 className="alert-heading">
                        <strong>Helps management</strong>
                    </h5>
                </div>
                {
                    (error || errorUpdate) &&
                    <Error message="Operation failed!" close={() => this.props.clearAllHelpsFailures()}/>
                }
                {
                    !isLoading &&
                    <div className="d-flex justify-content-between mb-1">
                        <div>
                            {
                                helps.content &&
                                <button type="button" className="btn btn-sm btn-secondary" title="Expand/compress"
                                        onClick={() => this.expandedSwitch()}>
                                    {expanded ? <FaCompress/> : <FaExpand/>}
                                </button>
                            }
                        </div>

                        <div>
                            {
                                userInfo.authenticated.isAtLeastInstructor &&
                                <button type="button" className="btn btn-sm btn-success"
                                        onClick={() => this.setState({newMode: true})}>
                                    <FaPlus/>&nbsp;New
                                </button>
                            }
                            <button type="button" className="btn btn-sm btn-info ml-2"
                                    onClick={() => this.loadHelpsBasedOnRole()}>
                                <FaSync/>&nbsp;Refresh
                            </button>
                        </div>
                    </div>
                }
                {
                    helps.content &&
                    <div className="pb-5">
                        <LoadingOverlay
                            active={isUpdating ? true : false}
                            spinner
                            text='Performing API call...'>
                            <HelpsTable
                                userInfo={userInfo}
                                helps={helps.content}
                                expanded={expanded}
                                deleteHelp={this.props.deleteHelp}
                                onTableChange={this.handleTableChange}
                            />
                        </LoadingOverlay>
                    </div>
                }
                <Overlay show={isLoading ? true : false}/>
                {
                    newMode &&
                    <HelpEditModal show={this.state.newMode} deactivateModal={this.deactivateModal}/>
                }
            </div>
        );
    }
}

Helps.propTypes = {
    userInfo: PropTypes.object.isRequired,
    helps: PropTypes.object.isRequired,

    getAllHelpsByDepartment: PropTypes.func.isRequired,
    clearAllHelpsFailures: PropTypes.func.isRequired,
    updateHelpName: PropTypes.func.isRequired,
    updateHelpText: PropTypes.func.isRequired,
    deleteHelp: PropTypes.func.isRequired
};

export default Helps;