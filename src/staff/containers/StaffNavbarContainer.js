import React from 'react';
import {connect} from "react-redux";
import {getLoggedOut} from "../../common/actions/logoutActions";
import StaffNavbar from "../components/StaffNavbar";

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo,
        security: state.security
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLoggedOut: () => dispatch(getLoggedOut())
    }
}

const StaffNavbarContainer = connect(mapStateToProps, mapDispatchToProps)(StaffNavbar);

export default StaffNavbarContainer;