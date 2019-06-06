import React from 'react';
import Resource from './Resource';
import PropTypes from 'prop-types';
import '../main.css';

const propTypes = {
  answerId: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  addResponse: PropTypes.func,
  removeResponse: PropTypes.func,
  resource: PropTypes.string,
};

const normal = "bg-normal border-bottom border-regular";
const selected = "bg-selected border-bottom border-regular";

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

  renderOption() {
    if (this.props.resource) {
      return <Resource resource={this.props.resource.link} title={this.props.answer} />
    } else {
      return <span>{this.props.answer}</span>
    }
  }

  render() {
    return (
        <div className={(this.state.checked) ? selected : normal} onClick={this.updateChecked}>
          <input type="checkbox" 
          className = "ml-1"
          name="option" 
          onChange={this.updateChecked} 
          value={this.props.answerId}
          checked={this.state.checked}/> {this.renderOption()}
        </div>
    );
  }
};
AnswerMcqMulti.propTypes = propTypes;