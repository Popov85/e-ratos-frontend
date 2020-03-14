import React from 'react';
import {connect} from "react-redux";
import {reset} from "redux-form";
import {getUserInfo} from "../../common/selectors/userSelector";
import HelpEdit from "../components/HelpEdit";
import {clearHelpState, saveHelp, updateHelp} from "../actions/helpEditActions";
import {getHelpById} from "../selectors/helpsSelector";

const mapStateToProps = (state, ownProps) => {
    const {helpId} = ownProps;
    return {
        userInfo: getUserInfo(state),
        helpEdit: state.helpEdit,
        help: helpId ? getHelpById(state, ownProps) : null //nullable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveHelp: (helpDTO) => dispatch(saveHelp(helpDTO)),
        updateHelp: (helpDTO) => dispatch(updateHelp(helpDTO)),
        clearHelpState: ()=>dispatch(clearHelpState()),
        resetForm: ()=>dispatch(reset('help-edit')),
    }
}

const HelpEditContainer = connect(mapStateToProps, mapDispatchToProps)(HelpEdit);

export default HelpEditContainer;