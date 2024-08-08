import React from 'react';
import PropTypes from 'prop-types';
import AnswerMcqSingleNoResources from "./AnswerMcqSingleNoResources";
import './Question.css';
import Question from "./Question";

const normal = "bg-normal border-bottom border-regular";
const selected = "bg-selected border-bottom border-regular";

export default class McqSinglePreviewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answerIds: [],
            expanded: false,
            fontSize: 16
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

    setExpanded() {
        this.setState(prevState => ({ expanded: !prevState.expanded }));
    }

    setFontSize() {
        this.setState(prevState => {
            let currentFontSize = prevState.fontSize;
            if (currentFontSize <= 22) {
                return { fontSize: currentFontSize + 2 };
            } else {
                return { fontSize: 16 };
            }
        });
    }


    render() {
        const {question} = this.props;
        const {answerIds} = this.state;
        return (
            <div className="border-0">
                <Question question = {question}
                          expanded = {this.state.expanded}
                          fontSize = {this.state.fontSize}
                          clearResponse={() => this.clearResponse()}
                          setExpanded={() =>this.setExpanded()}
                          setFontSize={() =>this.setFontSize()}
                />
                <div className="border-top border-right border-left border-regular">
                    {
                        question.answers.map(a => {
                            // TODO: here comes logic to add chose between resource and non-resource impl.
                            return (
                                <div key={a.answerId} onClick={() => this.changeResponse(a.answerId)}
                                    className={(a.answerId === answerIds[0]) ? selected : normal}>
                                    <AnswerMcqSingleNoResources
                                        questionId={question.questionId}
                                        answerId={a.answerId}
                                        answer={a.answer}
                                        changeResponse={this.changeResponse}
                                        expanded = {this.state.expanded}
                                        fontSize = {this.state.fontSize}
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
    question: PropTypes.object.isRequired
};

McqSinglePreviewComponent.propTypes = propTypes;


