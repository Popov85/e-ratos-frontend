import React from 'react'
import {Field, reduxForm} from 'redux-form';
import '../../../main.css';
import {email, minLength8, required} from "../../utils/validators";
import FieldEmailBadge from "./controls/FieldEmailBadge";
import FieldPasswordBadge from "./controls/FieldPasswordBadge";

let LoginForm = props => {

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={props.disabled}>

                <Field name="username" component={FieldEmailBadge} placeholder="name@example.com"
                       validate={[required, email]}/>

                <Field name="password" component={FieldPasswordBadge} placeholder="password"
                       showPassword = {props.showPassword}
                       displayPassword = {props.displayPassword}
                       validate={[required, minLength8]}/>

                <div>
                    <Field type="checkbox" name="rememberMe" component="input"/>
                    <label className=" text-secondary" htmlFor="rememberMe">Remember me</label>
                </div>

                <div className="form-group text-center mb-n1">
                    <input type="submit" value="Log In" className="btn btn-sm btn-info pl-5 pr-5 mr-1"/>
                </div>
            </fieldset>
        </form>
    )
}

LoginForm = reduxForm({form: 'login', enableReinitialize: true})(LoginForm)

export default LoginForm