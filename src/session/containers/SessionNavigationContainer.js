import {connect} from "react-redux";
import {showNext, showPrev} from "../actions/sessionActions";
import {getBatch} from "../selectors/sessionSelector";
import SessionNavigation from "../components/SessionNavigation";

const mapStateToProps = (state, ownProps) => {
    return {
        batch: getBatch(state),
        questionNumber: state.session.questionNumber,
        isOnPause: state.session.paused,
        handleSubmit: ownProps.handleSubmit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showNext: ()=>dispatch(showNext()),
        showPrev: ()=>dispatch(showPrev())
    }
}

const SessionNavigationContainer = connect(mapStateToProps, mapDispatchToProps)(SessionNavigation);

export default SessionNavigationContainer;