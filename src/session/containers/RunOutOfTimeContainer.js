import { connect } from "react-redux";
import {getFinished} from "../actions/sessionActions";
import RunOutOfTime from "../components/RunOutOfTime";

const mapStateToProps = state => {
    return {
        panelInfo: state.panelInfo,
        schemeInfo: state.schemeInfo,
        session: state.session,
        failure: state.failure,
        result: state.session.result
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getFinished: (schemeId, isLMS)=>dispatch(getFinished(schemeId, isLMS))
    }
}

const RunOutOfTimeContainer = connect(mapStateToProps, mapDispatchToProps)(RunOutOfTime);

export default RunOutOfTimeContainer;