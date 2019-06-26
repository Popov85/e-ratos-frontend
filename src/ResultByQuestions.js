import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaInfoCircle } from 'react-icons/fa';



class ResultByQuestions extends Component {

    renderQuestion(questionResult) {
        const { questionId, question } = questionResult.question;
        return (
            <div key={questionId} className="row bg-light no-gutters mt-1 mb-1">
                <div className="col text-truncate text-secondary border">
                    <span title={"Question #" + questionId + ": " + question}>{question}</span>
                </div>
                <div className={`col-auto alert-sm alert-${(questionResult.score === 0) ? "danger" : "success"}`}>
                    <div className="row text-center">
                        <div className="col-12">
                            <span className = "mr-1" title="Result on this question">{questionResult.score.toFixed(1) + "%"}</span>
                            <a href="#" className="badge badge-info float-right btn h-100" onClick={() => this.showDetails()} title = "Show details on this question">
                                <FaInfoCircle color="white" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            );
    }

    render() {
        const { displayQuestionResults } = this.props.settings;
        if (!displayQuestionResults) return null;
        var output = [];
        this.props.questionResults.map(q => output.push(this.renderQuestion(q)));
        return (
            <div className="row mt-3">
                <div className="col-xs-0 col-md-1" />
                <div className="col-xs-12 col-md-10">
                    <details open={true}>
                        <summary className="border text-secondary">By questions</summary>
                        {output}
                    </details>
                </div>
                <div className="col-xs-0 col-md-1" />
            </div>);
    }
}

ResultByQuestions.propTypes = {
    settings: PropTypes.object.isRequired,
    questionResults: PropTypes.array.isRequired
};

export default ResultByQuestions;