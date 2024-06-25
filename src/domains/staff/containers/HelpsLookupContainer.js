import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import {clearAllHelpsFailures, getAllHelpsByDepartment} from "../actions/helpsActions";
import HelpsLookup from "../components/HelpsLookup";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        helps: state.helps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearAllHelpsFailures: ()=>dispatch(clearAllHelpsFailures()),
        getAllHelpsByDepartment: ()=>dispatch(getAllHelpsByDepartment())
    }
}

const HelpsLookupContainer = connect(mapStateToProps, mapDispatchToProps)(HelpsLookup);

export default HelpsLookupContainer;