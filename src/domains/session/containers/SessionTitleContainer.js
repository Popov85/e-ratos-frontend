import {connect} from "react-redux";
import {getCancelled, getPaused, getPreserved, getProceeded} from "../actions/sessionActions";
import SessionTitle from "../components/SessionTitle";
import {getContext, getSchemeInfo} from "../selectors/contextSelector";
import {getUserInfo} from "../../common/selectors/userSelector";

const mapStateToProps = state => {
    return {
        context: getContext(state),
        userInfo: getUserInfo(state),
        schemeInfo: getSchemeInfo(state),
        isTimeLimited: !!state.session.session.batch.sessionExpiresInSec,
        isPaused: state.session.session.paused
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