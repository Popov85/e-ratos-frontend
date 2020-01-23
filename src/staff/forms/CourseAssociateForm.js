import React from 'react'
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
import {number, required} from "../../utils/validators";
import {FaSignInAlt} from "react-icons/fa";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";

let CourseAssociateForm = props => {

    const {name, disabled, finished} = props;

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled || finished}>

                <Field name="courseId" component="input" type={"text"} hidden/>

                <div className="text-secondary pb-3">
                    <strong>{name}</strong>
                </div>

                <Field name="lmsId" component={FieldSelectBadge} badge="LMS"
                       items={props.lmses} validate={[required, number]}/>

                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
        </form>);
}

CourseAssociateForm.propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,
    lmses: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

CourseAssociateForm = reduxForm({form: 'course-associate', enableReinitialize: true})(CourseAssociateForm);

export default CourseAssociateForm;