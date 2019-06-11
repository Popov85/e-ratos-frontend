import React from 'react';
import Start from './Start';
import Result from './Result';
import Cancelled from './Cancelled';
import ResultByThemes from './ResultByThemes';
import ResultByQuestions from './ResultByQuestions';
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
            reStart: false,
            isDetails: false
        }
        this.reStart = this.reStart.bind(this);
        this.showDetails = this.showDetails.bind(this);
    }

    reStart() {
        this.setState({ reStart: true });
    }

    showDetails() {
        var state = (this.state.isDetails ? false : true)
        this.setState({ isDetails: state });
    }

    renderDetails() {
        if (!this.state.isDetails) return null;
        const settings = this.props.settings;
        return (
            <div>
                <ResultByThemes settings = {settings} resultPerTheme = {this.props.result.resultPerTheme}/>
                <ResultByQuestions settings ={settings} resultPerQuestion = {this.props.result.resultPerQuestion}/>
            </div>
        );
    }

    renderDetailsLink() {
        const { displayThemeResults, displayQuestionResults } = this.props.settings;
        if (!displayThemeResults && !displayQuestionResults) return null;
        var text = (this.state.isDetails) ? "Hide details" : "Details";
        return (
            <div className="row text-center mt-1">
                <div className="col-12">
                    <a href="#" className="badge badge-secondary" onClick={this.showDetails}>{text}</a>
                </div>
            </div>);
    }

    render() {
        if (this.state.reStart) return <Start schemeId={this.props.schemeId} />;
        return (
            <div>
                {this.props.isCancelled ? <Cancelled result={this.props.result} /> : <Result result={this.props.result} />}
                {this.renderDetailsLink()}
                {this.renderDetails()}
                <div className="row text-center mt-3">
                    <div className="col-12">
                        <button className="btn btn-secondary pl-5 pr-5" onClick={this.reStart}>Restart>></button>
                    </div>
                </div>
            </div>
        );
    }
}