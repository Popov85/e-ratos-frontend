import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {minLength2, minLength8, number, required} from "../../../utils/validators/validators";
import {FaSignInAlt} from "react-icons/fa";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";
import FieldText from "../../common/forms/controls/FieldText";
import FieldString from "../../common/forms/controls/FieldString";
import {generateClientSecret} from "../../../utils/security";
import {LMS} from "../types/LMS";
import {FormSelect} from "../types/form/FormSelect";

// Define the props for your component
interface LMSEditFormProps {
    disabled: boolean;
    finished: boolean;
    ltiVersions?: FormSelect[];
}

// Combine the props with `InjectedFormProps` from `redux-form`
type Props = InjectedFormProps<LMS, LMSEditFormProps> & LMSEditFormProps;

const LmsEditForm: React.FC<Props> = ({
                                          disabled, finished,
                                          ltiVersions = [
                                              {value: "", label: "Select an LTI version"}, // dummy
                                              {value: 1, label: "LTI 1.0"}
                                          ], ...props
                                      }) => {

    const sequenceSize: number = 70;

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
                       onClick={() => props.change('secret', generateClientSecret(sequenceSize))}>Generate</a>
                </div>

                <Field name="versionId" component={FieldSelectBadge} badge="LTI"
                       items={ltiVersions} validate={[required, number]}/>

                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
        </form>);
}

export default reduxForm<LMS, LMSEditFormProps>({form: 'lms-edit', enableReinitialize: true})(LmsEditForm);
