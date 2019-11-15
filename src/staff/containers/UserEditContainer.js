import React from 'react';
import {connect} from "react-redux";
import UserEdit from "../components/UserEdit";
import {reset} from "redux-form";
import {resetStaffState, saveStaff, updateStaff} from "../actions/userEditActions";
import {getUser} from "../selectors/usersSelector";
import {getPositions} from "../actions/positionsActions";

const mapStateToProps = (state, ownProps) => {
    let staffId = ownProps.staffId;
    return {
        userEdit: state.userEdit,
        positions: state.positions,
        user: getUser(state, staffId)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPositions: () => dispatch(getPositions()),
        saveStaff: (staffDTO) => dispatch(saveStaff(staffDTO)),
        updateStaff: (staffDTO) => dispatch(updateStaff(staffDTO)),
        resetStaffState: () => dispatch(resetStaffState()),
        resetForm: ()=>dispatch(reset('staff-edit')),
    }
}

const UserEditContainer = connect(mapStateToProps, mapDispatchToProps)(UserEdit);

export default UserEditContainer;