import React from 'react';
import PropTypes from 'prop-types';
import './Question.css';
import AnswerMcqMultiNoResources from "./AnswerMcqMultiNoResources";
import Question from "./Question";

const normal = "bg-normal border-bottom border-regular";
const selected = "bg-selected border-bottom border-regular";

export default class McqMultiPreviewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answerIds: [],
            expanded: false,
            fontSize: 16
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
                          setFontSize={() =>this.setFontSize()}/>
                <div className="border-top border-right border-left border-regular">
                    {
                        question.answers.map(a => {
                            // TODO: here comes logic to add chose between resource and non-resource impl.
                            return (
                                <div key={a.answerId} onClick={() => this.changeResponse(a.answerId)}
                                     className={(answerIds.includes(a.answerId)) ? selected : normal}>
                                    <AnswerMcqMultiNoResources
                                        questionId = {question.questionId}
                                        answerId={a.answerId}
                                        answer={a.answer}
                                        changeResponse={() => this.changeResponse()}
                                        expanded={this.state.expanded}
                                        fontSize={this.state.fontSize}
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
    question: PropTypes.object.isRequired
};

McqMultiPreviewComponent.propTypes = propTypes;
