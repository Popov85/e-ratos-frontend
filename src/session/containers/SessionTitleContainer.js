import {connect} from "react-redux";
import {getCancelled, getPaused, getPreserved, getProceeded} from "../actions/sessionActions";
import SessionTitle from "../components/SessionTitle";

const mapStateToProps = state => {
    return {
        panelInfo: state.panelInfo,
        schemeInfo: state.schemeInfo,
        isTimeLimited: state.session.batch.sessionExpiresInSec,
        isPaused: state.session.paused
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCancelled: (schemeId, isLMS)=>dispatch(getCancelled(schemeId, isLMS)),
        getPreserved: (schemeId, isLMS)=>dispatch(getPreserved(schemeId, isLMS)),
        getPaused: (schemeId, isLMS)=>dispatch(getPaused(schemeId, isLMS)),
        getProceeded: (schemeId, isLMS)=>dispatch(getProceeded(schemeId, isLMS))
    }
}

const SessionTitleContainer = connect(mapStateToProps, mapDispatchToProps)(SessionTitle);

export default SessionTitleContainer;