import React from 'react';
import AnswerMcqSingle from './AnswerMcqSingle';
import PropTypes from 'prop-types';
import Question from './Question';
import '../main.css';

const propTypes = {
    answers: PropTypes.array,
    putResponse: PropTypes.func
};

const normal = "bg-normal border-bottom border-regular";
const selected = "bg-selected border-bottom border-regular";

export default class McqSingle extends Question {
    constructor(props) {
        super(props);
        this.state = {
            className: 'ua.edu.ratos.service.domain.response.ResponseMCQ',
            answerIds: []
        }
        this.changeResponse = this.changeResponse.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.answerIds !== prevState.answerIds) {
            this.props.putResponse(this.state.questionId, this.state);
        }
    }

    changeResponse(id) {
        var newAnswerIds = [];
        newAnswerIds.push(id);
        this.setState({answerIds: newAnswerIds});
    }

    computeClass(index, answerId) {
        return (answerId === this.state.answerIds[0]) ? selected : normal
    }

    render() {
        
        return (
            <div className="border-0">
                <Question question={this.props.question} theme={this.props.theme} mode={this.props.mode}/>
                <div className="border-top border-right border-left border-regular">
                    {
                    this.props.answers.map(a => {
                        return (
                            <div key={a.answerId}
                                className={(a.answerId === this.state.answerIds[0]) ? selected : normal}
                                onClick={() => this.changeResponse(a.answerId)}>
                                <AnswerMcqSingle
                                    questionId={this.state.questionId}
                                    answerId={a.answerId}
                                    answer={a.answer}
                                    resource={a.resourceDomain}
                                    changeResponse={this.changeResponse}
                                    isChecked={a.answerId === this.state.answerIds[0]} />
                            </div>);
                    })
                }
                </div>
                
            </div>
        );
    }
};

McqSingle.propTypes = propTypes;
