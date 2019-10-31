import React from 'react';
import {connect} from "react-redux";
import StartNavbar from "../components/StartNavbar";
import {getLoggedOut} from "../../common/actions/logoutActions";

const mapStateToProps = state => {
    return {
        panelInfo: state.panelInfo,
        security: state.security
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLoggedOut: () => dispatch(getLoggedOut())
    }
}

const StartNavbarContainer = connect(mapStateToProps, mapDispatchToProps)(StartNavbar);

export default StartNavbarContainer;