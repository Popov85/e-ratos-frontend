import React from 'react';
import PropTypes from 'prop-types';

const AnswerMcqMultiAnsweredNoResources = (props) => {

    const {questionId, answerId, answer, selected} = props;

    return (
        <div className="text-truncate">
            <input type="checkbox"
                   className="ml-1"
                   name={"option" + questionId}
                   value={answerId}
                   checked={selected} readOnly/>
            <span className="text-secondary" title={"Answer: " + answer}>{answer}</span>
        </div>
    );
};

const propTypes = {
    questionId: PropTypes.number.isRequired,
    answerId: PropTypes.number.isRequired,
    answer: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired
};

AnswerMcqMultiAnsweredNoResources.propTypes = propTypes;

export default AnswerMcqMultiAnsweredNoResources;