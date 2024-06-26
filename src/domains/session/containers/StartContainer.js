import Start from "../components/Start";
import {connect} from "react-redux";
import {getStarted} from "../actions/sessionActions";
import {getContext, getSchemeInfo} from "../selectors/contextSelector";

const mapStateToProps = (state) => {
    return {
        context: getContext(state),
        schemeInfo: getSchemeInfo(state),
        session: state.session.session,
        failure: state.session.failure
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getStarted: (schemeId, isLMS) => dispatch(getStarted(schemeId, isLMS))
    }
}

const StartContainer = connect(mapStateToProps, mapDispatchToProps)(Start);

export default StartContainer;