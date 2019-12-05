import React from 'react';
import {connect} from "react-redux";
import {
    clearAllFailures,
    disableStaff,
    enableStaff,
    getAllStaffByDepartment,
    updateStaffEmail,
    updateStaffName,
    updateStaffPosition,
    updateStaffRole,
    updateStaffSurname
} from "../actions/usersActions";
import Users from "../components/Users";
import {getPositions} from "../actions/positionsActions";

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo,
        users: state.users,
        roles: state.roles,
        positions: state.positions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateStaffName: (staffId, name)=>dispatch(updateStaffName(staffId, name)),
        updateStaffSurname: (staffId, surname)=>dispatch(updateStaffSurname(staffId, surname)),
        updateStaffEmail: (staffId, email)=>dispatch(updateStaffEmail(staffId, email)),
        updateStaffRole: (staffId, role)=>dispatch(updateStaffRole(staffId, role)),
        updateStaffPosition: (staffId, positionId, positions)=>dispatch(updateStaffPosition(staffId, positionId, positions)),

        enableStaff: (staffId)=>dispatch(enableStaff(staffId)),
        disableStaff: (staffId)=>dispatch(disableStaff(staffId)),

        clearAllFailures: () => dispatch(clearAllFailures()),
        getPositions: () => dispatch(getPositions()),
        getAllStaffByDepartment: () => dispatch(getAllStaffByDepartment())
    }
}

const UsersTableContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersTableContainer;