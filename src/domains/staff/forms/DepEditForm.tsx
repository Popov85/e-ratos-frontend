import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import FieldString from "../../common/forms/controls/FieldString";
import {minLength2, number, required} from "../../../utils/validators/validators";
import {FaSignInAlt} from "react-icons/fa";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";
import {DepartmentInput} from "../_api/departmentsAPI";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {setOrgIdSelected} from "../actions/organisationsActions";
import {FormSelect} from "../types/form/FormSelect";

interface DepEditFormProps {
    authorization: Authorization;
    organisations?: Array<FormSelect> | null;
    faculties?: Array<FormSelect> | null;
    disabled: boolean;
    finished: boolean;
}

const DepEditForm: React.FC<InjectedFormProps<DepartmentInput, DepEditFormProps> & DepEditFormProps> =
    ({authorization, disabled, finished, handleSubmit, change, organisations, faculties}) => {

    const dispatch: Dispatch<any> = useDispatch();

    // Logic to update fac list once org changes!
    const orgOnChange = (orgId: number): void => {
        change('facId', "");
        if (orgId) dispatch(setOrgIdSelected(orgId));
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset disabled={disabled || finished}>
                <Field name="depId" component="input" type="text" hidden/>

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
                        items={organisations}
                        validate={[required, number]}
                        onChange={(event, newValue) => orgOnChange(newValue)}
                    />
                )}
                {authorization.isAtLeastOrgAdmin && (
                    <Field
                        name="facId"
                        component={FieldSelectBadge}
                        badge="Faculty"
                        items={faculties}
                        validate={[required, number]}
                    />
                )}
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

export default reduxForm<DepartmentInput, DepEditFormProps>({form: 'dep-edit', enableReinitialize: true})(DepEditForm);