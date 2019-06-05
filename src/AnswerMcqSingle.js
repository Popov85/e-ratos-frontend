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

  updateChecked() {
    this.props.changeResponse(this.props.answerId);
  }

  renderOption() {
    if (this.props.resource) {
      return <Resource resource={this.props.resource.link} title={this.props.answer} />
    } else {
      return <span className="ml-1">{this.props.answer}</span>
    }
  }


  render() {
    return (
      <div>
        <input type="radio"
          name={"option" + this.props.questionId}
          value={this.props.answerId}
          onChange={this.updateChecked}
          checked={this.props.isChecked} /> {this.renderOption()}
      </div>
    );
  }
};
AnswerMcqSingle.propTypes = propTypes;