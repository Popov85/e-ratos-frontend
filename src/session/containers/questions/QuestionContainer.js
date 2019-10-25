import {getQuestion} from "../../selectors/sessionSelector";
import {connect} from "react-redux";
import QuestionComponent from "../../components/questions/QuestionComponent";

const mapStateToProps = (state, ownProps) => {
    return {
        question: getQuestion(state),
        clearResponse: ownProps.clearResponse
    }
}

const QuestionContainer = connect(mapStateToProps)(QuestionComponent);

export default QuestionContainer;