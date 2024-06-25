import React from 'react'
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
import {minLength2, number, required} from "../../../utils/validators";
import {FaSignInAlt} from "react-icons/fa";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";
import FieldText from "../../common/forms/controls/FieldText";

let ThemeEditForm = props => {

    const {disabled, finished} = props;

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled || finished}>

                <Field name="themeId" component="input" type={"text"} hidden/>

                <Field name="name" component={FieldText} placeholder="name"
                       validate={[required, minLength2]}/>

                <Field name="courseId" component={FieldSelectBadge} badge="Course"
                       items={props.courses} validate={[required, number]}/>

                <Field name="accessId" component={FieldSelectBadge} badge="Access"
                       items={props.accesses} validate={[required, number]}/>

                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
        </form>);
}

ThemeEditForm.propTypes = {
    disabled: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,
    courses: PropTypes.array.isRequired,
    accesses: PropTypes.array.isRequired,

    handleSubmit: PropTypes.func.isRequired
};

ThemeEditForm = reduxForm({form: 'theme-edit', enableReinitialize: true})(ThemeEditForm);

export default ThemeEditForm;