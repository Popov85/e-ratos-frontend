import React from 'react';
import PropTypes from 'prop-types';

const AnswerMcqSingleNoResources = (props) => {

    const {questionId, answerId, answer, isChecked, expanded} = props;

    const renderOption = () => {
        return <span className="text-secondary" title={"Answer: " + answer}>{answer}</span>
    }

    return (
        <div className={`div-hover ${!expanded ? 'text-truncate': ''}`} style={{fontSize: props.fontSize + 'px'}}>
            <input type="radio"
                   className="ml-1"
                   name={"option" + questionId}
                   value={answerId}
                   onChange={() => props.changeResponse(answerId)}
                   checked={isChecked}/> {renderOption()}
        </div>
    );
};

const propTypes = {
    questionId: PropTypes.number.isRequired,
    answerId: PropTypes.number.isRequired,
    answer: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,

    changeResponse: PropTypes.func
};

AnswerMcqSingleNoResources.propTypes = propTypes;

export default AnswerMcqSingleNoResources;
