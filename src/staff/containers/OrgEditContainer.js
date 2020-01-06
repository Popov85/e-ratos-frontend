import React from 'react';
import {connect} from "react-redux";
import {reset} from "redux-form";
import {getUserInfo} from "../../common/selectors/userSelector";
import OrgEdit from "../components/OrgEdit";
import {clearOrgState, saveOrg, updateOrg} from "../actions/orgEditActions";
import {getOrgById} from "../selectors/organisationsSelector";

const mapStateToProps = (state, ownProps) => {
    const {editableOrgId} = ownProps;
    return {
        userInfo: getUserInfo(state),
        orgEdit: state.orgEdit,
        org: editableOrgId ? getOrgById(state, editableOrgId) : null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveOrg: (orgDto) => dispatch(saveOrg(orgDto)),
        updateOrg: (orgDto) => dispatch(updateOrg(orgDto)),
        clearOrgState: ()=>dispatch(clearOrgState()),
        resetForm: ()=>dispatch(reset('org-edit')),
    }
}

const OrgEditContainer = connect(mapStateToProps, mapDispatchToProps)(OrgEdit);

export default OrgEditContainer;