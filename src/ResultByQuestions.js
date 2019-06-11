import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultByQuestions extends Component {

    renderScore(score) {
        const isCritical = (score === 0);
        var color = "success"
        if (isCritical) color = "danger"
        return (
            <div className={"col-1 text-center border alert-sm alert-" + color}>
                {score + "%"}
            </div>);
    }

    renderQuestion(resultPerQuestion) {
        const { questionId, question } = resultPerQuestion.question;
        return (
            <div key={questionId} className="row bg-light m-1">
                <div className="col-10 text-left border">
                    {question}
                </div>
                {this.renderScore(resultPerQuestion.score)}
                <div className="col-1 text-center border alert-sm alert-info">
                    <a href="">details</a>
                </div>
            </div>);
    }


    render() {
        const { displayQuestionResults } = this.props.settings;
        if (!displayQuestionResults) return null;
        var output = [];
        this.props.resultPerQuestion.map(q => output.push(this.renderQuestion(q)));
        return (
            <div className="row mt-3">
                <div className="col-xs-0 col-sm-1 col-md-1 col-lg-2 col-xl-2" />
                <div className="col-xs-12 col-sm-10 col-md-10 col-lg-8 col-xl-8">
                    <details open={true}>
                        <summary className="border">By questions</summary>
                        {output}
                    </details>
                </div>
                <div className="col-xs-0 col-sm-1 col-md-1 col-lg-2 col-xl-2" />
            </div>);
    }
}

ResultByQuestions.propTypes = {
    settings: PropTypes.object.isRequired,
    resultPerQuestion: PropTypes.array.isRequired
};

export default ResultByQuestions;