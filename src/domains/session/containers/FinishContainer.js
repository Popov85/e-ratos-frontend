import { connect } from "react-redux";
import Finish from "../components/Finish";
import {resetSession} from "../actions/sessionActions";
import {getResult} from "../selectors/sessionSelector";
import {getContext} from "../selectors/contextSelector";

const mapStateToProps = state => {
    return {
        context: getContext(state),
        result: getResult(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetSession: (schemeId, isLMS) => dispatch(resetSession(schemeId, isLMS)),
    }
}

const FinishContainer = connect(mapStateToProps, mapDispatchToProps)(Finish);


export default FinishContainer;