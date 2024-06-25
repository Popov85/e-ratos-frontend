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

const mapStateToProps = state => {
    return {
        userInfo: state.auth.userInfo,
        authorization: state.auth.authorization,
        reportOnResults: state.staff.reportOnResults
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initReportOnResultsForm: (authenticated) => dispatch(initReportOnResultsForm(authenticated)),

        getReportOnResults: (restrictingParams) => dispatch(getReportOnResults(restrictingParams)),
        validationFailure: (validationErrorMessage) => dispatch(validationFailure(validationErrorMessage)),
        clearReportOnResults: () => dispatch(clearReportOnResults()),

        getAllFacultiesForReportOnResultsByOrganisationId: (orgId) => dispatch(getAllFacultiesForReportOnResultsByOrganisationId(orgId)),
        getAllDepartmentsForReportOnResultsByFacultyId: (facId) => dispatch(getAllDepartmentsForReportOnResultsByFacultyId(facId)),
        getAllCoursesForReportOnResultsByDepartmentId: (depId) => dispatch(getAllCoursesForReportOnResultsByDepartmentId(depId)),
        getAllSchemesForReportOnResultsByCourseId: (courseId) => dispatch(getAllSchemesForReportOnResultsByCourseId(courseId)),

        clearAllSelectsForReportOnResultsOnOrganisationReset: () => dispatch(clearAllSelectsForReportOnResultsOnOrganisationReset()),
        clearAllSelectsForReportOnResultsOnFacultyReset: () => dispatch(clearAllSelectsForReportOnResultsOnFacultyReset()),
        clearAllSelectsForReportOnResultsOnDepartmentReset: () => dispatch(clearAllSelectsForReportOnResultsOnDepartmentReset()),
        clearAllSelectsForReportOnResultsOnCourseReset: () => dispatch(clearAllSelectsForReportOnResultsOnCourseReset()),
    }
}

const ReportOnResultsContainer = connect(mapStateToProps, mapDispatchToProps)(ReportOnResults);

export default ReportOnResultsContainer;