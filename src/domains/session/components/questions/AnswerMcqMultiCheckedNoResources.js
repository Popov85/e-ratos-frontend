import React from 'react';
import PropTypes from 'prop-types';

import './Question.css';

const AnswerMcqMultiCheckedNoResources = (props) => {

    const {questionId, answerId, answer, selected, percent, required} = props;

    const renderAnswer = () => {
        return <span><span className="font-weight-bold">({percent}% {required ? " required" : ""}) &nbsp;</span>{answer}</span>
    }

    return (
        <div className="text-truncate">
            <input type="checkbox"
                   className="ml-1"
                   name={"option" + questionId}
                   value={answerId}
                   checked={selected} readOnly/>
            <span
                className={`text-${percent > 0 ? 'success' : 'danger'} ${selected && percent === 0 ? 'text-crossed' : ''}`}
                title={"Answer: " + answer}>{renderAnswer()}</span>
        </div>
    );
};

const propTypes = {
    questionId: PropTypes.number.isRequired,
    answerId: PropTypes.number.isRequired,
    answer: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    percent: PropTypes.number.isRequired,
    required: PropTypes.bool
};

AnswerMcqMultiCheckedNoResources.propTypes = propTypes;

export default AnswerMcqMultiCheckedNoResources