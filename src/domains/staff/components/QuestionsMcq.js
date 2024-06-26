import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
import QuestionsMcqTable from "./QuestionsMcqTable";
import QuestionsNavbar from "./QuestionsNavbar";
import QuestionMcqEditModal from "./QuestionMcqEditModal";
import {Redirect} from "react-router-dom";
import NotFound from "../../common/components/NotFound";

class QuestionsMcq extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newMode: false,
            expanded: true
        }
        this.handleTableChange = this.handleTableChange.bind(this);
        this.activateModal = this.activateModal.bind(this);
        this.deactivateModal = this.deactivateModal.bind(this);
        this.expandedSwitch = this.expandedSwitch.bind(this);
        this.refreshQuestions = this.refreshQuestions.bind(this);
    }

    componentDidMount() {
        const {themeId, theme} = this.props;
        if (!theme) {
            this.props.getThemeById(themeId);
        }
        this.props.getAllQuestionsMcqByThemeId(themeId);
    }

    activateModal() {
        this.setState({newMode: true});
    }

    deactivateModal() {
        this.setState({newMode: false});
    }

    expandedSwitch() {
        this.setState({expanded: !this.state.expanded});
    }

    refreshQuestions() {
        const {theme} = this.props;
        this.props.getAllQuestionsMcqByThemeId(theme.themeId);
    }

    handleUpdate(questionId, dataField, newValue) {
        const {themeId} = this.props.theme;
        switch (dataField) {
            case "question": {
                this.props.updateQuestionMcqName(themeId, questionId, newValue);
                return;
            }
            case "level": {
                this.props.updateQuestionMcqLevel(themeId, questionId, newValue);
                return;
            }
            case "required": {
                this.props.updateQuestionMcqRequired(themeId, questionId, newValue);
                return;
            }
            default:
                return;
        }
    }

    handleTableChange(type, {cellEdit}) {
        if (cellEdit) {
            const {rowId, dataField, newValue} = cellEdit;
            this.handleUpdate(rowId, dataField, newValue);
        }
    }

    render() {
        const {newMode, expanded} = this.state;
        const {authorization, questionsMcq, themes, theme, questionsMcqContent} = this.props;
        const {isLoading, isUpdating, error, errorUpdate} = questionsMcq;
        if (themes && !themes.isLoading && themes.error) return <NotFound/>;
        return (
            <div className="container-fluid p-0">
                <div className="p-1">
                    <div className="alert alert-secondary text-center mb-1">
                        <h5 className="alert-heading">
                            <strong>MCQ</strong>[<a href='#' title="Switch to different types of questions">Change</a>]
                        </h5>
                        <div className="d-flex justify-content-center">
                            <h6 className="alert-heading mr-3">
                                <strong>Course: </strong> <span
                                className="badge badge-secondary"> {theme ? theme.course.name : 'Default course'}</span>
                            </h6>
                            <h6 className="alert-heading">
                                <strong>Theme: </strong> <span
                                className="badge badge-secondary"> {theme ? theme.name : 'Default theme'} </span>
                            </h6>
                        </div>

                    </div>
                    {
                        (error || errorUpdate) &&
                        <Error message="Operation failed!" close={() => this.props.clearAllQuestionsMcqFailures()}/>
                    }
                    {
                        !isLoading && questionsMcqContent &&
                        <QuestionsNavbar
                            authorization={authorization}
                            themeId={theme.themeId}
                            content={questionsMcqContent}
                            view={this.state.expanded}
                            viewChange={this.expandedSwitch}
                            addQuestions={this.activateModal}
                            refreshQuestions={this.refreshQuestions}
                        />
                    }
                    {
                        questionsMcqContent &&
                        <div className="pb-5">
                            <LoadingOverlay
                                active={!!isUpdating}
                                spinner
                                text='Performing API call...'>
                                <QuestionsMcqTable
                                    authorization={authorization}
                                    questionsMcq={questionsMcqContent}
                                    theme={theme}
                                    expanded={expanded}
                                    deleteQuestionMcq={this.props.deleteQuestionMcq}
                                    onTableChange={this.handleTableChange}
                                />
                            </LoadingOverlay>
                        </div>
                    }
                    <Overlay show={!!isLoading}/>
                    {
                        newMode &&
                        <QuestionMcqEditModal show={this.state.newMode} deactivateModal={this.deactivateModal}
                                              editableThemeId={this.props.theme.themeId}/>
                    }
                </div>
            </div>
        );
    }
}

QuestionsMcq.propTypes = {
    authorization: PropTypes.object.isRequired,
    questionsMcq: PropTypes.object.isRequired,
    themeId: PropTypes.number.isRequired,
    themes: PropTypes.object,
    theme: PropTypes.object,
    questionsMcqContent: PropTypes.array,

    getAllQuestionsMcqByThemeId: PropTypes.func.isRequired,
    clearAllQuestionsMcqFailures: PropTypes.func.isRequired,
    updateQuestionMcqName: PropTypes.func.isRequired,
    updateQuestionMcqLevel: PropTypes.func.isRequired,
    updateQuestionMcqRequired: PropTypes.func.isRequired,
    deleteQuestionMcq: PropTypes.func.isRequired
};

export default QuestionsMcq;