import {connect} from "react-redux";
import {getFinished, getFinishedBatch, getNext} from "../actions/sessionActions";
import {getQuestion, getResponseChecked} from "../selectors/sessionSelector";
import {getContext, getMode, getSchemeInfo} from "../selectors/contextSelector";
import Session from "../components/Session";

const mapStateToProps = state => {
    return {
        context: getContext(state),
        scheme: getSchemeInfo(state).name,
        mode: getMode(state),
        session: state.session.session,
        failure: state.session.failure,

        question: getQuestion(state),
        responseChecked: getResponseChecked(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNext: (schemeId, isLMS, batch) => dispatch(getNext(schemeId, isLMS, batch)),
        getFinished: (schemeId, isLMS)=>dispatch(getFinished(schemeId, isLMS)),
        getFinishedBatch: (schemeId, isLMS, batch)=>dispatch(getFinishedBatch(schemeId, isLMS, batch))
    }
}

const SessionContainer = connect(mapStateToProps, mapDispatchToProps)(Session);

export default SessionContainer;