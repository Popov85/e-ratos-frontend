import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import '../../../../main.css';
import {email, minLength2, required} from "../../../utils/validators/validators";
import FieldString from "../../common/forms/controls/FieldString";
import {Profile} from "../types/Profile";
import FieldEmailBadgeAt from "../../common/forms/controls/FieldEmailBadgeAt";

// Define the props for your component
type ProfileEditFormProps = {
    disabled: boolean;
}

// Combine the props with `InjectedFormProps` from `redux-form`
type Props = InjectedFormProps<Profile, ProfileEditFormProps> & ProfileEditFormProps;

const ProfileForm: React.FC<Props> = props => {

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={props.disabled}>

                <Field name="name" component={FieldString} placeholder="name"
                       validate={[required, minLength2]}/>

                <Field name="surname" component={FieldString} placeholder="surname"
                       validate={[required, minLength2]}/>

                <Field name="email" component={FieldEmailBadgeAt} placeholder="name@example.com"
                       validate={[required, email]}/>

                <div className="form-group text-center mb-n1">
                    <input type="submit" value="OK" className="btn btn-sm btn-info pl-5 pr-5 mr-1"/>
                </div>
            </fieldset>
        </form>
    )
}

export default reduxForm<Profile, ProfileEditFormProps>({form: 'profile-form', enableReinitialize: true})(ProfileForm);