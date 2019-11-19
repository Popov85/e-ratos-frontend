import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UsersTable from "./UsersTable";
import ProtectedResource from "../../common/ProtectedResource";
import {FaPlus, FaSync} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/Error";
import Overlay from "../../common/Overlay";

class Users extends Component {

    constructor(props) {
        super(props);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    componentDidMount() {
        if (!this.props.users.content)
            this.props.getAllStaffByDepartment();
        if (!this.props.positions.actual)
            this.props.getPositions();
    }

    handleUpdate(staffId, dataField, newValue) {
        //console.log(dataField, newValue);
        switch (dataField) {
            case "user.surname": {
                this.props.updateStaffSurname(staffId, newValue);
                return;
            }
            case "user.name": {
                this.props.updateStaffName(staffId, newValue);
                return;
            }
            case "user.email": {
                this.props.updateStaffEmail(staffId, newValue);
                return;
            }
            case "user.role": {
                this.props.updateStaffRole(staffId, newValue);
                return;
            }
            case "user.active": {
                newValue==="true" ?
                    this.props.enableStaff(staffId) :
                    this.props.disableStaff(staffId);
                return;
            }
            case "position.posId": {
                const {positions} = this.props;
                this.props.updateStaffPosition(staffId, newValue, positions.actual);
                return;
            }
            default: return;
        }
    }

    handleTableChange (type, {cellEdit}) {
        if (cellEdit) {
            const {rowId, dataField, newValue} = cellEdit;
            this.handleUpdate(rowId, dataField, newValue);
        }
    }

    render() {
        const {isDepAdmin, users, positions, roles} = this.props;
        if (!isDepAdmin) return <ProtectedResource/>;
        const {isLoading, isUpdating, error, errorUpdate} = users;

        return (
            <div className="p-1">
                <div className="alert alert-secondary text-center">
                    <h5 className="alert-heading">
                        <strong>Staff management</strong>
                    </h5>
                </div>
                {
                    (error || errorUpdate) &&
                    <Error message = "Operation failed!" close = {()=>this.props.clearAllFailures()}/>
                }
                {
                    !isLoading &&
                    <div className="text-right mt-3 mb-3">
                        <LinkContainer to="/users/new/">
                            <button className = "btn btn-sm btn-success">
                                <FaPlus/>&nbsp;New
                            </button>
                        </LinkContainer>
                        <button className = "btn btn-sm btn-info ml-2"
                                onClick = {()=>this.props.getAllStaffByDepartment()}>
                            <FaSync/>&nbsp;Refresh
                        </button>
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
                                users={users.content}
                                positions={positions}
                                onTableChange={this.handleTableChange}
                            />
                        </LoadingOverlay>
                    </div>
                }

                <Overlay show = {isLoading ? true : false}/>

            </div>
        );
    }
}

Users.propTypes = {
    isDepAdmin: PropTypes.bool.isRequired,
    users: PropTypes.object.isRequired,
    positions: PropTypes.object.isRequired,

    updateStaffName: PropTypes.func.isRequired,
    updateStaffSurname: PropTypes.func.isRequired,
    updateStaffEmail: PropTypes.func.isRequired,
    updateStaffRole: PropTypes.func.isRequired,
    updateStaffPosition: PropTypes.func.isRequired,

    enableStaff: PropTypes.func.isRequired,
    disableStaff: PropTypes.func.isRequired,

    clearAllFailures: PropTypes.func.isRequired,
    getPositions:PropTypes.func.isRequired,
    getAllStaffByDepartment:PropTypes.func.isRequired
};

export default Users;