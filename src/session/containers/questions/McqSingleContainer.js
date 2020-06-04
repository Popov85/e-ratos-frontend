import {connect} from "react-redux";
import McqSingleComponent from "../../components/questions/McqSingleComponent";
import {getQuestion, getResponse} from "../../selectors/sessionSelector";
import {putResponse} from "../../actions/sessionActions";

const mapStateToProps = state => {
    return {
        question: getQuestion(state),
        expanded: state.session.expanded,
        answerIds: getResponse(state) ? getResponse(state).answerIds : [],
    }
}

const mapDispatchToProps = dispatch => {
    return {
        putResponse: (questionId, response) => dispatch(putResponse(questionId, response))
    }
}

const McqSingleContainer = connect(mapStateToProps, mapDispatchToProps)(McqSingleComponent);

export default McqSingleContainer;