import React from 'react';
import PropTypes from 'prop-types';
import Start from './Start';
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
        const {schemeInfo} = this.props;
        return (
            <div>
                <ResultByThemes settings = {schemeInfo.settings} themeResults = {this.props.result.themeResults}/>
                <ResultByQuestions settings ={schemeInfo.settings} questionResults = {this.props.result.questionResults}/>
            </div>
        );
    }

    renderDetailsLink() {
        const { displayThemeResults, displayQuestionResults } = this.props.schemeInfo.settings;
        if (!displayThemeResults && !displayQuestionResults) return null;
        return (
            <div className="row text-center mt-1">
                <div className="col-12">
                    <a href="#" className="badge badge-secondary" onClick={this.showDetails}>{(this.state.isDetails) ? "Hide details" : "Details"}</a>
                </div>
            </div>);
    }

    render() {
        const {panelInfo, schemeInfo} = this.props;
        if (this.state.reStart) return <Start panelInfo={panelInfo} schemeInfo = {schemeInfo}/>;
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
    panelInfo: PropTypes.object.isRequired,
    schemeInfo: PropTypes.object.isRequired,
    result: PropTypes.object.isRequired
};

Finish.propTypes = propTypes;