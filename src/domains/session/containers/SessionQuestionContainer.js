import {connect} from "react-redux";
import {getQuestion, getResponseChecked} from "../selectors/sessionSelector";
import SessionQuestion from "../components/SessionQuestion";

const mapStateToProps = state => {
    return {
        question: getQuestion(state),
        responseChecked: getResponseChecked(state)
    }
}

const SessionQuestionContainer = connect(mapStateToProps)(SessionQuestion);

export default SessionQuestionContainer;