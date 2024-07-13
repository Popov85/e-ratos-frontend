import React from 'react';
import PropTypes from 'prop-types';
import './Question.css';
import AnswerMcqSingleCheckedNoResources from "./AnswerMcqSingleCheckedNoResources";
import QuestionCheckedComponent from "./QuestionCheckedComponent";

const normal = "bg-normal border-bottom border-regular";

const McqSingleCheckedComponent = (props) => {

    const {checkedResponse, fontSize} = props;

    const getPercent = (answerId) => {
        for (const a of checkedResponse.correctAnswer.correctAnswers) {
            if (answerId === a.answerId) return a.percent;
        }
        return 0;
    }

    return (
        <div>
            <QuestionCheckedComponent checkedResponse={checkedResponse} fontSize = {fontSize}/>
            <div className="border-top border-right border-left border-regular">
                {
                    checkedResponse.question.answers.map(a => {
                        return (
                            <div key={a.answerId} className={normal}>
                                <AnswerMcqSingleCheckedNoResources
                                    questionId={checkedResponse.question.questionId}
                                    answerId={a.answerId}
                                    answer={a.answer}
                                    fontSize = {props.fontSize}
                                    selected={checkedResponse.response ? checkedResponse.response.answerIds.includes(a.answerId) : false}
                                    percent={getPercent(a.answerId)}
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

McqSingleCheckedComponent.propTypes = propTypes

export default McqSingleCheckedComponent;


