import React from 'react';
import {connect} from "react-redux";
import {clearLoadingFailure} from "../actions/affiliationSelectorCacheableActions";
import Structure from "../components/Structure";
import {getUserInfo} from "../../common/selectors/userSelector";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearLoadingFailure: ()=>dispatch(clearLoadingFailure()),
    }
}

const StructureContainer = connect(mapStateToProps, mapDispatchToProps)(Structure);

export default StructureContainer;