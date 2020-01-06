import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import Organisations from "../components/Organisations";
import {clearAllOrgFailures, deleteOrg, getAllOrganisations, updateOrgName} from "../actions/organisationsActions";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        organisations: state.organisations
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllOrganisations: ()=>dispatch(getAllOrganisations()),
        clearAllOrgFailures: ()=>dispatch(clearAllOrgFailures()),
        updateOrgName: (orgId, name)=>dispatch(updateOrgName(orgId, name)),
        deleteOrg: (orgId)=>dispatch(deleteOrg(orgId)),
    }
}

const OrganisationsContainer = connect(mapStateToProps, mapDispatchToProps)(Organisations);

export default OrganisationsContainer;