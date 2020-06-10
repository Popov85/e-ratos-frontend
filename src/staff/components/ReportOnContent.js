import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReportOnContentForm from "../forms/ReportOnContentForm";
import Failure from "../../common/components/Failure";
import "../../../main.css";
import {CSVLink} from "react-csv";
import {FaFileCsv} from "react-icons/fa";

class ReportOnContent extends Component {

    // Clear all previous
    componentDidMount() {
        this.props.clearReportOnContent();
    }

    handleSubmit(requestedColumns) {
        const {courses, lmsCourses, schemes, themes, questions} = requestedColumns;
        if (!courses && !lmsCourses && !schemes && !themes && !questions) {
            this.props.validationFailure("Validation failure");
            return;
        }
        const {data} = this.props.reportOnContent;
        if (data) this.props.clearReportOnContent();
        this.props.getReportOnContent(requestedColumns);
    }

    render() {
        const {isLoading, error, validationError, CSVHeaders, data} = this.props.reportOnContent;
        return (
            <div className="p-1">
                <div className="alert alert-secondary text-center">
                    <h5 className="alert-heading">
                        <strong>Report on content</strong>
                    </h5>
                </div>
                <div className="row mt-1">
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                        {
                            isLoading &&
                            <div className="text-center text-secondary m-2">
                                <div>Preparing a report... may take a while!</div>
                                <div className="spinner-border text-secondary text-secondary" role="reporting"/>
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
                        <div className="card bg-transparent">
                            <div className="ratos-form-card card-body">
                                <ReportOnContentForm
                                    onSubmit={data => this.handleSubmit(data)}
                                    disabled={isLoading}
                                />
                            </div>
                            {
                                data &&
                                <div className="card-footer pt-1 pb-1">
                                    <div className = "text-center">
                                    <CSVLink
                                        data={data.data}
                                        headers={CSVHeaders}
                                        filename={"report-content.csv"}
                                        className="btn btn-sm btn-success"
                                        target="_blank" title="Save in CSV format?">
                                        <FaFileCsv/>&nbsp;Save
                                    </CSVLink>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"/>
                </div>
            </div>
        );
    }
}

ReportOnContent.propTypes = {
    reportOnContent: PropTypes.object.isRequired,

    getReportOnContent: PropTypes.func.isRequired,
    clearReportOnContent: PropTypes.func.isRequired,
    validationFailure: PropTypes.func.isRequired
};

export default ReportOnContent;