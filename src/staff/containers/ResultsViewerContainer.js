import React from 'react';
import {connect} from "react-redux";
import ResultsViewer from "../components/ResultsViewer";
import {getResultById} from "../selectors/resultSelector";
import {clearAllResourceDetailsFailures, getResultDetails} from "../actions/resultDetailsActions";

const mapStateToProps = (state, ownProps) => {
    const {resultId} = ownProps;
    if (!resultId) throw new Error("Cannot get result, resultId is not present!");
    let result = getResultById(state, ownProps);
    const {name, surname} = result.student.user;
    let user = name + " " + surname;
    let scheme = result.scheme.name;
    let timeSpent = result.sessionLasted+"s";
    return {
        userInfo: state.userInfo,
        result: {...result, user, scheme, timeSpent},
        resultDetails: state.resultDetails,
        questionResults: state.resultDetails.content[resultId]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getResultDetails: (resultId) =>dispatch(getResultDetails(resultId)),
        clearAllResourceDetailsFailures: () =>dispatch(clearAllResourceDetailsFailures())
    }
}


const ResultsViewerContainer = connect(mapStateToProps, mapDispatchToProps)(ResultsViewer);

export default ResultsViewerContainer;