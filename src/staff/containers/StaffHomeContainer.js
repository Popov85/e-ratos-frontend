import React from 'react';
import {connect} from "react-redux";
import StaffHome from "../components/StaffHome";
import {getUserInfo} from "../../common/selectors/userSelector";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state)
    }
}

const StaffHomeContainer = connect(mapStateToProps)(StaffHome);

export default StaffHomeContainer;