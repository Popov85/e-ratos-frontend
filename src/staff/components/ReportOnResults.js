import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/Failure";
import "../../../main.css";
import {CSVLink} from "react-csv";
import {FaFileCsv} from "react-icons/fa";
import ReportOnResultsForm from "../forms/ReportOnResultsForm";
import {RestrictingParams} from "../objects/RestrictingParams";

class ReportOnResults extends Component {

    // Clear all previous
    componentDidMount() {
        const {authenticated} = this.props.userInfo;
        this.props.clearReportOnResults();
        this.props.initReportOnResultsForm(authenticated);
    }

    handleSubmit(restrictingParams) {
        const {organisation, faculty, department, course, scheme, sessionEndedFrom, sessionEndedTo} = restrictingParams;
        if (new Date(sessionEndedFrom) > new Date(sessionEndedTo)) {
            this.props.validationFailure("Validation failure!");
            return;
        }
        if (!organisation && !faculty && !department && !course && !scheme && !sessionEndedFrom && !sessionEndedTo) {
            // Solely to send any value! Otherwise no payload is sent and server breaks!
            restrictingParams = {all: true};
        }
        // Create a valid DTO object
        let rp = new RestrictingParams(restrictingParams);
        //console.log("restrictingParams = ", rp);
        this.props.getReportOnResults(rp);
    }

    render() {
        const {userInfo} = this.props;
        if (!userInfo) return null;

        const {isLoading, error, validationError, CSVHeaders, data} = this.props.reportOnResults;
        const {isLoadingComponent, errorComponent, organisations, faculties, departments, courses, schemes} = this.props.reportOnResults;

        return (
            <div className="p-1">
                <div className="alert alert-secondary text-center">
                    <h5 className="alert-heading">
                        <strong>Report on Results</strong>
                    </h5>
                </div>
                <div className="row mt-1">
                    <div className="col-1 col-sm-2 col-lg-3"></div>
                    <div className="col-10 col-sm-8 col-lg-6">
                        {
                            isLoading &&
                            <div className="text-center text-secondary m-2">
                                <div>Preparing a report... may take a while!</div>
                                <div className="spinner-border text-secondary text-secondary" role="reporting"/>
                            </div>
                        }
                        {
                            isLoadingComponent &&
                            <div className="text-center text-secondary m-2">
                                <div>Loading data...</div>
                            </div>
                        }
                        {
                            (error || validationError) &&
                            <div className="alert alert-danger text-center p-1" role="alert">
                                <span className="text-danger">
                                    <strong>
                                    <Failure message={error? error.message : validationError.message}/>
                                </strong>
                                </span>
                            </div>
                        }
                        {
                            (errorComponent) &&
                            <div className="alert alert-danger text-center p-1" role="alert">
                                <span className="text-danger">
                                    <strong>
                                    <Failure message={errorComponent.message}/>
                                </strong>
                                </span>
                            </div>
                        }
                        <div className="card bg-transparent">
                            <div className="ratos-form-card card-body">
                                <ReportOnResultsForm
                                    onSubmit={data => this.handleSubmit(data)}
                                    disabled={isLoading}
                                    userInfo = {userInfo}
                                    organisations = {organisations}
                                    faculties = {faculties}
                                    departments = {departments}
                                    courses = {courses}
                                    schemes = {schemes}
                                    getAllFacultiesForReportOnResultsByOrganisationId = {this.props.getAllFacultiesForReportOnResultsByOrganisationId}
                                    getAllDepartmentsForReportOnResultsByFacultyId = {this.props.getAllDepartmentsForReportOnResultsByFacultyId}
                                    getAllCoursesForReportOnResultsByDepartmentId = {this.props.getAllCoursesForReportOnResultsByDepartmentId}
                                    getAllSchemesForReportOnResultsByCourseId = {this.props.getAllSchemesForReportOnResultsByCourseId}
                                    clearAllSelectsForReportOnResultsOnOrganisationReset= {this.props.clearAllSelectsForReportOnResultsOnOrganisationReset}
                                    clearAllSelectsForReportOnResultsOnFacultyReset= {this.props.clearAllSelectsForReportOnResultsOnFacultyReset}
                                    clearAllSelectsForReportOnResultsOnDepartmentReset= {this.props.clearAllSelectsForReportOnResultsOnDepartmentReset}
                                    clearAllSelectsForReportOnResultsOnCourseReset= {this.props.clearAllSelectsForReportOnResultsOnCourseReset}
                                />
                            </div>
                            {
                                data && data.data.length>0 &&
                                <div className="card-footer pt-1 pb-1">
                                    <div className = "text-center">
                                    <CSVLink
                                        data={data.data}
                                        headers={CSVHeaders}
                                        filename={"report-results.csv"}
                                        className="btn btn-sm btn-success"
                                        target="_blank" title="Save in CSV format?">
                                        <FaFileCsv/>&nbsp;Save
                                    </CSVLink>
                                    </div>
                                </div>
                            }
                            {
                                data && data.data.length===0 &&
                                <div className="card-footer pt-1 pb-1">
                                    <div className = "text-center text-warning">
                                       No results were retrieved based on restricting params!
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-1 col-sm-2 col-lg-3"/>
                </div>
            </div>
        );
    }
}

ReportOnResults.propTypes = {
    reportOnResults: PropTypes.object.isRequired,

    initReportOnResultsForm: PropTypes.func.isRequired,

    getReportOnResults: PropTypes.func.isRequired,
    clearReportOnResults: PropTypes.func.isRequired,
    validationFailure: PropTypes.func.isRequired,

    getAllFacultiesForReportOnResultsByOrganisationId: PropTypes.func.isRequired,
    getAllDepartmentsForReportOnResultsByFacultyId: PropTypes.func.isRequired,
    getAllCoursesForReportOnResultsByDepartmentId: PropTypes.func.isRequired,
    getAllSchemesForReportOnResultsByCourseId: PropTypes.func.isRequired,

    clearAllSelectsForReportOnResultsOnOrganisationReset: PropTypes.func.isRequired,
    clearAllSelectsForReportOnResultsOnFacultyReset: PropTypes.func.isRequired,
    clearAllSelectsForReportOnResultsOnDepartmentReset: PropTypes.func.isRequired,
    clearAllSelectsForReportOnResultsOnCourseReset: PropTypes.func.isRequired
};

export default ReportOnResults;