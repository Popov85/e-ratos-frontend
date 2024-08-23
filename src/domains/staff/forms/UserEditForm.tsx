import React from 'react'
import {Field, FormSection, InjectedFormProps, reduxForm} from 'redux-form';
import FieldString from "../../common/forms/controls/FieldString";
import {email, minLength2, minLength8, required} from "../../../utils/validators/validators";
import FieldEmail from "../../common/forms/controls/FieldEmail";
import FieldPassword from "../../common/forms/controls/FieldPassword";
import {FaSignInAlt} from "react-icons/fa";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";
import AffiliationSelectorFields from "./AffiliationSelectorFields";


// Define the props for your component
export type UserEditOwnProps = {
    userId: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
    positionId: string;
    affiliation: {
        orgId: string;
        facId: string;
        depId: string;
    }
    active: boolean;
}

type UserEditFormProps = {
    disabled: boolean;
    finished: boolean;
    positions: any
    roles: any;
    authorization: Authorization;
    isNew: boolean;
}

// Combine the props with `InjectedFormProps` from `redux-form`
type Props = InjectedFormProps<UserEditOwnProps, UserEditFormProps> & UserEditFormProps;


const UserEditForm: React.FC<Props> = props => {

    const {authorization, isNew, disabled, finished, roles, positions} = props;

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled || finished}>

                <Field name="userId" component="input" type={"text"} hidden/>

                <Field name="name" component={FieldString} placeholder="name"
                       validate={[required, minLength2]}/>

                <Field name="surname" component={FieldString} placeholder="surname"
                       validate={[required, minLength2]}/>

                <Field name="email" component={FieldEmail} placeholder="name@example.com"
                       validate={[required, email]}/>
                {
                    isNew &&
                    <Field name="password" component={FieldPassword} placeholder="password"
                           validate={[required, minLength8]}/>
                }

                <Field name="role" component={FieldSelectBadge} placeholder="role" badge="Role"
                       items={roles}
                       validate={[required]}/>

                <Field name="positionId" component={FieldSelectBadge} placeholder="position" badge="Position"
                       items={positions} validate={[required]}/>

                <div>
                    <Field type="checkbox" name="active" component="input"/>
                    <label className=" text-secondary" htmlFor="enabled">Active</label>
                </div>

                {
                    authorization.isAtLeastFacAdmin &&
                    <FormSection name="affiliation">
                        <AffiliationSelectorFields
                            authorization={authorization}
                            change={props.change}
                        />
                    </FormSection>
                }

                <hr/>

                <div className="form-group text-center mb-n1">
                    <span>
                       <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                           <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                       </button>
                    </span>
                </div>
            </fieldset>
        </form>);
}

export default reduxForm<UserEditOwnProps, UserEditFormProps>({
    form: 'staff-edit',
    enableReinitialize: true
})(UserEditForm);