import React from 'react';
import {connect} from "react-redux";
import {reset} from "redux-form";
import {getUserInfo} from "../../common/selectors/userSelector";
import {clearResourceState, saveResource, updateResource} from "../actions/resourceEditActions";
import {getResourceById} from "../selectors/resourcesSelector";
import ResourceEdit from "../components/ResourceEdit";

const mapStateToProps = (state, ownProps) => {
    const {resourceId} = ownProps;
    return {
        userInfo: getUserInfo(state),
        resourceEdit: state.resourceEdit,
        resource: resourceId ? getResourceById(state, ownProps) : null //nullable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveResource: (resourceDTO) => dispatch(saveResource(resourceDTO)),
        updateResource: (resourceDTO) => dispatch(updateResource(resourceDTO)),
        clearResourceState: ()=>dispatch(clearResourceState()),
        resetForm: ()=>dispatch(reset('resource-edit')),
    }
}

const ResourceEditContainer = connect(mapStateToProps, mapDispatchToProps)(ResourceEdit);

export default ResourceEditContainer;