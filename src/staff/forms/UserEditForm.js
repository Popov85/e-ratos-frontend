import React from 'react'
import PropTypes from "prop-types";
import {Field, FormSection, reduxForm} from 'redux-form';
import FieldString from "../../common/forms/controls/FieldString";
import {email, minLength2, minLength8, required} from "../../utils/validators";
import FieldEmail from "../../common/forms/controls/FieldEmail";
import FieldPassword from "../../common/forms/controls/FieldPassword";
import {FaArrowLeft, FaSignInAlt} from "react-icons/fa";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";
import {LinkContainer} from "react-router-bootstrap";
import AffiliationSelectorFields from "./AffiliationSelectorFields";

let UserEditForm = props => {

    const {userInfo, isNew, disabled, roles, positions} = props;

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled}>

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
                           showPassword={props.showPassword}
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
                    userInfo.authenticated.isAtLeastFacAdmin &&
                    <FormSection name="affiliation">
                        <AffiliationSelectorFields
                            userInfo = {userInfo}
                            affiliationSelector = {props.affiliationSelector}
                            getAllFacultiesForSelectorByOrganisationId={props.getAllFacultiesForSelectorByOrganisationId}
                            getAllDepartmentsForSelectorByFacultyId={props.getAllDepartmentsForSelectorByFacultyId}
                            clearAllOnOrganisationReset={props.clearAllOnOrganisationReset}
                            clearAllOnFacultyReset={props.clearAllOnFacultyReset}
                            change = {props.change}
                        />
                    </FormSection>
                }

                <hr/>

                <div className="form-group text-center mb-n1">
                    <span>
                       <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                           <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                       </button>
                        <LinkContainer to="/users">
                           <button type="button" value="Back" className="btn btn-sm btn-secondary">
                                <div className="align-middle">Back&nbsp;<FaArrowLeft color="white"/></div>
                            </button>
                        </LinkContainer>
                    </span>
                </div>

            </fieldset>
        </form>);
}

UserEditForm.propTypes = {
    userInfo: PropTypes.string.isRequired,
    positions: PropTypes.array.isRequired,
    roles: PropTypes.array.isRequired,

    affiliationSelector: PropTypes.object.isRequired,

    getAllFacultiesForSelectorByOrganisationId: PropTypes.func.isRequired,
    getAllDepartmentsForSelectorByFacultyId: PropTypes.func.isRequired,
    clearAllOnOrganisationReset: PropTypes.func.isRequired,
    clearAllOnFacultyReset:PropTypes.func.isRequired,

    handleSubmit: PropTypes.func.isRequired
};

UserEditForm = reduxForm({form: 'staff-edit', enableReinitialize: true})(UserEditForm)

export default UserEditForm