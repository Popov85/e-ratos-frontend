import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/Failure";
import LmsEditForm from "../forms/LmsEditForm";

class LmsEdit extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearLMSState();
        const {ltiVersionsForSelect} = this.props;
        if (!ltiVersionsForSelect || ltiVersionsForSelect.length === 1) this.props.getLtiVersions();
    }

    handleSubmit(data) {
        console.log("lmsDTO = ", data);
        !data.lmsId ?
            this.props.saveLMS(data)
            : this.props.updateLMS(data)
    }

    render() {
        const {lms} = this.props;
        const {userInfo, ltiVersionsForSelect} = this.props;
        const {isLoading, error, message} = this.props.lmsEdit;

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
                                <LmsEditForm
                                    initialValues={lms ?
                                        {
                                            lmsId: lms.lmsId,
                                            name: lms.name,
                                            key: lms.credentials.key,
                                            secret: lms.credentials.secret,
                                            versionId: lms.ltiVersion.versionId
                                        }
                                        : null
                                    }
                                    userInfo={userInfo}
                                    ltiVersions={ltiVersionsForSelect}
                                    finished={message ? true : false}
                                    disabled={isLoading}
                                    onSubmit={data => this.handleSubmit(data)}
                                />
                            </div>
                            <div className="form-group text-center mt-n2 mb-2" hidden={message ? true : false}>
                                <a href="#" className="badge badge-secondary" onClick={() => this.props.resetForm()}>
                                    Reset
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LmsEdit.propTypes = {
    userInfo: PropTypes.object.isRequired,
    lmsEdit: PropTypes.object.isRequired,
    lms: PropTypes.object, // Nullable for new objects
    ltiVersionsForSelect: PropTypes.array, // Array adopted for select
    generatedClientSecret: PropTypes.string, // Only if you generated the value programmatically

    clearLMSState: PropTypes.func.isRequired,
    saveLMS: PropTypes.func.isRequired,
    updateLMS: PropTypes.func.isRequired,
    getLtiVersions: PropTypes.func.isRequired
};

export default LmsEdit;
