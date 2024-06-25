import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/components/Failure";
import QuestionMcqEditForm from "../forms/QuestionMcqEditForm";
import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

let options = {
    defaultBlockTag: null,
};

class QuestionMcqEdit extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearQuestionMcqState();
    }

    handleSubmit(data) {
        const {questionId, question, level, required, resource, help} = data;
        // Populate not touched fields
        const questionMcqDTO={};
        questionMcqDTO.questionId = questionId;
        questionMcqDTO.question = (question instanceof Object)
            ? stateToHTML(convertFromRaw(question), options) : question;
        questionMcqDTO.level = level ? level : 1;
        questionMcqDTO.required = required ? required : false;
        questionMcqDTO.themeId = this.props.themeId;
        questionMcqDTO.resourceId = resource ? resource.resourceId : null;
        questionMcqDTO.helpId = help ? help.helpId : null;
        const answers = data.answers.map(a=>{
            const answerMcqDTO = {};
            answerMcqDTO.answerId=a.answerId;
            answerMcqDTO.answer=a.answer;
            answerMcqDTO.percent=a.percent ? a.percent : 0;
            answerMcqDTO.required=a.required ? a.required : false;
            return answerMcqDTO;
        });
        questionMcqDTO.answers = answers;
        console.log("Question = ", questionMcqDTO);
        !data.questionId ?
            this.props.saveQuestionMcq(questionMcqDTO)
            : this.props.updateQuestionMcq(questionMcqDTO);
    }

    render() {
        const {questionMcq} = this.props;
        const {userInfo, helpsForSelect, resourcesForSelect} = this.props;
        const {isLoading, error, message} = this.props.questionMcqEdit;

        return (
            <div>
                <div className="row mt-1">
                    <div className="col-12">
                        {
                            isLoading &&
                            <div className="text-center text-secondary m-2">
                                <span>Saving...</span>
                            </div>
                        }
                        {
                            error &&
                            <div className="alert alert-danger text-center p-1" role="alert">
                                <span className="text-danger">
                                    <strong>
                                    <Failure message={error.message}/>
                                </strong>
                                </span>
                            </div>
                        }
                        {
                            message &&
                            <div className="alert alert-success text-center p-1" role="success">
                                <span className="text-success"><strong>{message}</strong></span>
                            </div>
                        }
                        <div className="card bg-transparent">
                            <div className="card-body">
                                <QuestionMcqEditForm
                                    initialValues={questionMcq ?
                                        {
                                            questionId: questionMcq.questionId,
                                            question: questionMcq.question,
                                            level: questionMcq.level,
                                            required: questionMcq.required,
                                            answers: questionMcq.answers,
                                            resource: questionMcq.resource,
                                            help: questionMcq.help
                                        }
                                        : null
                                    }
                                    userInfo={userInfo}
                                    helps={helpsForSelect}
                                    resources={resourcesForSelect}
                                    finished={!!message}
                                    disabled={isLoading}
                                    onSubmit={data => this.handleSubmit(data)}
                                />
                            </div>
                            <div className="form-group text-center mt-n2 mb-2" hidden={!!message}>
                                <a href="#" className="badge badge-secondary" onClick={() => this.props.resetForm()}>
                                    Reset
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

QuestionMcqEdit.propTypes = {
    userInfo: PropTypes.object.isRequired,
    themeId: PropTypes.number.isRequired, // The selected themeId whose questions will be edited
    questionMcqEdit: PropTypes.object.isRequired,
    questionMcq: PropTypes.object, // Nullable for new objects

    clearQuestionMcqState: PropTypes.func.isRequired,
    saveQuestionMcq: PropTypes.func.isRequired,
    updateQuestionMcq: PropTypes.func.isRequired,
    addAnswerOfQuestionMcq: PropTypes.func.isRequired,
    updateAnswerOfQuestionMcq: PropTypes.func.isRequired,
    deleteAnswerOfQuestionMcq: PropTypes.func.isRequired,
    getAllDepartmentsHelps:PropTypes.func.isRequired,
    getAllDepartmentsResources:PropTypes.func.isRequired
};

export default QuestionMcqEdit;
