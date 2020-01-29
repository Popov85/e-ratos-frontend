import React from 'react'
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
import {minLength2, minLength8, number, required} from "../../utils/validators";
import {FaSignInAlt} from "react-icons/fa";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";
import FieldText from "../../common/forms/controls/FieldText";
import FieldString from "../../common/forms/controls/FieldString";
import {generateClientSecret} from "../../utils/security";

let LmsEditForm = props => {

    const sequenceSize = 70;

    const {disabled, finished} = props;

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled || finished}>

                <Field name="lmsId" component="input" type={"text"} hidden/>

                <Field name="name" component={FieldString} placeholder="name"
                       validate={[required, minLength2]}/>

                <Field name="key" component={FieldText} placeholder="Client key"
                       validate={[required, minLength8]}/>

                <Field name="secret" component={FieldText} placeholder="Client secret"
                       validate={[required, minLength8]}/>

                <div className="text-center mt-n3 mb-2">
                    <a href="#" className="badge badge-secondary btn-min"
                       onClick={()=>props.change('secret', generateClientSecret(sequenceSize))}>Generate</a>
                </div>

                <Field name="versionId" component={FieldSelectBadge} badge="LTI"
                       items={props.ltiVersions} validate={[required, number]}/>

                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
        </form>);
}

LmsEditForm.propTypes = {
    disabled: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,
    ltiVersions: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

LmsEditForm = reduxForm({form: 'lms-edit', enableReinitialize: true})(LmsEditForm);

export default LmsEditForm;