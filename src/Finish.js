import React from 'react';
import PropTypes from 'prop-types';
import Start from './Start';
import Result from './Result';
import ResultByThemes from './ResultByThemes';
import ResultByQuestions from './ResultByQuestions';
import { FaRedo } from 'react-icons/fa';


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

    renderThemeDetails() {
        const {themeResults} = this.props.result;
        if (!themeResults) return null;
        return <ResultByThemes themeResults={this.props.result.themeResults} />;
    }

    renderQuestionDetails() {
        const {questionResults} = this.props.result;
        if (!questionResults) return null;
        return <ResultByQuestions questionResults={this.props.result.questionResults} />;
    }

    renderDetails() {
        if (!this.state.isDetails) return null;
        return (
            <div>
                {this.renderThemeDetails()}
                {this.renderQuestionDetails()}
            </div>
        );
    }

    renderDetailsLink() {
        const {themeResults, questionResults} = this.props.result;
        if (!themeResults && !questionResults) return null;
        if (themeResults.length===0 && questionResults.length===0) return null;
        return (
            <div className="row text-center mt-1">
                <div className="col-12">
                    <a href="#" className="badge badge-secondary"
                        onClick={this.showDetails}>{(this.state.isDetails) ? "Hide details" : "Details"}
                    </a>
                </div>
            </div>);
    }

    render() {
        const { panelInfo, schemeInfo, result } = this.props;
        console.log("Result = ", result);
        if (this.state.reStart) return <Start panelInfo={panelInfo} schemeInfo={schemeInfo} />;
        return (
            <div>
                <Result result={result}/>
                {this.renderDetailsLink()}
                {this.renderDetails()}
                <div className="row text-center mt-3 mb-3">
                    <div className="col-12">
                        <button className="btn btn-secondary" onClick={this.reStart}>
                            Re-start&nbsp;<FaRedo color="white" />
                        </button>
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