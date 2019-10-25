import React from 'react';
import PropTypes from 'prop-types';

const AnswerMcqSingleNoResources = (props) => {

    const {questionId, answerId, answer, isChecked} = props;

    const renderOption = () => {
        return <span className="text-secondary" title={"Answer: " + answer}>{answer}</span>
    }

    return (
        <div className="text-truncate div-hover">
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

    changeResponse: PropTypes.func
};

AnswerMcqSingleNoResources.propTypes = propTypes;

export default AnswerMcqSingleNoResources;
