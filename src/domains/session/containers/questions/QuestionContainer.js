import {getQuestion} from "../../selectors/sessionSelector";
import {connect} from "react-redux";
import QuestionComponent from "../../components/questions/QuestionComponent";
import {setExpanded} from "../../actions/sessionActions";

const mapStateToProps = (state, ownProps) => {
    return {
        question: getQuestion(state),
        expanded: state.session.session.expanded,
        clearResponse: ownProps.clearResponse
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setExpanded: () => dispatch(setExpanded()),
    }
}

const QuestionContainer = connect(mapStateToProps, mapDispatchToProps)(QuestionComponent);

export default QuestionContainer;