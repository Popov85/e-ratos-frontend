import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import {
    clearAllHelpsFailures,
    deleteHelp,
    getAllHelpsByDepartment,
    updateHelpName,
    updateHelpText
} from "../actions/helpsActions";
import Helps from "../components/Helps";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        helps: state.helps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllHelpsByDepartment: ()=>dispatch(getAllHelpsByDepartment()),
        clearAllHelpsFailures: ()=>dispatch(clearAllHelpsFailures()),
        updateHelpName: (helpId, name)=>dispatch(updateHelpName(helpId, name)),
        updateHelpText: (helpId, help)=>dispatch(updateHelpText(helpId, help)),
        deleteHelp: (helpId)=>dispatch(deleteHelp(helpId))
    }
}

const HelpsContainer = connect(mapStateToProps, mapDispatchToProps)(Helps);

export default HelpsContainer;