import {connect} from "react-redux";
import {reset} from "redux-form";
import OrgEdit from "../components/OrgEdit";
import {clearOrgState, saveOrg, updateOrg} from "../actions/orgEditActions";
import {getOrgById} from "../selectors/organisationsSelector";

const mapStateToProps = (state, ownProps) => {
    const {orgId} = ownProps;
    return {
        authorization: state.auth.authorization,
        orgEdit: state.staff.orgEdit,
        org: orgId ? getOrgById(state, ownProps) : null
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