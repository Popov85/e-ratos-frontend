import React from 'react';
import Resource from './Resource';

import PropTypes from 'prop-types';

const propTypes = {
  answerId: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  resource: PropTypes.string,
  addResponse: PropTypes.func,
  removeResponse: PropTypes.func
};

export default class AnswerMcqMulti extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
    this.updateChecked = this.updateChecked.bind(this);
  }

  updateChecked() {
    // check if this value now checked
    if (!this.state.checked) {
      // add to array if not present
      this.props.addResponse(this.props.answerId);
    } else {
      // remove from array, flag false
      this.props.removeResponse(this.props.answerId);
    }
    this.setState({ checked: !this.state.checked });
  }

  getClassName() {
    if (!this.state.checked) {
      return "bg-secondary border border-dark";
    } else {
      return "bg-info border border-dark";
    }
  }

  render() {
    return (
        <div className={this.getClassName()} onClick={this.updateChecked}>
          <input type="checkbox" name="option" onChange={this.updateChecked} checked={this.state.checked} value={this.props.answerId} />
          {
            this.props.resource ?
              <Resource resource={this.props.resource.link} title={this.props.answer} /> :
              <span className="ml-1">{this.props.answer}</span>
          }
        </div>
    );
  }
};
AnswerMcqMulti.propTypes = propTypes;