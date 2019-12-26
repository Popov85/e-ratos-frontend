import React from 'react';
import {connect} from "react-redux";
import {
    clearAllSelectsForReportOnResultsOnCourseReset,
    clearAllSelectsForReportOnResultsOnDepartmentReset,
    clearAllSelectsForReportOnResultsOnFacultyReset,
    clearAllSelectsForReportOnResultsOnOrganisationReset,
    clearReportOnResults,
    getAllCoursesForReportOnResultsByDepartmentId,
    getAllDepartmentsForReportOnResultsByFacultyId,
    getAllFacultiesForReportOnResultsByOrganisationId,
    getAllSchemesForReportOnResultsByCourseId,
    getReportOnResults,
    initReportOnResultsForm,
    validationFailure
} from "../actions/reportOnResultsActions";
import ReportOnResults from "../components/ReportOnResults";
import {getUserInfo} from "../../common/selectors/userSelector";

const mapStateToProps = state => {
    return {
        userInfo: getUserInfo(state),
        reportOnResults: state.reportOnResults
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initReportOnResultsForm: (authenticated) =>dispatch(initReportOnResultsForm(authenticated)),

        getReportOnResults: (restrictingParams) => dispatch(getReportOnResults(restrictingParams)),
        validationFailure: (validationErrorMessage) =>dispatch(validationFailure(validationErrorMessage)),
        clearReportOnResults: () => dispatch(clearReportOnResults()),

        getAllFacultiesForReportOnResultsByOrganisationId: (orgId) => dispatch(getAllFacultiesForReportOnResultsByOrganisationId(orgId)),
        getAllDepartmentsForReportOnResultsByFacultyId: (facId) => dispatch(getAllDepartmentsForReportOnResultsByFacultyId(facId)),
        getAllCoursesForReportOnResultsByDepartmentId: (depId) => dispatch(getAllCoursesForReportOnResultsByDepartmentId(depId)),
        getAllSchemesForReportOnResultsByCourseId: (courseId) => dispatch(getAllSchemesForReportOnResultsByCourseId(courseId)),

        clearAllSelectsForReportOnResultsOnOrganisationReset: () =>dispatch(clearAllSelectsForReportOnResultsOnOrganisationReset()),
        clearAllSelectsForReportOnResultsOnFacultyReset: () =>dispatch(clearAllSelectsForReportOnResultsOnFacultyReset()),
        clearAllSelectsForReportOnResultsOnDepartmentReset: () =>dispatch(clearAllSelectsForReportOnResultsOnDepartmentReset()),
        clearAllSelectsForReportOnResultsOnCourseReset: () =>dispatch(clearAllSelectsForReportOnResultsOnCourseReset()),
    }
}

const ReportOnResultsContainer = connect(mapStateToProps, mapDispatchToProps)(ReportOnResults);

export default ReportOnResultsContainer;