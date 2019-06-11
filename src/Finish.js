import React from 'react';
import Start from './Start';
import PropTypes from 'prop-types';

const propTypes = {
    schemeId: PropTypes.number.isRequired,
    result: PropTypes.object.isRequired,
    mode: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    isCancelled: PropTypes.bool
};

export default class Finish extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reStart: false
        }

        this.reStart = this.reStart.bind(this);
    }

    reStart() {
        this.setState({ reStart: true });
    }

    renderPassed() {
        const isPassed = this.props.result.passed;
        const baseName = "col-8 alert-sm alert-";
        var className = "";
        var message = "";
        if (isPassed) {
            className = baseName + "success";
            message = "OK";
        } else {
            className = baseName + "danger";
            message = "No";
        }
        return (
            <div className={className}>
                {message}
            </div>);
    }

    renderBase() {
        const { user, scheme } = this.props.result;
        return (
            <div>
                <div className="row mb-1">
                    <div className="col-4">
                        name:
                    </div>
                    <div className="col-8 alert-sm alert-info">
                        {user}
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col-4">
                        scheme:
                    </div>
                    <div className="col-8 alert-sm alert-info">
                        {scheme}
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col-4">
                        passed:
                    </div>
                    {this.renderPassed()}
                </div>
            </div>
        );
    }

    renderPoints() {
        const { points } = this.props.result;
        if (!points) return null;
        return (
            <div className="row mb-1">
                <div className="col-4">
                    points:
            </div>
                <div className="col-8 alert-sm alert-info">
                    {points}
                </div>
            </div>);
    }

    renderResult() {
        const { percent, grade } = this.props.result;
        return (<div className="card bg-light mb-3">
            <div className="card-header">Your result</div>
            <div className="card-body">
                <div className="card-text">

                    {this.renderBase()}

                    <div className="row mb-1">
                        <div className="col-4">
                            percent:
                        </div>
                        <div className="col-8 alert-sm alert-info">
                            {percent}
                        </div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-4">
                            grade:
                        </div>
                        <div className="col-8 alert-sm alert-info">
                            {grade}
                        </div>
                    </div>
                    {this.renderPoints()}
                </div>
            </div>
        </div>);
    }

    renderPercent(percent) {
        const isCritical = (percent <50);
        var color = "success"
        if (isCritical) color = "danger"
        return (
            <div className={"col-1 text-center border alert-sm alert-"+color}>
                {percent + "%"}
            </div>);
    }

    renderTheme(resultPerTheme) {
        return (
            <div key={resultPerTheme.themeDomain.themeId} className="row bg-light m-1">
                <div className="col-10 text-left border">
                    {resultPerTheme.themeDomain.name}
                </div>
                <div className="col-1 text-center border alert-sm alert-info">
                    {resultPerTheme.quantity}
                </div>
                {this.renderPercent(resultPerTheme.percent)}
            </div>);
    }

    renderThemes() {
        const { displayThemeResults } = this.props.settings;
        if (!displayThemeResults) return null;
        var output = [];
        this.props.result.resultPerTheme.map(t => output.push(this.renderTheme(t)));
        return (
            <div className="row">
                <div className="col-xs-1 col-sm-1 col-md-2 col-lg-3 col-xl-3" />
                <div className="col-xs-10 col-sm-10 col-md-8 col-lg-6 col-xl-6">
                    {output}
                </div>
                <div className="col-xs-1 col-sm-1 col-md-2 col-lg-3 col-xl-3" />
            </div>);
    }

    renderScore(score) {
        const isCritical = (score ===0);
        var color = "success"
        if (isCritical) color = "danger"
        return (
            <div className={"col-1 text-center border alert-sm alert-"+color}>
                {score + "%"}
            </div>);
    }

    renderQuestion(resultPerQuestion) {
        const {questionId, question} = resultPerQuestion.question;
        return (
            <div key={questionId} className="row bg-light m-1">
                <div className="col-10 text-left border">
                    {question}
                </div>
                {this.renderScore(resultPerQuestion.score)}
                <div className="col-1 text-center border alert-sm alert-info">
                    <a href= "">details</a>
                </div>
            </div>);
    }

    renderQuestions() {
        const { displayQuestionResults } = this.props.settings;
        if (!displayQuestionResults) return null;
        var output = [];
        this.props.result.resultPerQuestion.map(q => output.push(this.renderQuestion(q)));
        return (
            <div className="row mt-3">
                <div className="col-xs-0 col-sm-1 col-md-1 col-lg-2 col-xl-2" />
                <div className="col-xs-12 col-sm-10 col-md-10 col-lg-8 col-xl-8">
                    {output}
                </div>
                <div className="col-xs-0 col-sm-1 col-md-1 col-lg-2 col-xl-2" />
            </div>);
    }

    renderCancelled() {
        return (<div className="card bg-light border border-warning mb-3">
            <div className="card-header">You cancelled</div>
            <div className="card-body">
                <div className="card-text">
                    {this.renderBase()}
                </div>
            </div>
        </div>);
    }

    render() {
        if (this.state.reStart) return <Start schemeId={this.props.schemeId} />;
        return (
            <div>
                <div className="row pt-5">
                    <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
                    <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                        {this.props.isCancelled ? this.renderCancelled() : this.renderResult()}
                    </div>
                    <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
                </div>

                {this.renderThemes()}
                {this.renderQuestions()}
                <div className="row text-center mt-3">
                    <div className="col-12">
                        <button className="btn btn-secondary pl-5 pr-5" onClick={this.reStart}>Restart>></button>
                    </div>
                </div>
            </div>
        );
    }
}