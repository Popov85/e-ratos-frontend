import React from 'react';
import PropTypes from 'prop-types';
import Resource from './Resource';
import { FaEraser, FaUndo, FaQuestion, FaFlagCheckered, FaStar, FaCheck } from 'react-icons/fa';

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
        const help = this.props.mode.helpable && this.props.question.helpAvailable;
        const check = this.props.mode.rightAnswer;
        const skip = this.props.mode.skipable;
        const report = this.props.mode.reportable;
        const star = this.props.mode.starrable;

        var controls = [];

        if (skip) controls.push(
            <span key={"skip" + qId}>
                <button type="button" className="badge badge-primary ml-1" onClick={() => this.doSkip()} title="Skip this question">
                    Skip&nbsp;<FaUndo color="white" />
                </button>
            </span>);

        if (help) controls.push(
            <span key={"help" + qId}>
                <button type="button" className="badge badge-success ml-1" onClick={() => this.getHelp()} title="Get help on this question">
                    Help&nbsp;<FaQuestion color="white" />
                </button>
            </span>);

        if (check) controls.push(
            <span key={"check" + qId}>
                <button type="button" className="badge badge-warning ml-1" onClick={() => this.doCheck()} title="Check if correct?">
                    Check&nbsp;<FaCheck color="white" />
                </button>
            </span>);

        if (report) controls.push(
            <span key={"repo" + qId}>
                <button type="button" className="badge badge-danger ml-1" onClick={() => this.doReport()} title="Complain about this question">
                    Report&nbsp;<FaFlagCheckered color="white" />
                </button>
            </span>);

        if (star) controls.push(
            <span key={"star" + qId}>
                <button type="button" className="badge badge-info ml-1" onClick={() => this.doStar()} title="Evaluate this question with up to 5 stars">
                    Star&nbsp;<FaStar color="white" />
                </button>
            </span>);

        controls.push(
            <span key={"clear" + qId}>
                <button type="button" className="badge badge-secondary ml-1" onClick={() => this.doClear()} title="Clear your answer">
                    Clear&nbsp;<FaEraser color="white" />
                </button>
            </span>);

        return (
            <div className="row">
                <div className="col-1" title="Serial number in individual sequence">
                    <a href="#" className="badge badge-secondary p-2">#{this.props.question.serialNumber}</a>
                </div>
                <div className="col-10">
                    <div className="text-center">{controls}</div>
                </div>
                <div className="col-1" />
            </div>);
    }

    renderResources() {
        if (!this.state.isResource) return null;
        if (!this.props.resource) return null;
        return <Resource resource={this.props.resource[0].link} />
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        {this.renderPanel()}
                    </div>
                </div>

                <div className="row text-center border rounded ml-0 mr-0 mt-1 mb-1 ">
                    <div className="col-12 pl-0 pr-0 pt-2 pb-2">
                        <h6 className="text-secondary text-center p-0" title={this.renderTitle()}>{this.props.question.question}</h6>
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
    theme: PropTypes.object.isRequired,
    mode: PropTypes.object.isRequired,
    clearResponse: PropTypes.func.isRequired,
    resource: PropTypes.array
};

Question.propTypes = propTypes;