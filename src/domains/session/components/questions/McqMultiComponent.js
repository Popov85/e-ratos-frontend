import React from 'react';
import PropTypes from 'prop-types';
import './Question.css';
import AnswerMcqMultiNoResources from "./AnswerMcqMultiNoResources";
import QuestionContainer from "../../containers/questions/QuestionContainer";

const normal = "bg-normal border-bottom border-regular";
const selected = "bg-selected border-bottom border-regular";

export default class McqMultiComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionId: this.props.question.questionId,
            className: 'ua.edu.ratos.service.domain.response.ResponseMCQ',
            answerIds: this.props.answerIds
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {questionId, answerIds} = this.state;
        if (answerIds !== prevState.answerIds) {
            this.props.putResponse(questionId, this.state);
        }
    }

    changeResponse(id) {
        if (this.state.answerIds.includes(id)) {
            this.removeResponse(id);
        } else {
            this.addResponse(id);
        }
    }

    addResponse(id) {
        let newArray = this.state.answerIds.slice();
        newArray.push(id);
        this.setState({answerIds: newArray});
    }

    removeResponse(id) {
        let newArray = this.state.answerIds.slice();
        let pos = newArray.indexOf(id);
        newArray.splice(pos, 1);
        this.setState({answerIds: newArray});
    }

    clearResponse() {
        this.setState({answerIds: []});
    }

    render() {
        const {question, expanded, fontSize} = this.props;
        const {answerIds} = this.state;
        const {questionId} = this.state;
        return (
            <div className="border-0">
                <QuestionContainer clearResponse={() => this.clearResponse()}/>
                <div className="border-top border-right border-left border-regular">
                    {
                        question.answers.map(a => {
                            // TODO: here comes logic to add chose between resource and non-resource impl.
                            return (
                                <div key={a.answerId} onClick={() => this.changeResponse(a.answerId)}
                                     className={(answerIds.includes(a.answerId)) ? selected : normal}>
                                    <AnswerMcqMultiNoResources
                                        questionId = {questionId}
                                        answerId={a.answerId}
                                        answer={a.answer}
                                        expanded={expanded}
                                        fontSize = {fontSize}
                                        changeResponse={() => this.changeResponse(a.answerId)}
                                        isChecked={answerIds.includes(a.answerId)}/>
                                </div>);
                        })
                    }
                </div>
            </div>
        );
    }
};

const propTypes = {
    question: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,
    fontSize: PropTypes.number.isRequired,
    answerIds: PropTypes.array,

    putResponse: PropTypes.func.isRequired
};

McqMultiComponent.propTypes = propTypes;
