import React, {FC} from 'react';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';
import FieldString from "../../common/forms/controls/FieldString";
import {minLength2, number, required} from "../../../utils/validators/validators";
import {FaSignInAlt} from "react-icons/fa";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";
import {FacultyInput} from "../_api/facultiesAPI";
import {FormSelect} from "../types/form/FormSelect";

interface FacEditFormProps {
    authorization: Authorization;
    disabled: boolean;
    finished: boolean;
    organisations?: Array<FormSelect> | null; // Only needed for Global admin!
}

type Props = FacEditFormProps & InjectedFormProps<FacultyInput, FacEditFormProps>;

const FacEditForm: FC<Props> = ({authorization, disabled, finished, handleSubmit, organisations}) => {

    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={disabled || finished}>
                <Field name="facId" component="input" type="text" hidden/>

                <Field
                    name="name"
                    component={FieldString}
                    placeholder="name"
                    validate={[required, minLength2]}
                />

                {authorization.isGlobalAdmin && (
                    <Field
                        name="orgId"
                        component={FieldSelectBadge}
                        badge="Organisation"
                        items={organisations || []}
                        validate={[required, number]}
                    />
                )}

                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

export default reduxForm<FacultyInput, FacEditFormProps>({form: 'fac-edit', enableReinitialize: true})(FacEditForm);
