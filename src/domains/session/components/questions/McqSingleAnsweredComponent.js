import React from 'react';
import PropTypes from 'prop-types';

import './Question.css';
import AnswerMcqSingleAnsweredNoResources from "./AnswerMcqSingleAnsweredNoResources";
import QuestionCheckedComponent from "./QuestionCheckedComponent";

const normal = "bg-normal border-bottom border-regular";

const McqSingleAnsweredComponent = (props) => {

    const {checkedResponse, fontSize} = props;
    return (
        <div>
            <QuestionCheckedComponent checkedResponse={checkedResponse} fontSize={fontSize}/>
            <div className="border-top border-right border-left border-regular">
                {
                    checkedResponse.question.answers.map(a => {
                        return (
                            <div key={a.answerId} className={normal}>
                                <AnswerMcqSingleAnsweredNoResources
                                    questionId={checkedResponse.question.questionId}
                                    answerId={a.answerId}
                                    answer={a.answer}
                                    fontSize={fontSize}
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
    checkedResponse: PropTypes.object.isRequired,
    fontSize: PropTypes.number.isRequired
};

McqSingleAnsweredComponent.propTypes = propTypes;

export default McqSingleAnsweredComponent;


