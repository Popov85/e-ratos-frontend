import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import '../../../../main.css';
import FieldPasswordBadge from "./controls/FieldPasswordBadge";
import FieldEmailBadge from "./controls/FieldEmailBadge";
import {email, minLength8, required} from "../../../utils/validators/validators";

type LoginFormProps = {
    disabled: boolean
}

export type LoginFormData = {
    username: string;
    password: string;
    rememberMe: boolean;
}

let LoginForm: React.FC<InjectedFormProps<LoginFormData, LoginFormProps> & LoginFormProps> = props => {

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={props.disabled}>

                <Field name="username"
                       component={FieldEmailBadge}
                       placeholder="name@example.com"
                       validate={[required, email]}/>

                <Field name="password"
                       component={FieldPasswordBadge}
                       placeholder="password"
                       validate={[required, minLength8]}/>

                <div>
                    <Field type="checkbox"
                           name="rememberMe"
                           component="input"/>
                    <label className=" text-secondary" htmlFor="rememberMe">Remember me</label>
                </div>

                <div className="form-group text-center mb-n1">
                    <input type="submit" value="Log In" className="btn btn-sm btn-info pl-5 pr-5 mr-1"/>
                </div>
            </fieldset>
        </form>
    )
}

export default reduxForm<LoginFormData, LoginFormProps>({form: 'login'})(LoginForm);
