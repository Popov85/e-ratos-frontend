import React from 'react'
import {Field, reduxForm} from 'redux-form';
import {
    allSelected,
    email,
    minLength2,
    minLength8,
    passwordsMustMatch,
    required,
    requiredField
} from "../../../utils/validators";

import '../../../../main.css';
import FieldString from "./controls/FieldString";
import FieldEmail from "./controls/FieldEmail";
import FieldPassword from "./controls/FieldPassword";
import {FaEye, FaEyeSlash, FaSignInAlt} from "react-icons/fa";
import FieldSelectBadge from "./controls/FieldSelectBadge";
import Affiliation from "../components/Affiliation";

const current = new Date().getFullYear();
const years = [
    {value: "", label: "Select"},
    {value: current, label: current},
    {value: current-1, label: current-1},
    {value: current-2, label: current-2},
    {value: current-3, label: current-3},
    {value: current-4, label: current-4},
    {value: current-5, label: current-5},
    {value: current-6, label: current-6}
];

let RegistrationForm = props => {

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={props.disabled}>

                <Field name="name" component={FieldString} placeholder="name"
                       validate={[required, minLength2]}/>

                <Field name="surname" component={FieldString} placeholder="surname"
                       validate={[required, minLength2]}/>

                <Field name="email" component={FieldEmail} placeholder="name@example.com"
                       validate={[required, email]}/>

                <Field name="password" component={FieldPassword} placeholder="password"
                       showPassword = {props.showPassword}
                       validate={[required, minLength8]}/>

                <Field name="passwordConfirmed" component={FieldPassword} placeholder="confirm password"
                       showPassword = {props.showPassword}
                       validate={[required, minLength8, passwordsMustMatch]}/>

                <div className="text-right mt-n3 mb-n2" title="Change password visibility">
                    <a href="#" className="badge badge-secondary pl-2 pr-2" onClick={() => props.displayPassword()}>
                        {(props.showPassword) ? <FaEye color="white" /> : <FaEyeSlash color="white" />}
                    </a>
                </div>

                <hr />

                <Field name="affiliation" component={Affiliation}
                       validate = {[allSelected]}
                       isLMS = {props.isLMS}
                       orgId = {props.orgId}
                       registration = {props.registration}
                       getFaculties={props.getFaculties}
                       getClasses={props.getClasses}
                       clearFaculties={props.clearFaculties}
                       clearClasses={props.clearClasses}
                />

                <Field name="year" component={FieldSelectBadge}
                       items = {years}
                       validate={[requiredField]}
                       badge = "Year" width = {50}
                       title = "Select year of entrance"/>

                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Sign Up" className="btn btn-sm btn-success" >
                        <div className="align-middle">Sign Up&nbsp; <FaSignInAlt color="white" /> </div>
                    </button>
                </div>
                <div className="form-group text-center mt-2 mb-n3">
                    <a href="#" className="badge badge-secondary" onClick={() => {
                        props.resetForm();
                        props.clearClasses();
                        props.clearFaculties();
                    }}>Reset</a>
                </div>
            </fieldset>
        </form>
    )
}

RegistrationForm = reduxForm({form: 'registration'})(RegistrationForm)

export default RegistrationForm