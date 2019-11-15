import React from 'react';
import {connect} from "react-redux";
import {isDepAdmin} from "../../common/selectors/userSelector";
import {
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

const mapStateToProps = state => {
    return {
        isDepAdmin: isDepAdmin(state),
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateStaffName: (staffId, name)=>dispatch(updateStaffName(staffId, name)),
        updateStaffSurname: (staffId, surname)=>dispatch(updateStaffSurname(staffId, surname)),
        updateStaffEmail: (staffId, email)=>dispatch(updateStaffEmail(staffId, email)),
        updateStaffRole: (staffId, role)=>dispatch(updateStaffRole(staffId, role)),
        // TODO?
        updateStaffPosition: (staffId, positionId, positions)=>dispatch(updateStaffPosition(staffId, positionId, positions)),

        enableStaff: (staffId)=>dispatch(enableStaff(staffId)),
        disableStaff: (staffId)=>dispatch(disableStaff(staffId)),

        getAllStaffByDepartment: () => dispatch(getAllStaffByDepartment())
    }
}

const UsersTableContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersTableContainer;