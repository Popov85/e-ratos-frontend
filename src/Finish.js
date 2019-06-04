import React from 'react';
import Start from './Start';
import PropTypes from 'prop-types';

const propTypes = {
    schemeId: PropTypes.number.isRequired,
    result: PropTypes.object.isRequired,
    isCancelled: PropTypes.bool
};

const testResult = {
    user: "Andrey P.",
    scheme: "Scheme #1",
    passed: true,
    percent: 90,
    grade: 5,
    points: 3,
    resultPerTheme: [
        {
            themeDomain: {
                themeId: 1,
                name: "Theme #1"
            },
            quantity: 10,
            percent: 90
        }
    ],
    resultPerQuestion: []
}

export default class Finish extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reStart: false
        }

        this.reStart = this.reStart.bind(this);
    }

    reStart() {
        this.setState({reStart: true});
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
        return (
            <div className="row mb-1">
                <div className="col-4">
                    points:
            </div>
                <div className="col-8 alert-sm alert-info">
                    {this.props.result.points}
                </div>
            </div>);
    }

    renderResult() {
        const { percent, grade, points } = this.props.result;
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

                    <div className="row mb-1">
                        <div className="col-4">
                            points:
                        </div>
                        <div className="col-8 alert-sm alert-info">
                            {points}
                        </div>
                    </div>

                </div>
            </div>
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
                        {
                            this.props.isCancelled ? this.renderCancelled() : this.renderResult()
                        }
                    </div>
                    <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
                </div>
                <div className="row text-center">
                    <div className="col-12">
                        <button className="btn btn-secondary pl-5 pr-5" onClick={this.reStart}>Restart>></button>
                    </div>
                </div>
            </div>
        );
    }
}