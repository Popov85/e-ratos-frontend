import React from 'react';
import {connect} from "react-redux";
import UserEdit from "../components/UserEdit";
import {reset} from "redux-form";
import {resetStaffState, saveStaff, updateStaff} from "../actions/userEditActions";
import {getUserById} from "../selectors/usersSelector";
import {getPositions} from "../actions/positionsActions";
import {
    clearAllOnFacultyReset,
    clearAllOnOrganisationReset,
    getAllDepartmentsForSelectorByFacultyId,
    getAllFacultiesForSelectorByOrganisationId,
    initAffiliationSelector,
    initAffiliationSelectorForStaffEditForm
} from "../actions/affiliationSelectorActions";
import {getUserInfo} from "../../common/selectors/userSelector";
import {getRoles} from "../selectors/rolesSelector";


const mapStateToProps = (state, ownProps) => {
    let {staffId} = ownProps;
    return {
        userInfo: getUserInfo(state),
        user: getUserById(state, ownProps),
        userEdit: state.userEdit,
        positions: staffId ? state.positions.forEdit: state.positions.forNew,
        roles: staffId ? getRoles(state).forEdit: getRoles(state).forNew,
        affiliationSelector: state.affiliationSelector
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveStaff: (staffDTO) => dispatch(saveStaff(staffDTO)),
        updateStaff: (staffDTO) => dispatch(updateStaff(staffDTO)),
        resetStaffState: () => dispatch(resetStaffState()),
        getPositions: () => dispatch(getPositions()),
        resetForm: ()=>dispatch(reset('staff-edit')),

        initAffiliationSelector: (role, affiliationSelector)=>dispatch(initAffiliationSelector(role, affiliationSelector)),
        initAffiliationSelectorForStaffEditForm: (authenticated, user, affiliationSelector)=>dispatch(initAffiliationSelectorForStaffEditForm(authenticated, user, affiliationSelector)),

        getAllFacultiesForSelectorByOrganisationId: (orgId, affiliationSelector)=>dispatch(getAllFacultiesForSelectorByOrganisationId(orgId, affiliationSelector)),
        getAllDepartmentsForSelectorByFacultyId: (facId, affiliationSelector)=>dispatch(getAllDepartmentsForSelectorByFacultyId(facId, affiliationSelector)),

        clearAllOnOrganisationReset: ()=>dispatch(clearAllOnOrganisationReset()),
        clearAllOnFacultyReset: ()=>dispatch(clearAllOnFacultyReset()),
    }
}

const UserEditContainer = connect(mapStateToProps, mapDispatchToProps)(UserEdit);

export default UserEditContainer;