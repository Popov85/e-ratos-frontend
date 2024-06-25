import {getQuestion, getResponse} from "../../selectors/sessionSelector";
import {putResponse} from "../../actions/sessionActions";
import McqMultiComponent from "../../components/questions/McqMultiComponent";
import {connect} from "react-redux";

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

const McqMultiContainer = connect(mapStateToProps, mapDispatchToProps)(McqMultiComponent);

export default McqMultiContainer;