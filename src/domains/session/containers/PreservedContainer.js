import {connect} from "react-redux";
import {getRetrieved, resetSession} from "../actions/sessionActions";
import Preserved from "../components/Preserved";
import {isLMS} from "../selectors/contextSelector";

const mapStateToProps = state => {
    return {
        isLMS: isLMS(state),
        session: state.session.session,
        failure: state.session.failure,
        preserved: state.session.session.preserved
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetSession: () =>dispatch(resetSession()),
        getRetrieved: (key, isLMS)=>dispatch(getRetrieved(key, isLMS))
    }
}

const PreservedContainer = connect(mapStateToProps, mapDispatchToProps)(Preserved);

export default PreservedContainer;