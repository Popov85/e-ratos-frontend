import React from 'react';
import {connect} from "react-redux";
import {
    clearAllFailures, deleteStaff,
    getAllStaffByDepartment, getAllStaffByFaculty, getAllStaffByOrganisation, getAllStaffByRatos,
    updateStaffEmail,
    updateStaffName,
    updateStaffSurname
} from "../actions/usersActions";
import Users from "../components/Users";
import {getPositions} from "../actions/positionsActions";
import {getRoles} from "../selectors/rolesSelector";

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo,
        users: state.users,
        roles: getRoles(state),
        positions: state.positions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateStaffName: (staffId, name)=>dispatch(updateStaffName(staffId, name)),
        updateStaffSurname: (staffId, surname)=>dispatch(updateStaffSurname(staffId, surname)),
        updateStaffEmail: (staffId, email)=>dispatch(updateStaffEmail(staffId, email)),
        deleteStaff: (staffId)=>dispatch(deleteStaff(staffId)),

        clearAllFailures: () => dispatch(clearAllFailures()),
        getPositions: () => dispatch(getPositions()),
        getAllStaffByDepartment: () => dispatch(getAllStaffByDepartment()),
        getAllStaffByFaculty: () => dispatch(getAllStaffByFaculty()),
        getAllStaffByOrganisation: () => dispatch(getAllStaffByOrganisation()),
        getAllStaffByRatos: () => dispatch(getAllStaffByRatos())
    }
}

const UsersTableContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersTableContainer;