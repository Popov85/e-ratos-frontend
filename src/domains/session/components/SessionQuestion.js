import React, {useState} from 'react';
import PropTypes from 'prop-types';
import McqSingleContainer from "../containers/questions/McqSingleContainer";
import McqMultiContainer from "../containers/questions/McqMultiContainer";
import McqSingleCheckedContainer from "../containers/questions/McqSingleCheckedContainer";
import McqMultiCheckedContainer from "../containers/questions/McqMiltiCheckedContainer";

const SessionQuestion = props => {

    const {question, responseChecked} = props;
    const key = question.questionId;

    const renderMcq = () => {
        const single = question.single;
        if (!responseChecked) {
            return (
                <div className="row mt-0 mb-4">
                    <div className="col-12">
                        {single ?
                            <McqSingleContainer key={key}/>
                            : <McqMultiContainer key={key} />}
                    </div>
                </div>);
        }
        return (
            <div className="row mt-0 mb-4">
                <div className="col-12">
                    {single ?
                        <McqSingleCheckedContainer key={key} />
                        : <McqMultiCheckedContainer key={key} />}
                </div>
            </div>);
    }

    const resolveTypeAndRenderQuestion = () => {
        switch (question.className) {
            case 'ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto':
                return renderMcq();
            case 'ua.edu.ratos.service.dto.session.question.QuestionFBSQSessionOutDto':
                throw new Error("Not implemented yet!");
            case 'ua.edu.ratos.service.dto.session.question.QuestionFBMQSessionOutDto':
                throw new Error("Not implemented yet!");
            case 'ua.edu.ratos.service.dto.session.question.QuestionMQSessionOutDto':
                throw new Error("Not implemented yet!");
            case 'ua.edu.ratos.service.dto.session.question.QuestionSQSessionOutDto':
                throw new Error("Not implemented yet!");
            default:
                throw new Error("Unrecognized class name!");
        }
    }

    return resolveTypeAndRenderQuestion();
};

SessionQuestion.propTypes = {
    question: PropTypes.object.isRequired,
    responseChecked: PropTypes.object
};

export default SessionQuestion;