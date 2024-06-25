import { connect } from "react-redux";
import {getFinished} from "../actions/sessionActions";
import RunOutOfTime from "../components/RunOutOfTime";
import {getContext} from "../selectors/contextSelector";

const mapStateToProps = state => {
    return {
        context: getContext(state),
        session: state.session.session,
        failure: state.session.failure,
        result: state.session.session.result
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getFinished: (schemeId, isLMS)=>dispatch(getFinished(schemeId, isLMS))
    }
}

const RunOutOfTimeContainer = connect(mapStateToProps, mapDispatchToProps)(RunOutOfTime);

export default RunOutOfTimeContainer;