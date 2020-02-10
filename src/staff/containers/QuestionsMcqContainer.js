import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import {
    clearAllQuestionsMcqFailures,
    deleteQuestionMcq,
    getAllQuestionsMcqByThemeId, updateQuestionMcqLevel,
    updateQuestionMcqName, updateQuestionMcqRequired
} from "../actions/questionsMcqActions";
import QuestionsMcq from "../components/QuestionsMcq";
import {getThemeBySelectedId} from "../selectors/themesSelector";

const mapStateToProps = (state, ownProps) => {
    // Extract themeId from URL path
    const {themeId} = ownProps.match.params;
    return {
        userInfo: getUserInfo(state),
        questionsMcq: state.questionsMcq,
        theme: getThemeBySelectedId(state, ownProps),
        questionsMcqContent: state.questionsMcq.content[themeId],
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllQuestionsMcqByThemeId: (themeId)=>dispatch(getAllQuestionsMcqByThemeId(themeId)),
        clearAllQuestionsMcqFailures: ()=>dispatch(clearAllQuestionsMcqFailures()),
        updateQuestionMcqName: (themeId, questionId, name)=>dispatch(updateQuestionMcqName(themeId, questionId, name)),
        updateQuestionMcqLevel: (themeId, questionId, level)=>dispatch(updateQuestionMcqLevel(themeId, questionId, level)),
        updateQuestionMcqRequired: (themeId, questionId, required)=>dispatch(updateQuestionMcqRequired(themeId, questionId, required)),
        deleteQuestionMcq: (themeId, questionId)=>dispatch(deleteQuestionMcq(themeId, questionId))
    }
}

const QuestionsMcqContainer = connect(mapStateToProps, mapDispatchToProps)(QuestionsMcq);

export default QuestionsMcqContainer;