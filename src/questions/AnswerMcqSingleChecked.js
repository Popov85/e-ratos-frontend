import React from 'react';
import PropTypes from 'prop-types';

import './Question.css';

export default class AnswerMcqSingleChecked extends React.Component {

  shouldComponentUpdate() {
    return false;
  }
 
  renderAnswer() {
    const { answer, percent} = this.props;
    return <span><span className = "font-weight-bold">({percent}%) &nbsp;</span>{answer}</span> 
  }


  render() {
    const {questionId, answerId, answer, selected, percent} = this.props;
    return (
      <div className = "text-truncate">
        <input type="radio"
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
  percent: PropTypes.number.isRequired
};

AnswerMcqSingleChecked.propTypes = propTypes;