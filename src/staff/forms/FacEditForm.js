import React from 'react'
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
import FieldString from "../../common/forms/controls/FieldString";
import {minLength2, number, required} from "../../utils/validators";
import {FaSignInAlt} from "react-icons/fa";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";

let FacEditForm = props => {

    const {userInfo, disabled, finished} = props;
    const {authenticated} = userInfo;

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled || finished}>

                <Field name="facId" component="input" type={"text"} hidden/>

                <Field name="name" component={FieldString} placeholder="name"
                       validate={[required, minLength2]}/>
                {
                    authenticated.isGlobalAdmin &&
                    <Field name="orgId" component={FieldSelectBadge} badge="Organisation"
                           items={props.organisations} validate={[required, number]}/>
                }
                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
        </form>);
}

FacEditForm.propTypes = {
    userInfo: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,
    organisations: PropTypes.array, // Only needed for Global admin!

    handleSubmit: PropTypes.func.isRequired
};

FacEditForm = reduxForm({form: 'fac-edit', enableReinitialize: true})(FacEditForm);

export default FacEditForm;