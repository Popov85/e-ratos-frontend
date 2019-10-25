import React from 'react';
import {connect} from "react-redux";
import StartNavbar from "../components/StartNavbar";
import {doLogout} from "../actions/logoutActions";

const mapStateToProps = state => {
    return {
        panelInfo: state.panelInfo,
        logout: state.logout
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doLogout: () => dispatch(doLogout())
    }
}

const StartNavbarContainer = connect(mapStateToProps, mapDispatchToProps)(StartNavbar);

export default StartNavbarContainer;