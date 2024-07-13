import {getQuestion} from "../../selectors/sessionSelector";
import {connect} from "react-redux";
import QuestionComponent from "../../components/questions/QuestionComponent";
import {setExpanded, setFontSize} from "../../actions/sessionActions";

const mapStateToProps = (state, ownProps) => {
    return {
        question: getQuestion(state),
        expanded: state.session.session.expanded,
        fontSize: state.session.session.fontSize,
        clearResponse: ownProps.clearResponse
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setExpanded: () => dispatch(setExpanded()),
        setFontSize: () => dispatch(setFontSize()),
    }
}

const QuestionContainer = connect(mapStateToProps, mapDispatchToProps)(QuestionComponent);

export default QuestionContainer;