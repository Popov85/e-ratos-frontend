import React from 'react';
import PropTypes from 'prop-types';
import Resource from './Resource';
import { FaEraser, FaUndo, FaQuestion, FaFlagCheckered, FaStar,  FaCheck  } from 'react-icons/fa';

import '../main.css';

export default class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isResource: false
        }
    }


    getHelp() {
        // TODO
        alert("Help!");
    }

    doSkip() {
        // TODO
        alert("Skip!");
    }

    doReport() {
        // TODO
        alert("Report!");
    }

    doStar() {
        // TODO
        alert("Star!");
    }

    doClear() {
        this.props.clearResponse();
    }


    renderTitle() {
        return "level: " + this.props.question.level + " | " + "lang: " + this.props.question.lang + " | " + "required: " + this.props.question.required;
    }

    renderPanel() {
        const qId = this.props.question.questionId;
        const help = true; //this.props.mode.helpable && this.props.question.helpAvailable;
        const check = true;
        const skip = true; //this.props.mode.skipable;
        const report = true; // this.props.mode.reportable;
        const star = true; // this.props.mode.starrable;

        var controls = [];

        if (skip) controls.push(
            <span key={"skip" + qId}>
                <a href="#" className="badge badge-primary ml-1" onClick={() => this.doSkip()} title="Skip this question">
                    Skip&nbsp; <FaUndo color="white" />
                </a>
            </span>);

        if (help) controls.push(
            <span key={"help" + qId}>
                <a href="#" className="badge badge-success ml-1" onClick={() => this.getHelp()} title="Get help on this question">
                    Help&nbsp;<FaQuestion color="white" />
                </a>
            </span>);

        if (check) controls.push(
            <span key={"check" + qId}>
                <a href="#" className="badge badge-warning ml-1" onClick={() => this.doCheck()} title="Check if correct?">
                    Check&nbsp;<FaCheck color="white" />
                </a>
            </span>);

        if (report) controls.push(
            <span key={"repo" + qId}>
                <a href="#" className="badge badge-danger ml-1" onClick={() => this.doReport()} title="Complain about this question">
                    Report&nbsp; <FaFlagCheckered color="white" />
                </a>
            </span>);

        if (star) controls.push(
            <span key={"star" + qId}>
                <a href="#" className="badge badge-info ml-1" onClick={() => this.doStar()} title="Evaluate this question with up to 5 stars">
                    Star&nbsp; <FaStar color="white" />
                </a>
            </span>);

        controls.push(
            <span key={"clear" + qId}>
                <a href="#" className="badge badge-secondary ml-1" onClick={() => this.doClear()} title="Clear your answer">
                    Clear&nbsp; <FaEraser color="white" />
                </a>
            </span>);

        return (<div className="text-center m-2">{controls}</div>);
    }

    renderResources() {
        if (!this.state.isResource) return null;
        if (!this.props.resource) return null;
        return <Resource resource={this.props.resource[0].link} />
    }

    render() {
        return (
            <div>
                <div className="row text-center m-2">
                    <div className="col-12 pl-5 pr-5">
                        <h6 className="text-secondary text-center" title={this.renderTitle()}>{this.props.question.question}</h6>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        {this.renderResources()}
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        {this.renderPanel()}
                    </div>
                </div>
            </div>
        );
    }
}

const propTypes = {
    question: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    mode: PropTypes.object.isRequired,
    resource: PropTypes.array,
    clearResponse: PropTypes.func.isRequired
};

Question.propTypes = propTypes;