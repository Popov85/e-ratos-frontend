import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/components/Failure";
import QuestionMcqUploadDropBox from "./QuestionMcqUploadDropBox";

class QuestionsMcqUpload extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearQuestionMcqState();
    }

    handleSubmit(file, confirmed) {
        const {themeId} = this.props;
        this.props.saveQuestionsMcqFromFile(file, themeId, confirmed);
    }

    render() {
        const {userInfo} = this.props;
        const {isLoading, error, message, report} = this.props.questionMcqEdit;

        return (
            <div>
                <div className="row mt-1">
                    <div className="col-12">
                        {
                            isLoading &&
                            <div className="text-center text-secondary m-2">
                                <span>Saving...</span>
                            </div>
                        }
                        {
                            error &&
                            <div className="alert alert-danger text-center p-1" role="alert">
                                <span className="text-danger">
                                    <strong>
                                    <Failure message={error.message}/>
                                </strong>
                                </span>
                            </div>
                        }
                        {
                            message &&
                            <div className="alert alert-success text-center p-1" role="success">
                                <span className="text-success"><strong>{message}</strong></span>
                            </div>
                        }
                        <div className="card bg-transparent">
                            <div className="card-body">
                                <QuestionMcqUploadDropBox
                                    report = {report}
                                    disabled={isLoading}
                                    finished={message ? true : false}
                                    clearQuestionMcqState = {this.props.clearQuestionMcqState}
                                    onSubmit={(data, confirmed) => this.handleSubmit(data, confirmed)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

QuestionsMcqUpload.propTypes = {
    userInfo: PropTypes.object.isRequired,
    themeId: PropTypes.number.isRequired, // The selected themeId whose questions will be edited
    questionMcqEdit: PropTypes.object.isRequired,

    clearQuestionMcqState: PropTypes.func.isRequired,
    saveQuestionsMcqFromFile: PropTypes.func.isRequired,
};

export default QuestionsMcqUpload;
