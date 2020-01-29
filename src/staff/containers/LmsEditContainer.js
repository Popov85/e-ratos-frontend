import React from 'react';
import {connect} from "react-redux";
import {reset} from "redux-form";
import {getUserInfo} from "../../common/selectors/userSelector";
import {getLMSById} from "../selectors/lmsSelector";
import {clearLMSState, saveLMS, updateLMS} from "../actions/lmsEditActions";
import LmsEdit from "../components/LmsEdit";
import {getLtiVersions} from "../actions/ltiVersionsActions";
import {getAllLTIVersionsForSelect} from "../selectors/ltiVersionSelector";

const mapStateToProps = (state, ownProps) => {
    const {lmsId} = ownProps;
    return {
        userInfo: getUserInfo(state),
        lmsEdit: state.lmsEdit,
        ltiVersionsForSelect: getAllLTIVersionsForSelect(state), //nullable
        lms: lmsId ? getLMSById(state, ownProps) : null, //nullable
        generatedClientSecret: state.lmsEdit.generatedClientSecret
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveLMS: (lmsDTO) => dispatch(saveLMS(lmsDTO)),
        updateLMS: (lmsDTO) => dispatch(updateLMS(lmsDTO)),
        clearLMSState: ()=>dispatch(clearLMSState()),
        getLtiVersions: ()=>dispatch(getLtiVersions()),
        resetForm: ()=>dispatch(reset('lms-edit')),
    }
}

const LmsEditContainer = connect(mapStateToProps, mapDispatchToProps)(LmsEdit);

export default LmsEditContainer;