import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FaCompress, FaEraser, FaExpand} from 'react-icons/fa';
import ResourcePreloader from "../../../staff/components/ResourcePreloader";
import {utilsHTML} from "../../../utils/utilsHTML";

const QuestionComponent = (props) => {

    const {question, expanded} = props;

    const renderTitle = () => {
        return "Level: " + question.level + " | " + "required: " + question.required;
    }

    const renderResources = () => {
        const {resource} = props.question;
        if (!resource) return null;
        return (
            <div className="text-center">
                <ResourcePreloader
                    message="Loading.."
                    url={resource.link}
                    width={resource.width}
                    height={resource.height}/>
            </div>);
    }

    const {serialNumber, level} = question;

    return (
        <div>
            <div className="row">
                <div className="col-12">
                        <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center justify-content-start">
                            <span title="Serial number in individual sequence"
                                  className="badge badge-secondary border p-1">
                                #{serialNumber ? serialNumber : 1}
                            </span>
                            <a href="#" className="badge badge-secondary border"
                               onClick={() => props.clearResponse()} title="Clear your answer">
                                <FaEraser color="white"/>
                            </a>
                            <a href="#" className="badge badge-secondary border"
                               onClick={() => props.setExpanded()} title="Expand/compress">
                                {expanded ? <FaCompress/> : <FaExpand/>}
                            </a>
                        </div>
                            <div className={`badge badge-${level ===1 ? 'secondary' : (level==2) ? 'warning' : 'danger' } border p-1`}>
                                Level: <u>{level}</u>
                            </div>
                        </div>
                </div>
            </div>

            <div className="row text-center border rounded ml-0 mr-0 mt-0 mb-1 ">
                <div className="col-12 pl-0 pr-0 pt-1 pb-1">
                    <h6 className="text-secondary text-center p-0 m-0"
                        title={renderTitle()}>
                        <span dangerouslySetInnerHTML={utilsHTML.createMarkup(question.question)}/>
                    </h6>
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
    expanded: PropTypes.bool.isRequired,
    setExpanded: PropTypes.func.isRequired,
    clearResponse: PropTypes.func
};

QuestionComponent.propTypes = propTypes;

export default QuestionComponent;