import React from 'react';
import {connect} from "react-redux";
import {getLoggedOut} from "../../common/actions/logoutActions";
import StaffNavbar from "../components/StaffNavbar";
import {isDepAdmin} from "../../common/selectors/userSelector";

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo,
        isDepAdmin: isDepAdmin(state),
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