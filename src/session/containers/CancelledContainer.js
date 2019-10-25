import { connect } from "react-redux";
import Cancelled from "../components/Cancelled";
import {resetSession} from "../actions/sessionActions";

const mapStateToProps = state => {
    return {
        result: state.session.result
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetSession: () => dispatch(resetSession())
    }
}

const CancelledContainer = connect(mapStateToProps, mapDispatchToProps)(Cancelled);

export default CancelledContainer;