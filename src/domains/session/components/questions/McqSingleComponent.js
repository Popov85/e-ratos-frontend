import React from 'react';
import PropTypes from 'prop-types';
import AnswerMcqSingleNoResources from "./AnswerMcqSingleNoResources";
import './Question.css';
import QuestionContainer from "../../containers/questions/QuestionContainer";

const normal = "bg-normal border-bottom border-regular";
const selected = "bg-selected border-bottom border-regular";

export default class McqSingleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionId: this.props.question.questionId,
            className: 'ua.edu.ratos.service.domain.response.ResponseMCQ',
            answerIds: this.props.answerIds
        }
        this.changeResponse = this.changeResponse.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {questionId, answerIds} = this.state;
        if (answerIds !== prevState.answerIds) {
            this.props.putResponse(questionId, this.state);
        }
    }

    changeResponse(id) {
        let newAnswerIds = [];
        newAnswerIds.push(id);
        this.setState({ answerIds: newAnswerIds });
    }

    clearResponse() {
        this.setState({ answerIds: [] });
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
                                    className={(a.answerId === answerIds[0]) ? selected : normal}>
                                    <AnswerMcqSingleNoResources
                                        questionId={questionId}
                                        answerId={a.answerId}
                                        answer={a.answer}
                                        changeResponse={this.changeResponse}
                                        expanded = {expanded}
                                        fontSize = {fontSize}
                                        isChecked={a.answerId === answerIds[0]} />
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

    putResponse: PropTypes.func.isRequired,
};

McqSingleComponent.propTypes = propTypes;


