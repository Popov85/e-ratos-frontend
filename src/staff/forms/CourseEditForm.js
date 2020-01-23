import React, {useState} from 'react'
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
import {minLength2, number, required} from "../../utils/validators";
import {FaSignInAlt, FaToggleOff, FaToggleOn} from "react-icons/fa";
import FieldSelectBadge from "../../common/forms/controls/FieldSelectBadge";
import FieldText from "../../common/forms/controls/FieldText";

let CourseEditForm = props => {

    const [lmsMode, setLMSMode] = useState(false);

    const {disabled, finished, initialValues} = props;

    const isLMS =() => {
        return initialValues && initialValues.lmsId;
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled || finished}>
                {
                    !initialValues &&
                    <div className="text-right mt-n3" title="Is LMS?">
                        <a href="#" className="badge badge-info pl-2 pr-2 mb-1 mr-n3"
                           onClick={() => setLMSMode(!lmsMode)}>
                            {lmsMode ?
                                <FaToggleOn color="white" style={{fontSize: '1.25em'}}/> :
                                <FaToggleOff color="white" style={{fontSize: '1.25em'}}/>}
                        </a>
                    </div>
                }
                <Field name="courseId" component="input" type={"text"} hidden/>

                <Field name="created" component="input" type={"text"} hidden/>

                <Field name="name" component={FieldText} placeholder="name"
                       validate={[required, minLength2]}/>

                <Field name="accessId" component={FieldSelectBadge} badge="Access"
                       items={props.accesses} validate={[required, number]}/>

                {
                    (lmsMode || isLMS()) &&
                    <Field name="lmsId" component={FieldSelectBadge} badge="LMS"
                           items={props.lmses} validate={[required, number]}/>
                }

                <div>
                    <Field type="checkbox" name="active" component="input"/>
                    <label className=" text-secondary" htmlFor="active">Active</label>
                </div>

                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
        </form>);
}

CourseEditForm.propTypes = {
    disabled: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,

    accesses: PropTypes.array.isRequired,
    lmses: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

CourseEditForm = reduxForm({form: 'course-edit', enableReinitialize: true})(CourseEditForm);

export default CourseEditForm;