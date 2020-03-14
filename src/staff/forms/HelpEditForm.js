import React from 'react'
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
import {minLength2, required, requiredDraft} from "../../utils/validators";
import {FaSignInAlt} from "react-icons/fa";
import FieldString from "../../common/forms/controls/FieldString";
import FieldWysiwyg from "./controls/FieldWysiwyg";

let HelpEditForm = props => {

    const {disabled, finished} = props;

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled || finished}>

                <Field name="helpId" component="input" type={"text"} hidden/>

                <Field name="name" component={FieldString} placeholder="name"
                       validate={[required, minLength2]}/>

                <Field name="help" component={FieldWysiwyg} validate={[requiredDraft]}
                       disabled={disabled || finished}/>

                <div className="form-group text-center mt-1 mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
        </form>);
}

HelpEditForm.propTypes = {
    disabled: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,

    handleSubmit: PropTypes.func.isRequired
};

HelpEditForm = reduxForm({form: 'help-edit', enableReinitialize: true})(HelpEditForm);

export default HelpEditForm;