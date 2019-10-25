import React from 'react';
import Start from "../components/Start";
import {connect} from "react-redux";
import {getStarted} from "../actions/sessionActions";

const mapStateToProps = (state) => {
    return {
        panelInfo: state.panelInfo,
        schemeInfo: state.schemeInfo,
        session: state.session,
        logout: state.logout,
        failure: state.failure
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStarted: (schemeId, isLMS) => dispatch(getStarted(schemeId, isLMS))
    }
}

const StartContainer = connect(mapStateToProps, mapDispatchToProps)(Start);

export default StartContainer;