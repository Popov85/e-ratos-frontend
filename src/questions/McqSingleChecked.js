import React from 'react';

import PropTypes from 'prop-types';
import QuestionChecked from './QuestionChecked';
import AnswerMcqSingleChecked from './AnswerMcqSingleChecked';

import './Question.css';

const normal = "bg-normal border-bottom border-regular";

export default class McqSingleChecked extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    getPercent(answerId) {
        const { checkedResponse } = this.props;
        for (const a of checkedResponse.correctAnswer.correctAnswers) {
            if (answerId === a.answerId) return a.percent;
        }
        return 0;
    }

    render() {
        const { checkedResponse } = this.props;
        return (
            <div>
               <QuestionChecked checkedResponse = {checkedResponse}/>
                <div className="border-top border-right border-left border-regular">
                    {
                        checkedResponse.question.answers.map(a => {
                            return (
                                <div key={a.answerId} className={normal}>
                                    <AnswerMcqSingleChecked
                                        questionId={checkedResponse.question.questionId}
                                        answerId={a.answerId}
                                        answer={a.answer}
                                        selected={checkedResponse.response ? checkedResponse.response.answerIds.includes(a.answerId) : false}
                                        percent={this.getPercent(a.answerId)}
                                    />
                                </div>);
                        })
                    }
                </div>
            </div>
        );
    }
};

const propTypes = {
    checkedResponse: PropTypes.object.isRequired
};

McqSingleChecked.propTypes = propTypes;


