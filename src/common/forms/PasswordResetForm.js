import React from 'react'
import {Field, reduxForm} from 'redux-form';
import '../../../main.css';
import {email, required} from "../../utils/validators";
import FieldEmailBadge from "./controls/FieldEmailBadge";

let PasswordResetForm = props => {

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={props.disabled}>

                <Field name="email" component={FieldEmailBadge} placeholder="name@example.com"
                       validate={[required, email]}/>

                <div className="form-group text-center mb-n1">
                    <input type="submit" value="Submit" className="btn btn-sm btn-info pl-5 pr-5 mr-1"/>
                </div>
            </fieldset>
        </form>
    )
}

PasswordResetForm = reduxForm({form: 'passwordReset', enableReinitialize: false})(PasswordResetForm)

export default PasswordResetForm
