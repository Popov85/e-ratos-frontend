import {connect} from "react-redux";
import {getChecked, fetchHelp, getSkipped, getStarred, invertReport, showHelp} from "../actions/sessionActions";
import SessionControls from "../components/SessionControls";
import {getContext, getMode} from "../selectors/contextSelector";
import {getHelp, getQuestion, getResponse} from "../selectors/sessionSelector";

const mapStateToProps = (state, ownProps) => {
    return {
        context: getContext(state),
        question: getQuestion(state),
        mode: getMode(state),
        help: getHelp(state),
        reportModeOn: state.session.report,
        response: getResponse(state) // ownProps.response
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSkipped: (schemeId, questionId, isLMS)=>dispatch(getSkipped(schemeId, questionId, isLMS)),
        getChecked: (schemeId, isLMS, questionId, response)=>dispatch(getChecked(schemeId, isLMS, questionId, response)),
        getStarred: (schemeId, questionId, isLMS, stars)=>dispatch(getStarred(schemeId, questionId, isLMS, stars)),
        fetchHelp: (schemeId, questionId, isLMS) => dispatch(fetchHelp(schemeId, questionId, isLMS)),

        showHelp: ()=>dispatch(showHelp()),
        invertReport: ()=>dispatch(invertReport())
    }
}

const SessionControlsContainer = connect(mapStateToProps, mapDispatchToProps)(SessionControls);

export default SessionControlsContainer;