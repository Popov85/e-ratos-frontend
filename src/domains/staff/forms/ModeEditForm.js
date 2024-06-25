import React from 'react'
import PropTypes from "prop-types";
import {Field, reduxForm} from 'redux-form';
import {minLength2, required} from "../../../utils/validators";
import {FaSignInAlt} from "react-icons/fa";
import FieldString from "../../common/forms/controls/FieldString";
import Header from "../../common/components/Header";

let ModeEditForm = props => {

    const {disabled, finished, isDefault} = props;

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled || finished || isDefault}>

                <Field name="modeId" component="input" type={"text"} hidden/>
                {
                    isDefault &&
                    <Header title="NON-MODIFIABLE!" color="alert-warning" widely={true}/>
                }
                <Field name="name" component={FieldString} placeholder="name" sizeClass="form-control-sm"
                       validate={[required, minLength2]}/>

                <div>
                    <div className="d-inline-block text-truncate mr-1">
                        <Field name="helpable" id="helpable" component="input" type="checkbox"
                               title="Can I receive help during the session?"/>
                        <label htmlFor="helpable" className="mb-0">Helpable</label>
                    </div>
                </div>

                <div>
                    <div className="d-inline-block text-truncate">
                        <Field name="pyramid" id="pyramid" component="input" type="checkbox"
                               title="Is pyramid mode on?"/>
                        <label htmlFor="pyramid" className="mb-0">Pyramid</label>
                    </div>
                </div>
                <div>
                    <div className="d-inline-block text-truncate">
                        <Field name="skipable" id="skipable" component="input" type="checkbox"
                               title="Can I skip a question during session?"/>
                        <label htmlFor="skipable" className="mb-0">Skipable</label>
                    </div>
                </div>
                <div>
                    <div className="d-inline-block text-truncate">
                        <Field name="rightAnswer" id="rightAnswer" component="input" type="checkbox"
                               title="Can I request check/right answer during the session?"/>
                        <label htmlFor="rightAnswer" className="mb-0">Right answer</label>
                    </div>
                </div>
                <div>
                    <div className="d-inline-block text-truncate">
                        <Field name="pauseable" id="pauseable" component="input" type="checkbox"
                               title="Can I put the session on pause?"/>
                        <label htmlFor="pauseable" className="mb-0">Pauseable</label>
                    </div>
                </div>
                <div>
                    <div className="d-inline-block text-truncate">
                        <Field name="preservable" id="preservable" component="input" type="checkbox"
                               title="Can I preserve the current session?"/>
                        <label htmlFor="preservable" className="mb-0">Preservable</label>
                    </div>
                </div>
                <div>
                    <div className="d-inline-block text-truncate">
                        <Field name="reportable" id="reportable" component="input" type="checkbox"
                               title="Can I report mistakes during session?"/>
                        <label htmlFor="reportable" className="mb-0">Reportable</label>
                    </div>
                </div>
                <div>
                    <div className="d-inline-block text-truncate">
                        <Field name="starrable" id="starrable" component="input" type="checkbox"
                               title="Can I star questions during the session?"/>
                        <label htmlFor="starrable" className="mb-0">Starrable</label>
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

ModeEditForm.propTypes = {
    isDefault: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,

    handleSubmit: PropTypes.func.isRequired
};

ModeEditForm = reduxForm({form: 'mode-edit', enableReinitialize: true})(ModeEditForm);

export default ModeEditForm;