import {connect} from "react-redux";
import StatusMod from "../components/StatusMod";
import {closeFailure} from "../actions/failureActions";

const mapStateToProps = state => {
    return {
        failure: state.session.failure
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeFailure: () => dispatch(closeFailure())
    }
}

const StatusModContainer = connect(mapStateToProps, mapDispatchToProps)(StatusMod);

export default StatusModContainer;