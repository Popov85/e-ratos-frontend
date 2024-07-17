import React from 'react'
import {Field, reduxForm} from 'redux-form';
import '../../../../main.css';
import {email, minLength2, required} from "../../../utils/validators";
import FieldString from "../../common/forms/controls/FieldString";
import FieldEmailBadgeAt from "../../common/forms/controls/FieldEmailBadgeAt";

let ProfileForm = props => {

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

ProfileForm = reduxForm({form: 'profile-form', enableReinitialize: true})(ProfileForm)

export default ProfileForm