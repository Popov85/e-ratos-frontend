import React from 'react';
import PropTypes from 'prop-types';
import Resource from './../Resource';

export default class AnswerMcqSingle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isResource: false
    }
    this.updateChecked = this.updateChecked.bind(this);
  }

  updateChecked() {
    this.props.changeResponse(this.props.answerId);
  }

  renderOption() {
    if (!this.state.isResource) {
      return <span className="text-secondary" title = {"Answer: "+this.props.answer}>{this.props.answer}</span>
    } else {
      if (this.props.resource) {
        return (
          <span title={this.props.answer}>
            {this.props.answer}
            <Resource resource={this.props.resource.link} />
          </span>);
      } else {
        return <span className="text-secondary">{this.props.answer}</span>
      }
    }
  }

  render() {
    return (
      <div className = "text-truncate div-hover">
        <input type="radio"
          className="ml-1"
          name={"option" + this.props.questionId}
          value={this.props.answerId}
          onChange={this.updateChecked}
          checked={this.props.isChecked} /> {this.renderOption()}
      </div>
    );
  }
};

const propTypes = {
  answerId: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  resource: PropTypes.object,
  changeResponse: PropTypes.func
};

AnswerMcqSingle.propTypes = propTypes;