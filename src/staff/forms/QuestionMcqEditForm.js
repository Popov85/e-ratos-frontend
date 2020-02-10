import React from 'react'
import PropTypes from "prop-types";
import {Field, FieldArray, reduxForm} from 'redux-form';
import {minLength8, required} from "../../utils/validators";
import {FaPlus, FaSignInAlt, FaTimes} from "react-icons/fa";
import FieldText from "../../common/forms/controls/FieldText";
import FieldString from "../../common/forms/controls/FieldString";
import FieldSelectNoValidate from "../../common/forms/controls/FieldSelectNoValidate";
import validateMcq from "../../utils/validators/validatorMcq";
import Failure from "../../common/Failure";
import {percentSelectOptions} from "../../utils/constants";

const renderAnswer = (fields, answer, index) => {
    return (
        <div key={index} className="d-flex align-items-baseline">
            <span className="text-secondary">{index + 1}.</span>
            <Field name={`${answer}.answerId`} type="text" component="input" hidden/>
            <Field name={`${answer}.answer`} type="text" component={FieldString} sizeClass="form-control-sm"
                   marginClass="mb-1" placeholder="Answer" validate={[required]}/>
            <Field name={`${answer}.percent`} component={FieldSelectNoValidate}
                   title="Percent?" sizeClass="sm" width="80px"
                   items={percentSelectOptions}/>
            <Field name={`${answer}.required`} component={FieldSelectNoValidate}
                   title="Is this answer required?" sizeClass="sm" width="120px"
                   items={[{label: "Not required", value: false}, {label: "Required", value: true}]}/>
            <button type="button" className="btn btn-secondary btn-sm ml-1" title="Delete"
                    onClick={() => fields.remove(index)}>
                <FaTimes/>
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
                <Failure message = {error}/>
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

                <div>
                    <div className="d-flex justify-content-between align-items-end mb-1">
                        <div>
                            <a href="#" onClick={() => alert('Show look-up for helps')}
                               className="badge badge-dark mr-1">Add help</a>
                            <a href="#" onClick={() => alert('Show look-up for resources')}
                               className="badge badge-secondary">Add resource</a>
                        </div>
                        <div className="d-flex">
                            <div className="mr-1">
                                <Field name="level" component={FieldSelectNoValidate} width="85px" sizeClass="sm"
                                       title="Select level"
                                       items={[{label: "Level: 1", value: 1}, {label: "Level: 2", value: 2}, {
                                           label: "Level: 3",
                                           value: 3
                                       }]}/>
                            </div>
                            <div>
                                <Field name="required" component={FieldSelectNoValidate} width="120px" sizeClass="sm"
                                       title="Is this question required to appear in each student session?"
                                       items={[{label: "Not required", value: false}, {label: "Required", value: true}]}/>
                            </div>
                        </div>
                    </div>
                    <Field name="question" component={FieldText} placeholder="Question"
                           validate={[required, minLength8]}/>

                    <FieldArray name="answers" component={renderAnswers}/>

                </div>

                <div className="form-group text-center mb-n1">
                    <button type="submit" value="Save" className="btn btn-sm btn-success mr-2">
                        <div className="align-middle">Save&nbsp; <FaSignInAlt color="white"/></div>
                    </button>
                </div>
            </fieldset>
        </form>);
}

QuestionMcqEditForm.propTypes = {
    disabled: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired,
    helps: PropTypes.array.isRequired,
    resources: PropTypes.array.isRequired,

    handleSubmit: PropTypes.func.isRequired
};

QuestionMcqEditForm = reduxForm({form: 'question-mcq-edit', validate: validateMcq, enableReinitialize: true})(QuestionMcqEditForm);

export default QuestionMcqEditForm;