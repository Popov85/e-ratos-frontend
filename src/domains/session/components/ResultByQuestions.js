import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FaInfoCircle} from 'react-icons/fa';

import './questions/Question.css';
import McqSingleAnsweredComponent from "./questions/McqSingleAnsweredComponent";
import McqMultiAnsweredComponent from "./questions/McqMultiAnsweredComponent";
import McqSingleCheckedComponent from "./questions/McqSingleCheckedComponent";
import McqMultiCheckedComponent from "./questions/McqMultiCheckedComponent";

class ResultByQuestions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsId: null
        }
        this.myRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { detailsId } = this.state;
        if (detailsId) {
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
        return "bounty=" + ((questionResult.bounty) ? questionResult.bounty : 0) + "%" + " | " + "penalty=" + ((questionResult.penalty) ? questionResult.penalty : 0) + "%"
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
                return <McqSingleAnsweredComponent checkedResponse={questionResult} />
            } else {
                return <McqMultiAnsweredComponent checkedResponse={questionResult} />
            }
        } else {
            if (questionResult.question.single) {
                return <McqSingleCheckedComponent checkedResponse={questionResult} />
            } else {
                return <McqMultiCheckedComponent checkedResponse={questionResult} />
            }
        }
    }

    renderDetails(questionResult) {
        const { className } = questionResult.question;
        switch (className) {
            case 'ua.edu.ratos.service.dto.session.question.QuestionMCQSessionOutDto':
                return this.renderMcqQuestion(questionResult);
            case 'ua.edu.ratos.service.dto.session.question.QuestionFBSQSessionOutDto':
                throw new Error("Not yet implemented!");
            case 'ua.edu.ratos.service.dto.session.question.QuestionFBMQSessionOutDto':
                throw new Error("Not yet implemented!");
            case 'ua.edu.ratos.service.dto.session.question.QuestionMQSessionOutDto':
                throw new Error("Not yet implemented!");
            case 'ua.edu.ratos.service.dto.session.question.QuestionSQSessionOutDto':
                throw new Error("Not yet implemented!");
            default: throw new Error("Unrecognized class name!");
        }
    }

    renderQuestion(questionResult, index) {
        const { detailsId } = this.state;
        const { questionId, question, serialNumber } = questionResult.question;
        const uniqueKey = `${questionId}-${index}`;
        return (
            <div key={uniqueKey} ref={questionId===detailsId ? this.myRef : null}>
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
        let output = [];
        this.props.questionResults.map((q, index) => output.push(this.renderQuestion(q, index)));
        return (
            <div className="row mt-3 mr-1 ml-1">
                <div className="col-0"/>
                <div className="col-12">
                    <h6 className="text-center text-secondary"><u>Result by questions:</u></h6>
                    {output}
                </div>
                <div className="col-0 " />
            </div>);
    }
}

ResultByQuestions.propTypes = {
    questionResults: PropTypes.array.isRequired
};

export default ResultByQuestions;