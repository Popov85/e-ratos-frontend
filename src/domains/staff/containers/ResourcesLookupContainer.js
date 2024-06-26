import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import {clearAllResourcesFailures, getAllResourcesByDepartment} from "../actions/resourcesActions";
import ResourcesLookup from "../components/ResourcesLookup";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        resources: state.staff.resources
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearAllResourcesFailures: ()=>dispatch(clearAllResourcesFailures()),
        getAllResourcesByDepartment: ()=>dispatch(getAllResourcesByDepartment())
    }
}

const ResourcesLookupContainer = connect(mapStateToProps, mapDispatchToProps)(ResourcesLookup);

export default ResourcesLookupContainer;