import { connect } from "react-redux";
import {
    getCancelled,
    getCurrent
} from "../actions/sessionActions";
import Opened from "../components/Opened";

const mapStateToProps = state => {
    return {
        isLMS: state.panelInfo.lms,
        schemeId: state.schemeInfo.schemeId,
        session: state.session,
        failure: state.failure,
        result: state.session.result
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCurrent: (schemeId, isLMS)=>dispatch(getCurrent(schemeId, isLMS)),
        getCancelled: (schemeId, isLMS)=>dispatch(getCancelled(schemeId, isLMS))
    }
}

const OpenedContainer = connect(mapStateToProps, mapDispatchToProps)(Opened);

export default OpenedContainer;