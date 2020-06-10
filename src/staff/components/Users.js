import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UsersTable from "./UsersTable";
import ProtectedResource from "../../common/components/ProtectedResource";
import {FaCompress, FaExpand, FaPlus, FaSync} from "react-icons/fa";
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
import StaffEditModal from "./StaffEditModal";
import CoursesTable from "./CoursesTable";

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newMode: false,
            expanded: false
        }
        this.deactivateModal = this.deactivateModal.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.loadStaffBasedOnRole = this.loadStaffBasedOnRole.bind(this);
    }

    componentDidMount() {
        const {users, positions} = this.props;
        if (!positions.actual) this.props.getPositions();
        // Choose what data to load based on current  role
        if (!users.content) this.loadStaffBasedOnRole();
    }

    deactivateModal() {
        this.setState({newMode: false});
    }

    expandedSwitch() {
        this.setState({expanded: !this.state.expanded});
    }

    loadStaffBasedOnRole() {
        const {
            isGlobalAdmin,
            isAtLeastOrgAdmin,
            isAtLeastFacAdmin
        } = this.props.userInfo.authenticated;
        if (isGlobalAdmin) {
            this.props.getAllStaffByRatos();
        } else if (isAtLeastOrgAdmin) {
            this.props.getAllStaffByOrganisation();
        } else if (isAtLeastFacAdmin) {
            this.props.getAllStaffByFaculty();
        } else {
            this.props.getAllStaffByDepartment()
        }
    }

    handleUpdate(staffId, dataField, newValue) {
        switch (dataField) {
            case "user.name": {
                this.props.updateStaffName(staffId, newValue);
                return;
            }
            case "user.surname": {
                this.props.updateStaffSurname(staffId, newValue);
                return;
            }
            case "user.email": {
                this.props.updateStaffEmail(staffId, newValue);
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
        const {userInfo, users, positions, roles} = this.props;
        if (userInfo.authenticated && !userInfo.authenticated.isAtLeastDepAdmin) return <ProtectedResource/>;
        const {isLoading, isUpdating, error, errorUpdate} = users;

        return (
            <div className="p-1">
                <div className="alert alert-secondary text-center mb-1">
                    <h5 className="alert-heading">
                        <strong>Staff management</strong>
                    </h5>
                </div>
                {
                    (error || errorUpdate) &&
                    <Error message="Operation failed!" close={() => this.props.clearAllFailures()}/>
                }
                {
                    !isLoading &&
                    <div className="d-flex justify-content-between mb-1">
                        <div>
                            {
                                users.content &&
                                <button type="button" className="btn btn-sm btn-secondary" title="Expand/compress"
                                        onClick={() => this.expandedSwitch()}>
                                    {expanded ? <FaCompress/> : <FaExpand/>}
                                </button>
                            }
                        </div>
                        <div>
                            <button className="btn btn-sm btn-success" onClick={() => this.setState({newMode: true})}>
                                <FaPlus/>&nbsp;New
                            </button>
                            <button className="btn btn-sm btn-info ml-2"
                                    onClick={() => this.loadStaffBasedOnRole()}>
                                <FaSync/>&nbsp;Refresh
                            </button>
                        </div>
                    </div>
                }
                {
                    positions.actual && users.content &&
                    <div>
                        <LoadingOverlay
                            active={isUpdating ? true : false}
                            spinner
                            text='Performing API call...'>
                            <UsersTable
                                roles={roles}
                                users={users}
                                userInfo={userInfo}
                                positions={positions}
                                expanded={expanded}
                                deleteStaff={this.props.deleteStaff}
                                onTableChange={this.handleTableChange}
                            />
                        </LoadingOverlay>
                    </div>
                }

                <Overlay show={isLoading ? true : false}/>
                {
                    newMode &&
                    <StaffEditModal show={this.state.newMode} deactivateModal={this.deactivateModal}/>
                }

            </div>
        );
    }
}

Users.propTypes = {
    userInfo: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    positions: PropTypes.object.isRequired,

    updateStaffName: PropTypes.func.isRequired,
    updateStaffSurname: PropTypes.func.isRequired,
    updateStaffEmail: PropTypes.func.isRequired,
    deleteStaff: PropTypes.func.isRequired,

    clearAllFailures: PropTypes.func.isRequired,
    getPositions: PropTypes.func.isRequired,
    getAllStaffByDepartment: PropTypes.func.isRequired,
    getAllStaffByFaculty: PropTypes.func.isRequired,
    getAllStaffByOrganisation: PropTypes.func.isRequired,
    getAllStaffByRatos: PropTypes.func.isRequired
};

export default Users;