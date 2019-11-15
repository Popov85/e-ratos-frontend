import React from 'react';
import {connect} from "react-redux";
import StaffPortal from "../components/StaffPortal";

const mapStateToProps = state => {
    return {
        security: state.security
    }
}

const StaffPortalContainer = connect(mapStateToProps)(StaffPortal);

export default StaffPortalContainer;