import React from 'react';
import PropTypes from 'prop-types';

import './Question.css';
import QuestionCheckedComponent from "./QuestionCheckedComponent";
import AnswerMcqMultiAnsweredNoResources from "./AnswerMcqMultiAnsweredNoResources";

const normal = "bg-normal border-bottom border-regular";

const McqMultiAnsweredComponent = (props) => {

    const {checkedResponse} = props;

    return (
        <div>
            <QuestionCheckedComponent checkedResponse={checkedResponse}/>
            <div className="border-top border-right border-left border-regular">
                {
                    checkedResponse.question.answers.map(a => {
                        return (
                            <div key={a.answerId} className={normal}>
                                <AnswerMcqMultiAnsweredNoResources
                                    questionId={checkedResponse.question.questionId}
                                    answerId={a.answerId}
                                    answer={a.answer}
                                    selected={checkedResponse.response ? checkedResponse.response.answerIds.includes(a.answerId) : false}
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

McqMultiAnsweredComponent.propTypes = propTypes;

export default McqMultiAnsweredComponent;


