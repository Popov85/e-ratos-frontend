import React from 'react';
import PropTypes from 'prop-types';

import './Question.css';
import AnswerMcqMultiCheckedNoResources from "./AnswerMcqMultiCheckedNoResources";
import QuestionCheckedComponent from "./QuestionCheckedComponent";

const normal = "bg-normal border-bottom border-regular";

const McqMultiCheckedComponent = (props) => {

    const {checkedResponse} = props;

    const getPercent = (answerId) => {
        for (const a of checkedResponse.correctAnswer.correctAnswers) {
            if (answerId === a.answerId) return a.percent;
        }
        return 0;
    }

    const isRequired = (answerId) => {
        for (const a of checkedResponse.correctAnswer.correctAnswers) {
            if (answerId === a.answerId) return a.required;
        }
        return false;
    }

    return (
        <div>
            <QuestionCheckedComponent checkedResponse={checkedResponse}/>
            <div className="border-top border-right border-left border-regular">
                {
                    checkedResponse.question.answers.map(a => {
                        return (
                            <div key={a.answerId} className={normal}>
                                <AnswerMcqMultiCheckedNoResources
                                    questionId={checkedResponse.question.questionId}
                                    answerId={a.answerId}
                                    answer={a.answer}
                                    selected={checkedResponse.response ? checkedResponse.response.answerIds.includes(a.answerId) : false}
                                    percent={getPercent(a.answerId)}
                                    required={isRequired(a.answerId)}
                                />
                            </div>);
                    })
                }
            </div>
        </div>
    );
};

const propTypes = {
    checkedResponse: PropTypes.object.isRequired
};

McqMultiCheckedComponent.propTypes = propTypes;

export default McqMultiCheckedComponent;


