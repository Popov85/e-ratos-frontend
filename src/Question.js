import React from 'react';
import PropTypes from 'prop-types';
import Resource from './Resource';
import { FaEraser , FaUndo, FaQuestion, FaFlagCheckered, FaStar} from 'react-icons/fa';

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

    clear() {
        this.props.clearResponse();
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
        buttons.push(<span key ={"clear" + qId}><button type="button" className="btn btn-warning btn-sm ml-1" onClick={()=>this.clear()} title = "Clear"><FaEraser color = "white"/></button></span>);
        return (<div className="text-center mb-2">{buttons}</div>);
    }

    renderResources() {
        if (!this.state.isResource) return null;
        if (!this.props.resource) return null;
        return <Resource resource={this.props.resource[0].link} />
    }

    render() {
        return (
            <div>
                <div className="row text-center">
                    <div className="col-12">
                        <textarea className="border-0 bg-ratos text-secondary text-center w-100 mb-1 no-scroll" rows="2" title={this.renderTitle()} defaultValue={this.props.question.question} readOnly={true} />
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