import React from 'react';
import {connect} from "react-redux";
import {reset} from "redux-form";
import {getUserInfo} from "../../common/selectors/userSelector";
import {clearModeState, saveMode, updateMode} from "../actions/modeEditActions";
import {getModeById} from "../selectors/modesSelector";
import ModeEdit from "../components/ModeEdit";

const mapStateToProps = (state, ownProps) => {
    const {modeId} = ownProps;
    return {
        userInfo: getUserInfo(state),
        modeEdit: state.modeEdit,
        mode: modeId ? getModeById(state, ownProps) : null //nullable
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveMode: (modeDTO) => dispatch(saveMode(modeDTO)),
        updateMode: (modeDTO) => dispatch(updateMode(modeDTO)),
        clearModeState: ()=>dispatch(clearModeState()),
        resetForm: ()=>dispatch(reset('mode-edit')),
    }
}

const ModeEditContainer = connect(mapStateToProps, mapDispatchToProps)(ModeEdit);

export default ModeEditContainer;