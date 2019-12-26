import React from 'react';
import {Field, reduxForm} from "redux-form";
import {FaStepForward} from "react-icons/fa";
import PropTypes from 'prop-types';
import FieldSelectBadgeNoValidFix from "../../common/forms/controls/FieldSelectBadgeNoValidFix";
import FieldDatePicker from "../../common/forms/controls/FieldDatePicker";

let ReportOnResultsForm = props => {

    const {authenticated} = props.userInfo;

    const orgOnChange = (orgId) => {
        props.change('faculty', "");
        props.change('department', "");
        props.change('course', "");
        props.change('scheme', "");
        props.clearAllSelectsForReportOnResultsOnOrganisationReset();
        if (orgId) props.getAllFacultiesForReportOnResultsByOrganisationId(orgId);
    }

    const facOnChange = (facId) => {
        props.change('department', "");
        props.change('course', "");
        props.change('scheme', "");
        props.clearAllSelectsForReportOnResultsOnFacultyReset();
        if (facId) props.getAllDepartmentsForReportOnResultsByFacultyId(facId);
    }

    const depOnChange = (depId) => {
        props.change('course', "");
        props.change('scheme', "");
        props.clearAllSelectsForReportOnResultsOnDepartmentReset();
        if (depId) props.getAllCoursesForReportOnResultsByDepartmentId(depId);
    }

    const courseOnChange = (courseId) => {
        props.change('scheme', "");
        props.clearAllSelectsForReportOnResultsOnCourseReset();
        if (courseId) props.getAllSchemesForReportOnResultsByCourseId(courseId);
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <div className="ratos-form-fieldset">
                <fieldset disabled={props.disabled}>
                    <legend>Select restrictions for a report</legend>
                    <div className="pl-3">
                        {
                            authenticated.isGlobalAdmin &&
                            <Field name="organisation" component={FieldSelectBadgeNoValidFix} badge="Organisation"
                                   items={props.organisations}
                                   onChange={(event, newValue, previousValue, name) => orgOnChange(newValue)}/>
                        }
                        {
                            authenticated.isAtLeastOrgAdmin &&
                            <Field name="faculty" component={FieldSelectBadgeNoValidFix} badge="Faculty"
                                   items={props.faculties}
                                   onChange={(event, newValue, previousValue, name) => facOnChange(newValue)}/>
                        }
                        {
                            authenticated.isAtLeastFacAdmin &&
                            <Field name="department" component={FieldSelectBadgeNoValidFix} badge="Department"
                                   items={props.departments}
                                   onChange={(event, newValue, previousValue, name) => depOnChange(newValue)}/>
                        }

                        <Field name="course" component={FieldSelectBadgeNoValidFix} badge="Courses"
                               items={props.courses}
                               onChange={(event, newValue, previousValue, name) => courseOnChange(newValue)}/>

                        <Field name="scheme" component={FieldSelectBadgeNoValidFix} badge="Schemes"
                               items={props.schemes}/>

                        <div className = "d-flex justify-content-center align-items-baseline text-secondary mb-3">
                            <div className = "mr-1">
                                <label htmlFor="sessionEndedFrom" className = "badge badge-secondary">From:</label>&nbsp;
                                <Field id = "sessionEndedFrom" name="sessionEndedFrom" component={FieldDatePicker} placeholder="Select date from.."/>
                            </div>
                            <div>
                                <label htmlFor="sessionEndedTo" className = "badge badge-secondary">To:</label>&nbsp;
                                <Field id = "sessionEndedTo" name="sessionEndedTo" component={FieldDatePicker} placeholder="Select date to.."/>
                            </div>

                        </div>

                    </div>
                    <div className="text-center">
                        <button type="submit" value="Save" className="btn btn-sm btn-info pl-3 pr-3">
                            <div className="d-flex align-items-center">Generate&nbsp;<FaStepForward/></div>
                        </button>
                    </div>
                </fieldset>
            </div>
        </form>
    );
};

ReportOnResultsForm.propTypes = {
    userInfo: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,

    getAllFacultiesForReportOnResultsByOrganisationId: PropTypes.func.isRequired,
    getAllDepartmentsForReportOnResultsByFacultyId: PropTypes.func.isRequired,
    getAllCoursesForReportOnResultsByDepartmentId: PropTypes.func.isRequired,
    getAllSchemesForReportOnResultsByCourseId: PropTypes.func.isRequired,

    clearAllSelectsForReportOnResultsOnOrganisationReset: PropTypes.func.isRequired,
    clearAllSelectsForReportOnResultsOnFacultyReset: PropTypes.func.isRequired,
    clearAllSelectsForReportOnResultsOnDepartmentReset: PropTypes.func.isRequired,
    clearAllSelectsForReportOnResultsOnCourseReset: PropTypes.func.isRequired,

    handleSubmit: PropTypes.func.isRequired
};

ReportOnResultsForm = reduxForm({form: 'reportOnResultsForm', enableReinitialize: true})(ReportOnResultsForm)

export default ReportOnResultsForm