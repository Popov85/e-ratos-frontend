import React from 'react';
import PropTypes from 'prop-types';

export default class AnswerMcqMultiChecked extends React.Component {

  shouldComponentUpdate() {
    return false;
  }
 
  renderAnswer() {
    const { answer, percent, required} = this.props;
    return <span><span className = "font-weight-bold">({percent}% {required ? " required":"" }) &nbsp;</span>{answer}</span> 
  }


  render() {
    const {questionId, answerId, answer, selected, percent} = this.props;
    return (
      <div className = "text-truncate">
        <input type="checkbox"
          className="ml-1"
          name={"option" + questionId}
          value={answerId}
          checked={selected} readOnly/> 
          <span className={`text-${percent>0 ? 'success':'danger' } ${selected && percent===0 ? 'text-crossed':'' }`}  title = {"Answer: "+answer}>{this.renderAnswer()}</span>
      </div>
    );
  }
};

const propTypes = {
  questionId: PropTypes.number.isRequired,
  answerId: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  percent: PropTypes.number.isRequired,
  required: PropTypes.bool
};

AnswerMcqMultiChecked.propTypes = propTypes;