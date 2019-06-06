import React from 'react';
import AnswerMcqMulti from './AnswerMcqMulti';
import PropTypes from 'prop-types';
import Question from './Question';

const propTypes = {
    answers: PropTypes.array,
    putResponse: PropTypes.func
};

export default class McqMulti extends Question {
    constructor(props) {
        super(props);
        this.state = {
            className: 'ua.edu.ratos.service.domain.response.ResponseMCQ',
            answerIds: []
        }
        this.addResponse = this.addResponse.bind(this);
        this.removeResponse = this.removeResponse.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.answerIds !== prevState.answerIds) {
            this.props.putResponse(this.state.questionId, this.state);
        }
    }

    addResponse(id) {
        var newArray = this.state.answerIds.slice();
        newArray.push(id);
        this.setState({ answerIds: newArray });
    }

    removeResponse(id) {
        var newArray = this.state.answerIds.slice();
        var pos = newArray.indexOf(id);
        newArray.splice(pos, 1);
        this.setState({ answerIds: newArray });
    }

    render() {
        return (
            <div className = "border-0">
                  <Question question={this.props.question} theme={this.props.theme} mode={this.props.mode}/>
                <div className="border-top border-right border-left border-regular">
                    {
                        this.props.answers.map(a => {
                            return (<AnswerMcqMulti
                                key={a.answerId}
                                answerId={a.answerId}
                                answer={a.answer}
                                resource={a.resourceDomain}
                                addResponse={this.addResponse}
                                removeResponse={this.removeResponse} />);
                        })
                    }
                </div>

            </div>
        );
    }
};

McqMulti.propTypes = propTypes;
