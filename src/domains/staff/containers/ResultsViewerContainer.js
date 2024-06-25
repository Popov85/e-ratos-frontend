import {connect} from "react-redux";
import {getResultById} from "../selectors/resultSelector";
import {clearAllResultDetailsFailures, getResult} from "../actions/resultDetailsActions";
import ResultsViewer from "../components/ResultsViewer";

const mapStateToProps = (state, ownProps) => {
    const {resultId} = ownProps;
    //console.log("ResultId = ", resultId);
    if (!resultId) throw new Error("Cannot get result, resultId is not present!");
    return {
        userInfo: state.auth.userInfo,
        resultId: resultId,
        result: getResultById(state, ownProps),
        resultDetails: state.staff.resultDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getResult: (resultId) => dispatch(getResult(resultId)),
        clearAllResultDetailsFailures: () => dispatch(clearAllResultDetailsFailures())
    }
}


const ResultsViewerContainer = connect(mapStateToProps, mapDispatchToProps)(ResultsViewer);

export default ResultsViewerContainer;