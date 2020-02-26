import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
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
        userInfo: getUserInfo(state),
        resources: state.resources
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllResourcesByDepartment: ()=>dispatch(getAllResourcesByDepartment()),
        clearAllResourcesFailures: ()=>dispatch(clearAllResourcesFailures()),
        updateResourceUrl: (resId, url)=>dispatch(updateResourceUrl(resId, url)),
        updateResourceDescription: (resId, description)=>dispatch(updateResourceDescription(resId, description)),
        deleteResource: (resId)=>dispatch(deleteResource(resId))
    }
}

const ResourcesContainer = connect(mapStateToProps, mapDispatchToProps)(Resources);

export default ResourcesContainer;