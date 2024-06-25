import {connect} from "react-redux";
import {reset} from "redux-form";
import {getUserInfo} from "../../common/selectors/userSelector";
import {clearQuestionMcqState, saveQuestionMcq, updateQuestionMcq} from "../actions/questionMcqEditActions";
import QuestionMcqEdit from "../components/QuestionMcqEdit";
import {getQuestionMcqByThemeIdAndQuestionId} from "../selectors/questionMcqSelector";

const mapStateToProps = (state, ownProps) => {
    const {questionId, themeId} = ownProps;
    return {
        userInfo: getUserInfo(state),
        questionMcqEdit: state.staff.questionMcqEdit,
        helpsForSelect: [{helpId: 1, name: "My help #1", help: "Very long help on this question"}],
        resourcesForSelect: [{resourceId: 1, name: "My resource #1", link: "http://resource.com"}],
        questionMcq: questionId ? getQuestionMcqByThemeIdAndQuestionId(state, ownProps) : null, //nullable
        themeId: themeId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveQuestionMcq: (questionMcqDTO) => dispatch(saveQuestionMcq(questionMcqDTO)),
        updateQuestionMcq: (questionMcqDTO) => dispatch(updateQuestionMcq(questionMcqDTO)),
        clearQuestionMcqState: () => dispatch(clearQuestionMcqState()),
        // Get all department resources
        // Get all departments helps
        getAllDepartmentsHelps: () => dispatch(alert('Get all helps')),
        getAllDepartmentsResources: () => dispatch(alert('Get all resources')),
        resetForm: () => dispatch(reset('question-mcq-edit')),
    }
}

const QuestionMcqEditContainer = connect(mapStateToProps, mapDispatchToProps)(QuestionMcqEdit);

export default QuestionMcqEditContainer;