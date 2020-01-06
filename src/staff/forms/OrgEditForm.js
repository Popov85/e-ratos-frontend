import React from 'react'
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
import FieldString from "../../common/forms/controls/FieldString";
import {minLength2, required} from "../../utils/validators";
import {FaSignInAlt} from "react-icons/fa";

let OrgEditForm = props => {

    const {disabled, finished} = props;

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled || finished}>

                <Field name="orgId" component="input" type={"text"} hidden/>

                <Field name="name" component={FieldString} placeholder="name"
                       validate={[required, minLength2]}/>

                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
        </form>);
}

OrgEditForm.propTypes = {
    disabled: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

OrgEditForm = reduxForm({form: 'org-edit', enableReinitialize: true})(OrgEditForm)

export default OrgEditForm