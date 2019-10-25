import React from 'react';
import PropTypes from 'prop-types';
import {FaEraser} from 'react-icons/fa';

const QuestionComponent = (props) => {

    const {question} = props;

    const renderTitle = () => {
        return "level: " + question.level + " | " + "lang: " + question.lang + " | " + "required: " + question.required;
    }

    // TODO: add iframe for a resource
    const renderResources = () => {
        return null;
        /*if (!this.state.isResource) return null;
        if (!this.props.question.resourceDomains) return null;
        return <Resource resource={this.props.resource[0].link}/>*/
    }

    return (
        <div>
            <div className="row">
                <div className="col-12">
                        <span className="d-sm-inline-flex align-items-center justify-content-start"
                              title="Serial number in individual sequence">
                            <span
                                className="badge badge-secondary border p-1">#{question.serialNumber}</span>
                            <a href="#" className="badge badge-secondary border"
                               onClick={() => props.clearResponse()} title="Clear your answer">
                                <FaEraser color="white"/>
                            </a>
                        </span>
                </div>
            </div>

            <div className="row text-center border rounded ml-0 mr-0 mt-0 mb-1 ">
                <div className="col-12 pl-0 pr-0 pt-1 pb-1">
                    <h6 className="text-secondary text-center p-0 m-0"
                        title={renderTitle()}>{question.question}</h6>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    {renderResources()}
                </div>
            </div>

        </div>
    );
}

const propTypes = {
    question: PropTypes.object.isRequired,
    clearResponse: PropTypes.func
};

QuestionComponent.propTypes = propTypes;

export default QuestionComponent;