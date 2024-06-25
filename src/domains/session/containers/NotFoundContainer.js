import {connect} from "react-redux";
import {resetSession} from "../actions/sessionActions";
import NotFound from "../components/NotFound";
import {resetFailure} from "../actions/failureActions";

const mapDispatchToProps = dispatch => {
    return {
        resetSession: () => dispatch(resetSession()),
        resetFailure: () => dispatch(resetFailure())
    }
}

const NotFoundContainer = connect(null, mapDispatchToProps)(NotFound);

export default NotFoundContainer;