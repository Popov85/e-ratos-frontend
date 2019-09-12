import React from 'react';

import PropTypes from 'prop-types';
import QuestionChecked from './QuestionChecked';
import AnswerMcqMultiChecked from './AnswerMcqMultiChecked';

import '../main.css';

const normal = "bg-normal border-bottom border-regular";

export default class McqMultiChecked extends React.Component {

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

    isRequired(answerId) {
        const { checkedResponse } = this.props;
        for (const a of checkedResponse.correctAnswer.correctAnswers) {
            if (answerId === a.answerId) return a.required;
        }
        return false;
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
                                    <AnswerMcqMultiChecked
                                        questionId={checkedResponse.question.questionId}
                                        answerId={a.answerId}
                                        answer={a.answer}
                                        selected={checkedResponse.response.answerIds.includes(a.answerId)}
                                        percent={this.getPercent(a.answerId)}
                                        required={this.isRequired(a.answerId)}
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

McqMultiChecked.propTypes = propTypes;


