import React from 'react';
import PropTypes from 'prop-types';
import Launcher from './Launcher';
import Result from './Result';
import ResultByThemes from './ResultByThemes';
import ResultByQuestions from './ResultByQuestions';


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
                <ResultByThemes settings = {settings} themeResults = {this.props.result.themeResults}/>
                <ResultByQuestions settings ={settings} questionResults = {this.props.result.questionResults}/>
            </div>
        );
    }

    renderDetailsLink() {
        const { displayThemeResults, displayQuestionResults } = this.props.settings;
        if (!displayThemeResults && !displayQuestionResults) return null;
        return (
            <div className="row text-center mt-1">
                <div className="col-12">
                    <a href="#" className="badge badge-secondary" onClick={this.showDetails}>{(this.state.isDetails) ? "Hide details" : "Details"}</a>
                </div>
            </div>);
    }

    render() {
        const {schemeId} = this.props;
        if (this.state.reStart) return <Launcher schemeId={schemeId}/>;
        return (
            <div>
                <Result result={this.props.result} />
                {this.renderDetailsLink()}
                {this.renderDetails()}
                <div className="row text-center mt-3 mb-3">
                    <div className="col-12">
                        <button className="btn btn-secondary pl-5 pr-5" onClick={this.reStart}>Restart>></button>
                    </div>
                </div>
            </div>
        );
    }
}

const propTypes = {
    schemeId: PropTypes.number.isRequired,
    result: PropTypes.object.isRequired,
    mode: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
};

Finish.propTypes = propTypes;