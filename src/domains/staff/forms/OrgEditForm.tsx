import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import FieldString from '../../common/forms/controls/FieldString';
import {minLength2, required} from "../../../utils/validators/validators";
import {FaSignInAlt} from 'react-icons/fa';
import {Organisation} from "../types/Organisation";

// Define the props for your component
interface OrgEditFormProps {
    disabled: boolean;
    finished: boolean;
}

// Combine the props with `InjectedFormProps` from `redux-form`
type Props = InjectedFormProps<Organisation, OrgEditFormProps> & OrgEditFormProps;

const OrgEditForm: React.FC<Props> = ({disabled, finished, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={disabled || finished}>
                <Field name="orgId" component="input" type="text" hidden/>
                <Field
                    name="name"
                    component={FieldString}
                    placeholder="name"
                    validate={[required, minLength2]}
                />
                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">
                            Save&nbsp; <FaSignInAlt color="white"/>
                        </div>
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

// Wrap the form with `reduxForm`
export default reduxForm<Organisation, OrgEditFormProps>({form: 'org-edit', enableReinitialize: true})(OrgEditForm);