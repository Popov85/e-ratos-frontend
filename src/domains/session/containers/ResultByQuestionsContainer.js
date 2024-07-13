import {connect} from "react-redux";
import ResultByQuestions from "../components/ResultByQuestions";

const mapStateToProps = (state, ownProps) => {
    return {
        questionResults: ownProps.questionResults,
        fontSize: state.session.session.fontSize
    }
}

const ResultByQuestionsContainer = connect(mapStateToProps)(ResultByQuestions);

export default ResultByQuestionsContainer;