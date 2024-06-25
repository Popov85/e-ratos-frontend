import React from 'react'
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
import {minLength2, required} from "../../../utils/validators";
import {FaSignInAlt} from "react-icons/fa";
import FieldString from "../../common/forms/controls/FieldString";
import Header from "../../common/components/Header";
import FieldNumberBadge from "../../common/forms/controls/FieldNumberBadge";
import FieldNumberFloatBadge from "../../common/forms/controls/FieldNumberFloatBadge";

let SettingsEditForm = props => {

    const {disabled, finished, isDefault} = props;

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled || finished || isDefault}>

                <Field name="setId" component="input" type={"text"} hidden/>
                {
                    isDefault &&
                    <Header title="NON-MODIFIABLE!" color="alert-warning" widely={true}/>
                }
                <Field name="name" component={FieldString} placeholder="name" sizeClass="form-control-sm"
                       validate={[required, minLength2]}/>

                <Field name="secondsPerQuestion" component={FieldNumberBadge} isSmall={true} badge="SecondsPerQuestion" placeholder="-1 for not limited"
                       validate={[required]} min={-1} max={2000}/>

                <Field name="questionsPerSheet" component={FieldNumberBadge} isSmall={true} badge="QuestionsPerBatch" placeholder="-1 for all questions"
                       validate={[required]} min={-1} max={200}/>

                <Field name="daysKeepResultDetails" component={FieldNumberBadge} isSmall={true} badge="DaysToKeepResultDetails"
                       validate={[required]} min={1} max={30}/>

                <Field name="level2Coefficient" component={FieldNumberFloatBadge} isSmall={true} badge="Level2Coefficient"
                       validate={[required]} min={1} max={2} step={0.1}/>

                <Field name="level3Coefficient" component={FieldNumberFloatBadge} isSmall={true} badge="Level3Coefficient"
                       validate={[required]} min={1} max={2} step={0.1}/>

                <div>
                    <div className="d-inline-block text-truncate">
                        <Field name="strictControlTimePerQuestion" id="strictControlTimePerQuestion" component="input" type="checkbox"
                               title="Specifies, whether or not to limit a single question/batch in time?"/>
                        <label htmlFor="strictControlTimePerQuestion" className="mb-0">Strict time control per question</label>
                    </div>
                </div>

                <div className="form-group text-center mt-1 mb-n1">
                    <button type="button" value="Save" className="btn btn-sm btn-success mr-2" onClick={()=>props.handleSubmit()}>
                        <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
        </form>);
}

SettingsEditForm.propTypes = {
    isDefault: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,

    handleSubmit: PropTypes.func.isRequired
};

SettingsEditForm = reduxForm({form: 'settings-edit', enableReinitialize: true})(SettingsEditForm);

export default SettingsEditForm;