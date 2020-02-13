import React from 'react';
import {connect} from "react-redux";
import {getUserInfo} from "../../common/selectors/userSelector";
import {clearQuestionMcqState, saveQuestionsMcqFromFile} from "../actions/questionMcqEditActions";
import QuestionsMcqUpload from "../components/QuestionsMcqUpload";

const mapStateToProps = (state, ownProps) => {
    const {themeId} = ownProps;
    return {
        userInfo: getUserInfo(state),
        questionMcqEdit: state.questionMcqEdit,
        themeId: themeId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveQuestionsMcqFromFile: (file, themeId, confirmed) => dispatch(saveQuestionsMcqFromFile(file, themeId, confirmed)),
        clearQuestionMcqState: () =>dispatch(clearQuestionMcqState())
    }
}

const QuestionsMcqUploadContainer = connect(mapStateToProps, mapDispatchToProps)(QuestionsMcqUpload);

export default QuestionsMcqUploadContainer;