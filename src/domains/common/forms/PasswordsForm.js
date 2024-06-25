import React from 'react'
import {Field, reduxForm} from 'redux-form';
import {minLength8, passwordsMustMatch, required} from "../../../utils/validators";
import '../../../../main.css';
import FieldPassword from "./controls/FieldPassword";

let PasswordsForm = props => {

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={props.disabled}>

                <Field name="oldPass" component={FieldPassword} placeholder="old password"
                       showPassword = {props.showPassword}
                       validate={[required, minLength8]}/>

                <Field name="password" component={FieldPassword} placeholder="new password"
                       showPassword = {props.showPassword}
                       validate={[required, minLength8]}/>

                <Field name="passwordConfirmed" component={FieldPassword} placeholder="confirm new password"
                       showPassword = {props.showPassword}
                       validate={[required, minLength8, passwordsMustMatch]}/>

                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Submit" className="btn btn-sm btn-success" >
                        <div className="align-middle">Submit</div>
                    </button>
                </div>
            </fieldset>
        </form>
    )
}

PasswordsForm = reduxForm({form: 'passwords-form'})(PasswordsForm)

export default PasswordsForm