import React from 'react';
import PropTypes from 'prop-types';

const AnswerMcqSingleAnsweredNoResources = (props) => {

    const {questionId, answerId, answer, selected, fontSize} = props;
    return (
        <div className="text-truncate" style={{fontSize: fontSize + 'px'}}>
            <input type="radio"
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
    selected: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired
};

AnswerMcqSingleAnsweredNoResources.propTypes = propTypes;

export default AnswerMcqSingleAnsweredNoResources;