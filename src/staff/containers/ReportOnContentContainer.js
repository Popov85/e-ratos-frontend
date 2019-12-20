import React from 'react';
import {connect} from "react-redux";
import ReportOnContent from "../components/ReportOnContent";
import {clearReportOnContent, getReportOnContent, validationFailure} from "../actions/reportOnContentActions";

const mapStateToProps = state => {
    return {
        reportOnContent: state.reportOnContent
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getReportOnContent: (requestedColumns) => dispatch(getReportOnContent(requestedColumns)),
        validationFailure: (validationErrorMessage) =>dispatch(validationFailure(validationErrorMessage)),
        clearReportOnContent: () => dispatch(clearReportOnContent())
    }
}

const ReportOnContentContainer = connect(mapStateToProps, mapDispatchToProps)(ReportOnContent);

export default ReportOnContentContainer;