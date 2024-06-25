import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Result from "../../session/components/Result";
import ResultByThemes from "../../session/components/ResultByThemes";
import ResultByQuestions from "../../session/components/ResultByQuestions";
import Failure from "../../common/components/Failure";
import Overlay from "../../common/components/Overlay";
import Error from "../../common/components/Error";

class ResultsViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            details: false
        }
    }

    componentDidMount() {
        const {resultId} = this.props;
        this.props.getResult(resultId);
    }

    renderMessage() {
        return (
            <div className="row text-center mt-1">
                <div className="col-12">
                    <Failure message="The results per question are not available!"/>
                </div>
            </div>);
    }

    renderDetailsLink() {
        return (
            <div className="row text-center mt-1">
                <div className="col-12">
                    <a href="#" className="badge badge-secondary"
                       onClick={() => this.setState({details: !this.state.details})}>{(this.state.details) ? "Hide details" : "Details"}
                    </a>
                </div>
            </div>);
    }

    render() {
        const {details} = this.state;
        const {resultId, result, resultDetails} = this.props;
        let user = "";
        let scheme = "";
        let timeSpent = "";
        if (result) {
            const {name, surname} = result.student.user;
            user = name + " " + surname;
            scheme = result.scheme.name;
            timeSpent = result.sessionLasted + "s";
        }

        const {isLoading, error} = resultDetails;

        const questionResults = resultDetails.content[resultId];

        return (
            <div className="container-fluid p-0">
                <div className="mt-2">
                    {
                        error &&
                        <Error message="Failed to fetch result details.."
                               close={() => this.props.clearAllResultDetailsFailures()}/>
                    }
                    {result && <Result result={{ ...result, user, scheme, timeSpent }} />}
                    <div>
                        {result && result.themeResults &&
                            <ResultByThemes themeResults={result.themeResults}/>}
                        {
                            result && result.details ?
                                this.renderDetailsLink()
                                : this.renderMessage()
                        }
                        {
                            details && questionResults &&
                            <ResultByQuestions questionResults={questionResults}/>
                        }
                    </div>
                    <Overlay show={!!isLoading}/>
                </div>
            </div>
        );
    }
}

ResultsViewer.propTypes = {
    resultId: PropTypes.number.isRequired,
    result: PropTypes.object,
    resultDetails: PropTypes.object,

    getResult: PropTypes.func.isRequired,
    clearAllResultDetailsFailures: PropTypes.func.isRequired
};

export default ResultsViewer;