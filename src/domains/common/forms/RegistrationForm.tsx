import React, {useState} from 'react';
import {Field, reduxForm, InjectedFormProps, reset} from 'redux-form';
import {
    allSelected,
    email,
    minLength2,
    minLength8,
    passwordsMustMatch,
    required,
    requiredField
} from "../../../utils/validators/validators";
import '../../../../main.css';
import {FaEye, FaEyeSlash, FaSignInAlt} from "react-icons/fa";
import Affiliation from "../components/Affiliation";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {clearClasses, clearFaculties} from "../actions/registrationActions";
import {years} from "../../../utils/utilsYears";
import FieldSelectBadge from "./controls/FieldSelectBadge";
import FieldString from "./controls/FieldString";
import FieldEmail from "./controls/FieldEmail";
import FieldPassword from "./controls/FieldPassword";


type RegistrationFormProps = {
    orgId: number | null;
    isLMS: boolean;
    disabled: boolean;
}

export type RegistrationFormData = {
    name: string;
    surname: string;
    email: string;
    password: string;
    passwordConfirmed: string;
    affiliation: {
        orgId: number;
        facId: number;
        classId: number;
    };
    year: number;
}

const RegistrationForm: React.FC<InjectedFormProps<RegistrationFormData, RegistrationFormProps> & RegistrationFormProps> = (props) => {

    const dispatch: Dispatch<any> = useDispatch();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const displayPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={props.disabled}>
                <Field name="name"
                       component={FieldString}
                       placeholder="name"
                       validate={[required, minLength2]}/>

                <Field name="surname"
                       component={FieldString}
                       placeholder="surname"
                       validate={[required, minLength2]}/>

                <Field name="email"
                       component={FieldEmail}
                       placeholder="name@example.com"
                       validate={[required, email]}/>

                <Field name="password"
                       component={FieldPassword}
                       placeholder="password"
                       showPassword={showPassword}
                       validate={[required, minLength8]}/>

                <Field name="passwordConfirmed"
                       component={FieldPassword}
                       placeholder="confirm password"
                       showPassword={showPassword}
                       validate={[required, minLength8, passwordsMustMatch]}/>

                <div className="text-right mt-n3 mb-n2" title="Change password visibility">
                    <a href="#" className="badge badge-secondary pl-2 pr-2" onClick={displayPassword}>
                        {showPassword ? <FaEye color="white"/> : <FaEyeSlash color="white"/>}
                    </a>
                </div>

                <hr/>

                <Field name="affiliation"
                       component={Affiliation}
                       validate={[allSelected]}
                       isLMS={props.isLMS}
                       orgId={props.orgId}
                />

                <Field name="year"
                       component={FieldSelectBadge}
                       items={years}
                       validate={[requiredField]}
                       badge="Year"
                       width={50}
                       title="Select year of entrance"/>

                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Sign Up" className="btn btn-sm btn-success">
                        <div className="align-middle">Sign Up&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>

                <div className="form-group text-center mt-2 mb-n3">
                    <a href="#" className="badge badge-secondary" onClick={() => {
                        dispatch(reset('registration'));
                        dispatch(clearClasses());
                        dispatch(clearFaculties());
                    }}>Reset</a>
                </div>
            </fieldset>
        </form>
    );
}

export default reduxForm<RegistrationFormData, RegistrationFormProps>({form: 'registration'})(RegistrationForm);