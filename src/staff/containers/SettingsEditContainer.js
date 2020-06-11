import React from 'react';
import {connect} from "react-redux";
import {reset} from "redux-form";
import {getUserInfo} from "../../common/selectors/userSelector";
import {getSettingsById} from "../selectors/settingsSelector";
import {clearSettingsState, saveSettings, updateSettings} from "../actions/settingsEditActions";
import SettingsEdit from "../components/SettingsEdit";

const mapStateToProps = (state, ownProps) => {
    const {setId} = ownProps;
    return {
        userInfo: getUserInfo(state),
        settingsEdit: state.settingsEdit,
        settings: setId ? getSettingsById(state, ownProps) : null //nullable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveSettings: (settingsDTO) => dispatch(saveSettings(settingsDTO)),
        updateSettings: (settingsDTO) => dispatch(updateSettings(settingsDTO)),
        clearSettingsState: ()=>dispatch(clearSettingsState()),
        resetForm: ()=>dispatch(reset('settings-edit')),
    }
}

const SettingsEditContainer = connect(mapStateToProps, mapDispatchToProps)(SettingsEdit);

export default SettingsEditContainer;