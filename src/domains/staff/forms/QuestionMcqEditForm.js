import React from 'react'
import PropTypes from "prop-types";
import {Field, FieldArray, reduxForm} from 'redux-form';
import {requiredDraft, requiredField} from "../../../utils/validators";
import {FaPlus, FaRegTrashAlt, FaSignInAlt} from "react-icons/fa";
import FieldString from "../../common/forms/controls/FieldString";
import FieldSelectNoValidate from "../../common/forms/controls/FieldSelectNoValidate";
import validateMcq from "../../../utils/validators/validatorMcq";
import Failure from "../../common/components/Failure";
import {percentSelectOptions} from "../../../utils/constants";
import FieldWysiwyg from "./controls/FieldWysiwyg";
import FieldSwitcher from "../../common/forms/controls/FieldSwitcher";
import FieldLevel from "./controls/FieldLevel";
import FieldResource from "./controls/FieldResource";
import FieldHelp from "./controls/FieldHelp";

const renderAnswer = (fields, answer, index) => {
    return (
        <div key={index} className="d-flex align-items-baseline">
            <span className="text-secondary">{index + 1}.</span>
            <Field name={`${answer}.answerId`} type="text" component="input" hidden/>
            <Field name={`${answer}.answer`} type="text" component={FieldString} sizeClass="form-control-sm"
                   marginClass="mb-1" placeholder="Answer" validate={[requiredField]}/>
            <Field name={`${answer}.percent`} component={FieldSelectNoValidate}
                   title="Percent?" sizeClass="sm" width="80px"
                   items={percentSelectOptions}/>
            <Field name={`${answer}.required`} component={FieldSelectNoValidate}
                   title="Is this answer required?" sizeClass="sm" width="60px"
                   items={[{label: "No", value: false}, {label: "Yes", value: true}]}/>
            <button type="button" className="btn btn-light btn-sm ml-1" title="Delete"
                    onClick={() => fields.remove(index)}>
                <FaRegTrashAlt/>
            </button>
        </div>
    );
}

const renderAnswers = ({fields, meta: {error, submitFailed}}) => {
    return (
        <div>
            {
                fields.map((answer, index) => renderAnswer(fields, answer, index))
            }
            {
                submitFailed && error &&
                <Failure message={error}/>
            }
            <div className="form-group text-right mb-2">
                <button type="button" value="Add" className="btn btn-info btn-sm"
                        onClick={() => fields.push({})}>
                    <div className="align-middle">Add&nbsp; <FaPlus color="white"/></div>
                </button>
            </div>
        </div>
    );
}

let QuestionMcqEditForm = props => {

    const {disabled, finished} = props;

    return (
        <form onSubmit={props.handleSubmit}>
            <fieldset disabled={disabled || finished}>

                <Field name="questionId" component="input" type="text" hidden/>

                <div className="d-flex justify-content-between align-items-center mb-1">
                    <Field name="level" component={FieldLevel}/>
                    <Field name="required" component={FieldSwitcher} textOn="Required" textOff="Optional"/>
                </div>

                <div className="mb-3">
                    <Field name="question" component={FieldWysiwyg}
                           validate={[requiredDraft]}
                           disabled={disabled || finished}/>
                </div>

                <div className="mb-3">
                    <Field name="resource" component={FieldResource}/>
                </div>

                <div className="mb-3">
                    <Field name="help" component={FieldHelp}/>
                </div>

                <FieldArray name="answers" component={renderAnswers}/>

                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
        </form>
    );
}

QuestionMcqEditForm.propTypes = {
    disabled: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,
    helps: PropTypes.array.isRequired,
    resources: PropTypes.array.isRequired,

    handleSubmit: PropTypes.func.isRequired
};

QuestionMcqEditForm = reduxForm({
    form: 'question-mcq-edit',
    validate: validateMcq,
    enableReinitialize: true
})(QuestionMcqEditForm);

export default QuestionMcqEditForm;