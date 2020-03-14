import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import {getAllResourcesByDepartment} from "../actions/resourcesActions";
import ResourcesLookup from "../components/ResourcesLookup";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        resources: state.resources
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllResourcesByDepartment: ()=>dispatch(getAllResourcesByDepartment())
    }
}

const ResourcesLookupContainer = connect(mapStateToProps, mapDispatchToProps)(ResourcesLookup);

export default ResourcesLookupContainer;