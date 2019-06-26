import React from 'react';
import Resource from './Resource';
import PropTypes from 'prop-types';
import '../main.css';

export default class AnswerMcqMulti extends React.Component {

  updateChecked() {
    this.props.changeResponse(this.props.answerId);
  }


  renderOption() {
    if (this.props.resource) {
      return <Resource resource={this.props.resource.link} title={this.props.answer} />
    } else {
      return <span className="text-secondary">{this.props.answer}</span>
    }
  }

  render() {
    return (
      <div>
        <input type="checkbox"
          className="ml-1"
          name="option"
          value={this.props.answerId}
          onChange={() => this.updateChecked()}
          checked={this.props.isChecked} /> {this.renderOption()}
      </div>
    );
  }
};

const propTypes = {
  answerId: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  changeResponse: PropTypes.func.isRequired,
  resource: PropTypes.string
};

AnswerMcqMulti.propTypes = propTypes;