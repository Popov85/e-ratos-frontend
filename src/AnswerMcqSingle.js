import React from 'react';
import Resource from './Resource';
import PropTypes from 'prop-types';

const propTypes = {
  answerId: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  resource: PropTypes.object,
  changeResponse: PropTypes.func
};

export default class AnswerMcqSingle extends React.Component {

  constructor(props) {
    super(props);

    this.updateChecked = this.updateChecked.bind(this);
  }

  updateChecked(event) {
    this.props.changeResponse(this.props.answerId);
  }


  render() {
    return (
        <div className={this.props.highlighting}>
          <input type="radio" name={"option" + this.props.questionId} onChange={this.updateChecked} value={this.props.answerId} />
          {
            this.props.resource ? 
              <Resource resource={this.props.resource.link} title={this.props.answer} /> :
              <span className="ml-1">{this.props.answer}</span>
          }
        </div>
    );
  }
};
AnswerMcqSingle.propTypes = propTypes;