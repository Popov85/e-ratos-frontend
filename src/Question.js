import React from 'react';

import PropTypes from 'prop-types';
import Resource from './Resource';

import { FaTimes, FaUndo, FaQuestion, FaFlagCheckered, FaStar} from 'react-icons/fa';

const testQuestion = {
    className: "ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto",
    questionId: 1,
    question: 'Question #1',
    single: true,
    level: 1,
    type: 1,
    lang: "EN",
    required: false,
    helpAvailable: true
}

const testTheme = {
    themeId: 1,
    name: "ThemeDomain#1"
}

const testMode = {
    modeId: 1,
    name: "Mode #1",
    helpable: false,
    pyramid: false,
    skipable: false,
    rightAnswer: false,
    pauseable: false,
    preservable: false,
    reportable: false,
    starrable: false
}

const propTypes = {
    question: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    mode: PropTypes.object.isRequired,
    resource: PropTypes.array
};

export default class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            questionId: null
        }
    }

    componentWillMount() {
        this.setState({ questionId: this.props.question.questionId });
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


    renderTitle() {
        return "level: " + this.props.question.level + " | " + "lang: " + this.props.question.lang + " | " + "required: " + this.props.question.required;
    }

    renderPanel() {
        const qId = this.props.question.questionId;
        const help = this.props.mode.helpable && this.props.question.helpAvailable;
        const skip = this.props.mode.skipable;
        const report = this.props.mode.reportable;
        const star = this.props.mode.starrable;
        var buttons = [];
        if (skip) buttons.push(<span key = {"skip" + qId}><button type="button" className="btn btn-warning btn-sm ml-1" onClick={this.doSkip} title = "Skip this question"><FaUndo color = "white"/></button></span>);
        if (help) buttons.push(<span key = {"help" + qId}><button type="button" className="btn btn-secondary btn-sm ml-1" onClick={this.getHelp} title = "Get help on this question"><FaQuestion color = "white"/></button></span>);
        if (report) buttons.push(<span key = {"repo" + qId}><button type="button" className="btn btn-secondary btn-sm ml-1" onClick={this.doReport} title = "Complain about this question"><FaFlagCheckered color = "white"/></button></span>);
        if (star) buttons.push(<span key ={"star" + qId}><button type="button" className="btn btn-info btn-sm ml-1" onClick={this.doStar} title = "Evaluate this question with up to 5 stars"><FaStar color = "white"/></button></span>);
        return (<div className="text-center mb-2">{buttons}</div>);
    }

    renderResources() {
        if (!this.props.resource) return null;
        return <Resource resource={this.props.resource[0].link} />
    }

    render() {

        return (
            <div>
                <div className="row text-center">
                    <div className="col-12">
                        <textarea className="border-0 font-weight-bold text-center w-100 mb-2" rows="2" title={this.renderTitle()} defaultValue={this.props.question.question} readOnly={true} />
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

Question.propTypes = propTypes;