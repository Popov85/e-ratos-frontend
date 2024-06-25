import {connect} from "react-redux";
import {
    clearAllResourcesFailures,
    deleteResource,
    getAllResourcesByDepartment,
    updateResourceDescription,
    updateResourceUrl
} from "../actions/resourcesActions";
import Resources from "../components/Resources";

const mapStateToProps = state => {
    return {
        authorization: state.auth.authorization,
        resources: state.staff.resources
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllResourcesByDepartment: () => dispatch(getAllResourcesByDepartment()),
        clearAllResourcesFailures: () => dispatch(clearAllResourcesFailures()),
        updateResourceUrl: (resId, url) => dispatch(updateResourceUrl(resId, url)),
        updateResourceDescription: (resId, description) => dispatch(updateResourceDescription(resId, description)),
        deleteResource: (resId) => dispatch(deleteResource(resId))
    }
}

const ResourcesContainer = connect(mapStateToProps, mapDispatchToProps)(Resources);

export default ResourcesContainer;