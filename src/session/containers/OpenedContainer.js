import {connect} from "react-redux";
import {getCancelled, getCurrent} from "../actions/sessionActions";
import Opened from "../components/Opened";
import {getContext} from "../selectors/contextSelector";

const mapStateToProps = state => {
    return {
        context: getContext(state),
        session: state.session,
        failure: state.failure
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