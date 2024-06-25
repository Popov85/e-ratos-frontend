import React from 'react';
import {Field, reduxForm} from "redux-form";
import {FaStepForward} from "react-icons/fa";
import PropTypes from 'prop-types';

let ReportOnContentForm = props => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className="ratos-form-fieldset">
                <fieldset disabled={props.disabled}>
                    <legend>Select elements for a report</legend>
                    <div className="pl-3">
                        <div>
                            <Field type="checkbox" name="courses" component="input"/>
                            <label className=" text-secondary pl-1" htmlFor="courses">Courses</label>
                        </div>

                        <div>
                            <Field type="checkbox" name="lmsCourses" component="input"/>
                            <label className=" text-secondary pl-1" htmlFor="lmsCourses">LMS Courses</label>
                        </div>

                        <div>
                            <Field type="checkbox" name="schemes" component="input"/>
                            <label className=" text-secondary pl-1" htmlFor="schemes">Schemes</label>
                        </div>

                        <div>
                            <Field type="checkbox" name="themes" component="input"/>
                            <label className=" text-secondary pl-1" htmlFor="themes">Themes</label>
                        </div>

                        <div>
                            <Field type="checkbox" name="questions" component="input"/>
                            <label className=" text-secondary pl-1" htmlFor="questions">Questions</label>
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

ReportOnContentForm.propTypes = {
    disabled: PropTypes.bool.isRequired,

    handleSubmit: PropTypes.func.isRequired
};

ReportOnContentForm = reduxForm({form: 'reportOnContentForm', enableReinitialize: true})(ReportOnContentForm)

export default ReportOnContentForm