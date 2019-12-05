import React from 'react';
import {connect} from "react-redux";
import StaffPortal from "../components/StaffPortal";
import {loadUserInfo} from "../../common/actions/userActions";

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo,
        security: state.security
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUserInfo: () => dispatch(loadUserInfo()),
    }
}

const StaffPortalContainer = connect(mapStateToProps, mapDispatchToProps)(StaffPortal);

export default StaffPortalContainer;