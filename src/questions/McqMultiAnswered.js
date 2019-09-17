import React from 'react';
import PropTypes from 'prop-types';

import QuestionChecked from './QuestionChecked';
import AnswerMcqMultiAnswered from './AnswerMcqMultiAnswered';

import './Question.css';

const normal = "bg-normal border-bottom border-regular";

export default class McqMultiAnswered extends React.Component {

    shouldComponentUpdate() {
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
                                    <AnswerMcqMultiAnswered
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
    }
};

const propTypes = {
    checkedResponse: PropTypes.object.isRequired
};

McqMultiAnswered.propTypes = propTypes;


