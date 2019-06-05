import React from 'react';
import AnswerMcqSingle from './AnswerMcqSingle';
import PropTypes from 'prop-types';
import Question from './Question';

const propTypes = {
    answers: PropTypes.array,
    putResponse: PropTypes.func
};

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
        this.setState({
            answerIds: newAnswerIds
        });
    }

    render() {
        const normal = "bg-info border border-dark";
        const selected = "bg-secondary border border-dark";
        return (
            <div className = "border">
                <Question
                    question={this.props.question}
                    theme={this.props.theme}
                    mode={this.props.mode}/>
                <div>
                    {
                        this.props.answers.map(a => {
                            return (
                            <div key={a.answerId} onClick={() => this.changeResponse(a.answerId)}>
                                <AnswerMcqSingle
                                questionId = {this.state.questionId}
                                answerId={a.answerId}
                                answer={a.answer}
                                resource={a.resourceDomain}
                                highlighting = {(a.answerId === this.state.answerIds[0]) ? normal : selected}
                                changeResponse={this.changeResponse}/>
                            </div>);
                        })
                    }
                </div>

            </div>
        );
    }
};

McqSingle.propTypes = propTypes;
