import React from 'react';
import Resource from './Resource';
import PropTypes from 'prop-types';
import '../main.css';

export default class AnswerMcqMulti extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isResource: false
    }
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
      <div className = "text-truncate">
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
  resource: PropTypes.object
};

AnswerMcqMulti.propTypes = propTypes;