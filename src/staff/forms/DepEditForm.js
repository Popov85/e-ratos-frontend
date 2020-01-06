import React from 'react'
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
import FieldString from "../../common/forms/controls/FieldString";
import {minLength2, number, required} from "../../utils/validators";
import {FaSignInAlt} from "react-icons/fa";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";

let DepEditForm = props => {

    const {userInfo, disabled, finished} = props;

    const {authenticated} = userInfo;

    // Logic to update fac list once org changes!
    const orgOnChange =(orgId) => {
        props.change('facId', "");
        if (orgId) props.setOrgIdSelected(orgId);
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled || finished}>

                <Field name="depId" component="input" type={"text"} hidden/>

                <Field name="name" component={FieldString} placeholder="name"
                       validate={[required, minLength2]}/>
                {
                    authenticated.isGlobalAdmin &&
                    <Field name="orgId" component={FieldSelectBadge} badge="Organisation"
                           items={props.organisations} validate={[required, number]}
                           onChange={(event, newValue, previousValue, name) => orgOnChange(newValue)}
                    />
                }
                {
                    authenticated.isAtLeastOrgAdmin &&
                    <Field name="facId" component={FieldSelectBadge} badge="Faculty"
                           items={props.faculties} validate={[required, number]}/>
                }
                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
        </form>);
}

DepEditForm.propTypes = {
    userInfo: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,

    organisations: PropTypes.array, // Only needed for Global admin
    faculties: PropTypes.array, // Only needed for Global or Org admin
    setOrgIdSelected: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

DepEditForm = reduxForm({form: 'dep-edit', enableReinitialize: true})(DepEditForm);

export default DepEditForm;