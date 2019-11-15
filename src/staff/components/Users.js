import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UsersTable from "./UsersTable";
import ProtectedResource from "../../common/ProtectedResource";
import Spinner from "../../common/Spinner";
import Header from "../../common/Header";
import {FaPlus, FaSync} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";

class Users extends Component {

    constructor(props) {
        super(props);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    componentDidMount() {
        // TODO: check and re-think!
        if (!this.props.users.content)
            this.props.getAllStaffByDepartment();
    }

    handleUpdate(staffId, dataField, newValue) {
        console.log("staffId = , dataField = , newValue =", staffId, dataField, newValue);
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
            default: return;
        }
    }

    handleTableChange (type, {page, sizePerPage, filters, sortField, sortOrder, cellEdit}) {
        if (cellEdit) {
            const {rowId, dataField, newValue} = cellEdit;
            this.handleUpdate(rowId, dataField, newValue);
        } /*else {
            let params = `page=${page}&size=${sizePerPage}${sortField ? '&sort='+sortField+','+sortOrder: ''}`;
            console.log("params = ", params);
            let filter = filters["user.surname"];
            if (!filter) {
                this.props.getStaffByDepartment(params);
            } else {
                let letters = filter.filterVal;
                console.log("filter = ", letters);
                this.props.getStaffByDepartmentAndSurnameLettersContains(letters, params);
            }
        }*/
    }

    render() {

        const {isDepAdmin, users} = this.props;

        if (!isDepAdmin) return <ProtectedResource/>;

        const {isLoading, isUpdating, error} = users;

        return (
            <div className="p-3">
                <div className="alert alert-secondary text-center">
                    <h5 className="alert-heading">
                        <strong>Staff management</strong>
                    </h5>
                </div>
                {
                    isLoading &&
                    <Spinner
                        color = "secondary"
                        message = "Wait... API call is in progress!"
                    />
                }
                {
                    error &&
                    <div className="text-center">
                        <Header
                            widely
                            color = "alert-danger"
                            title = "Failed to perform API call..."
                        />
                    </div>
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
                    !isLoading && !error && users.content ?
                    <div>
                        <UsersTable
                            users={users.content}
                            isUpdating = {isUpdating ? true : false}
                            onTableChange={this.handleTableChange}
                        />
                    </div> : null
                }
            </div>
        );
    }
}

Users.propTypes = {
    isDepAdmin: PropTypes.bool.isRequired,
    users: PropTypes.object.isRequired,

    updateStaffName: PropTypes.func.isRequired,
    updateStaffSurname: PropTypes.func.isRequired,
    updateStaffEmail: PropTypes.func.isRequired,
    updateStaffRole: PropTypes.func.isRequired,
    updateStaffPosition: PropTypes.func.isRequired,

    enableStaff: PropTypes.func.isRequired,
    disableStaff: PropTypes.func.isRequired,

    getAllStaffByDepartment:PropTypes.func.isRequired
};

export default Users;