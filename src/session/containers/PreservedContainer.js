import {connect} from "react-redux";
import {getRetrieved, resetSession} from "../actions/sessionActions";
import Preserved from "../components/Preserved";

const mapStateToProps = state => {
    return {
        isLMS: state.panelInfo.lms,
        session: state.session,
        failure: state.failure,
        preserved: state.session.preserved
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