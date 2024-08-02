import {connect} from "react-redux";
import {getReported, hideReport} from "../actions/sessionActions";
import Reported from "../components/Reported";
import {getQuestion, getReport} from "../selectors/sessionSelector";
import {getSchemeInfo} from "../selectors/contextSelector";
import {isLMS} from "../../common/selectors/userSelector";

const mapStateToProps = state => {
    return {
        isLMS: isLMS(state),
        schemeId: getSchemeInfo(state).schemeId,
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