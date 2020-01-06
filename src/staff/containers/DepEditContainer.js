import React from 'react';
import {connect} from "react-redux";
import {reset} from "redux-form";
import {getUserInfo} from "../../common/selectors/userSelector";
import DepEdit from "../components/DepEdit";
import {getAllOrgForNew} from "../selectors/organisationsSelector";
import {getFacFromStoreForNewByOrgId} from "../selectors/facultiesSelector";
import {clearDepState, saveDep, updateDep} from "../actions/depEditActions";
import {clearOrgIdSelected, setOrgIdSelected} from "../actions/organisationsActions";
import {getDepById} from "../selectors/departmentsSelector";

const mapStateToProps = (state, ownProps) => {
    const {editableDepId} = ownProps;
    return {
        userInfo: getUserInfo(state),
        depEdit: state.depEdit,
        facContent: state.faculties.content, // Nullable
        organisations: getAllOrgForNew(state), // Nullable
        faculties: getFacFromStoreForNewByOrgId(state), // Nullable
        dep: editableDepId ? getDepById(state, editableDepId) : null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveDep: (depDTO) => dispatch(saveDep(depDTO)),
        updateDep: (depDTO) => dispatch(updateDep(depDTO)),
        clearDepState: ()=>dispatch(clearDepState()),
        setOrgIdSelected: (orgId) => dispatch(setOrgIdSelected(orgId)),
        clearOrgIdSelected: () => dispatch(clearOrgIdSelected()),
        resetForm: ()=>dispatch(reset('dep-edit')),
    }
}

const DepEditContainer = connect(mapStateToProps, mapDispatchToProps)(DepEdit);

export default DepEditContainer;