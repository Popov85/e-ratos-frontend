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
            details: true
        }
    }

    componentDidMount() {
        const {result, questionResults} = this.props;
        // If details are available - fetch it
        if (result.details && !questionResults) {
            this.props.getResultDetails(result.resultId);
        }
    }

    renderMessage() {
        return (
            <div className="row text-center mt-1">
                <div className="col-12">
                    <Failure message = "The results per question are not available!"/>
                </div>
            </div>);
    }

    renderDetailsLink() {
        return (
            <div className="row text-center mt-1">
                <div className="col-12">
                    <a href="#" className="badge badge-secondary"
                       onClick={() => this.setState({details: !this.state.details}) }>{(this.state.details) ? "Hide details" : "Details"}
                    </a>
                </div>
            </div>);
    }

    render() {
        const {details} = this.state;
        const {result, resultDetails, questionResults} = this.props;
        const {isLoading, error } = resultDetails;
        return (
            <div className = "mt-2">
                {
                    error &&
                    <Error message="Failed to fetch result details.." close={()=>this.props.clearAllResourceDetailsFailures()}/>
                }
                <Result result={result}/>
                <div>
                    <ResultByThemes themeResults={result.themeResults}/>
                    {
                        result.details ?
                            this.renderDetailsLink()
                            : this.renderMessage()
                    }
                    {
                        questionResults && details &&
                        <ResultByQuestions questionResults={questionResults}/>
                    }
                </div>
                <Overlay show={isLoading ? true : false}/>
            </div>
        );
    }

}

ResultsViewer.propTypes = {
    result: PropTypes.object.isRequired,
    resultDetails:PropTypes.object.isRequired,
    questionResults: PropTypes.array, // Nullable if not present!

    getResultDetails: PropTypes.func.isRequired,
    clearAllResourceDetailsFailures: PropTypes.func.isRequired
};

export default ResultsViewer;