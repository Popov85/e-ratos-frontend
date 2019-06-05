import React from 'react';
import Resource from './Resource';
import PropTypes from 'prop-types';
import '../main.css';

const propTypes = {
  answerId: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  addResponse: PropTypes.func,
  removeResponse: PropTypes.func,
  resource: PropTypes.string,
};

const normal = "bg-normal border border-regular";
const selected = "bg-selected border border-regular";

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

  computeClass(length, index) {
    const addOnForNotLast = " border-bottom-0";
    var normalClass = normal;
    var selectedClass = selected;
    if (index!==length-1) {
        normalClass = normalClass+ addOnForNotLast;
        selectedClass = selectedClass+ addOnForNotLast;
    }
    return (this.state.checked) ? selectedClass : normalClass
}

  renderOption() {
    if (this.props.resource) {
      return <Resource resource={this.props.resource.link} title={this.props.answer} />
    } else {
      return <span>{this.props.answer}</span>
    }
  }

  render() {
    const {length, index} = this.props;
    return (
        <div className={this.computeClass(length, index)} onClick={this.updateChecked}>
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