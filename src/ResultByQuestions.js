import React, { Component } from 'react';
import PropTypes from 'prop-types';

import McqSingleAnswered from './questions/McqSingleAnswered';
import McqMultiAnswered from './questions/McqMultiAnswered';
import McqSingleChecked from './questions/McqSingleChecked';
import McqMultiChecked from './questions/McqMultiChecked';
import { FaInfoCircle } from 'react-icons/fa';

import './questions/Question.css';

class ResultByQuestions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsId: null
        }
        this.myRef = React.createRef();
    }

    componentDidUpdate() {
        const { detailsId } = this.state;
        if (detailsId) {
            //this.myRef.current.focus();
            this.myRef.current.scrollIntoView({block: 'start', behavior: 'smooth'});
        }
    }

    showDetails(detailsId) {
        if (this.state.detailsId === detailsId) {
            this.setState({ detailsId: null });
        } else {
            this.setState({ detailsId });
        }
    }

    renderTitle(questionResult) {
        return "bounty=" + ((questionResult.bounty) ? questionResult.bounty : 0) + "%" +
            " | " +
            "penalty=" + ((questionResult.penalty) ? questionResult.penalty : 0) + "%"
    }

    renderName(serialNumber, question) {
        return (
            <span>
                <span className="font-weight-bold mr-1">
                    {'#' + serialNumber}
                </span>
                {question}
            </span>);
    }

    renderMcqQuestion(questionResult) {
        if (!questionResult.correctAnswer) {
            if (questionResult.question.single) {
                return <McqSingleAnswered checkedResponse={questionResult} />
            } else {
                return <McqMultiAnswered checkedResponse={questionResult} />
            }
        } else {
            if (questionResult.question.single) {
                return <McqSingleChecked checkedResponse={questionResult} />
            } else {
                return <McqMultiChecked checkedResponse={questionResult} />
            }
        }
    }

    renderDetails(questionResult) {
        const { className } = questionResult.question;
        switch (className) {
            case 'ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto':
                return this.renderMcqQuestion(questionResult);
            default:
                console.log('Unrecognized class name = ' + className + '.');
                return null;
        }
    }

    renderQuestion(questionResult) {
        const { detailsId } = this.state;
        const { questionId, question, serialNumber } = questionResult.question;
        return (
            <div key={questionId} ref={questionId===detailsId ? this.myRef : null}>
                <div className="row bg-light no-gutters mt-1 mb-1">
                    <div className={`col text-truncate text-secondary border div-hover ${detailsId === questionId ? 'bg-warning' : ''}`}>
                        <span title={"Question # " + serialNumber + " ID=" + questionId + ": " + question}>{this.renderName(serialNumber, question)}</span>
                    </div>
                    <div className={`col-auto alert-sm alert-${(questionResult.score === 0) ? "danger" : "success"}`}>
                        <div className="row text-center">
                            <div className="col-12">
                                <span className="mr-1"
                                    title={this.renderTitle(questionResult)}>
                                    {questionResult.score.toFixed(1) + "%"}
                                </span>
                                <button className="badge badge-info float-right btn h-100" onClick={() => this.showDetails(questionId)} title="Show details on this question">
                                    <FaInfoCircle color="white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    questionId === detailsId ? <div className="p-2">{this.renderDetails(questionResult)}</div> : null
                }
            </div>
        );
    }

    render() {
        var output = [];
        this.props.questionResults.map(q => output.push(this.renderQuestion(q)));
        return (
            <div className="row mt-3">
                <div className="col-0"/>
                <div className="col-12 pl-5 pr-5">
                    <h6 className="text-center text-secondary"><u>Result by questions:</u></h6>
                    {output}
                </div>
                <div className="col-0" />
            </div>);
    }
}

ResultByQuestions.propTypes = {
    questionResults: PropTypes.array.isRequired
};

export default ResultByQuestions;