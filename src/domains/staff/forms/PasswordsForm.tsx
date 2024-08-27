import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {minLength8, passwordsMustMatch, required} from "../../../utils/validators/validators";
import '../../../../main.css';
import FieldPassword from "../../common/forms/controls/FieldPassword";

export type PasswordEditOwnProps = {
    oldPass: string;
    password: string;
    passwordConfirmed: string;
}

type PasswordEditFormProps = {
    disabled: boolean;
    showPassword: boolean;
}

// Combine the props with `InjectedFormProps` from `redux-form`
type Props = InjectedFormProps<PasswordEditOwnProps, PasswordEditFormProps> & PasswordEditFormProps;

const PasswordsForm: React.FC<Props> = ({disabled, showPassword, handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={disabled}>

                <Field name="oldPass" component={FieldPassword} placeholder="old password"
                       showPassword={showPassword}
                       validate={[required, minLength8]}/>

                <Field name="password" component={FieldPassword} placeholder="new password"
                       showPassword={showPassword}
                       validate={[required, minLength8]}/>

                <Field name="passwordConfirmed" component={FieldPassword} placeholder="confirm new password"
                       showPassword={showPassword}
                       validate={[required, minLength8, passwordsMustMatch]}/>

                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Submit" className="btn btn-sm btn-success">
                        <div className="align-middle">Submit</div>
                    </button>
                </div>
            </fieldset>
        </form>
    )
}

export default reduxForm<PasswordEditOwnProps, PasswordEditFormProps>({form: 'passwords-form'})(PasswordsForm);