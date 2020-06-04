import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import {getQuestionMcqByThemeIdAndQuestionId} from "../selectors/questionMcqSelector";
import PreviewMcqQuestion from "../components/PreviewMcqQuestion";

const mapStateToProps = (state, ownProps) => {
    const {questionId, themeId} = ownProps;
    return {
        userInfo: getUserInfo(state),
        questionMcq: questionId ? getQuestionMcqByThemeIdAndQuestionId(state, ownProps) : null
    }
}

const PreviewMcqQuestionContainer = connect(mapStateToProps)(PreviewMcqQuestion);

export default PreviewMcqQuestionContainer;