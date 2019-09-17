import React from 'react';
import PropTypes from 'prop-types';
import { FaEraser} from 'react-icons/fa';
import Resource from './../Resource';

export default class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isResource: false
        }
    }

    renderTitle() {
        return "level: " + this.props.question.level + " | " + "lang: " + this.props.question.lang + " | " + "required: " + this.props.question.required;
    }

    renderResources() {
        if (!this.state.isResource) return null;
        if (!this.props.question.resourceDomains) return null;
        return <Resource resource={this.props.resource[0].link} />
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <span className = "d-sm-inline-flex align-items-center justify-content-start" title="Serial number in individual sequence">
                            <span className="badge badge-secondary border p-1">#{this.props.question.serialNumber}</span>
                            <a href = "#" className="badge badge-secondary border" onClick={() => this.props.clearResponse()} title="Clear your answer">
                                <FaEraser color="white" />
                            </a>
                        </span>
                    </div>
                </div>

                <div className="row text-center border rounded ml-0 mr-0 mt-0 mb-1 ">
                    <div className="col-12 pl-0 pr-0 pt-1 pb-1">
                        <h6 className="text-secondary text-center p-0 m-0" title={this.renderTitle()}>{this.props.question.question}</h6>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        {this.renderResources()}
                    </div>
                </div>

            </div>
        );
    }
}

const propTypes = {
    question: PropTypes.object.isRequired,
    clearResponse: PropTypes.func
};

Question.propTypes = propTypes;