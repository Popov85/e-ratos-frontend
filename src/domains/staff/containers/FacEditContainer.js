import {connect} from "react-redux";
import {reset} from "redux-form";
import {getUserInfo} from "../../common/selectors/userSelector";
import FacEdit from "../components/FacEdit";
import {clearFacState, saveFac, updateFac} from "../actions/facEditActions";
import {getAllOrgForNew} from "../selectors/organisationsSelector";
import {getFacById} from "../selectors/facultiesSelector";

const mapStateToProps = (state, ownProps) => {
    const {facId} = ownProps;
    return {
        userInfo: getUserInfo(state),
        authorization: state.auth.authorization,
        facEdit: state.staff.facEdit,
        organisations: getAllOrgForNew(state), // Nullable
        fac: facId ? getFacById(state, ownProps) : null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveFac: (facDto, org) => dispatch(saveFac(facDto, org)),
        updateFac: (facDto) => dispatch(updateFac(facDto)),
        clearFacState: ()=>dispatch(clearFacState()),
        resetForm: ()=>dispatch(reset('fac-edit')),
    }
}

const FacEditContainer = connect(mapStateToProps, mapDispatchToProps)(FacEdit);

export default FacEditContainer;