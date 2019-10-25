import {connect} from "react-redux";
import {getReported, hideReport} from "../actions/sessionActions";
import Reported from "../components/Reported";
import {getQuestion, getReport} from "../selectors/sessionSelector";

const mapStateToProps = state => {
    return {
        isLMS: state.panelInfo.lms,
        schemeId: state.schemeInfo.schemeId,
        questionId: getQuestion(state).questionId,
        complaints: getReport(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideReport: () => dispatch(hideReport()),
        getReported: (schemeId, questionId, isLMS, types) => dispatch(getReported(schemeId, questionId, isLMS, types))
    }
}

const ReportedContainer = connect(mapStateToProps, mapDispatchToProps)(Reported);

export default ReportedContainer;