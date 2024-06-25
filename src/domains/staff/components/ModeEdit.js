import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/components/Failure";
import ModeEditForm from "../forms/ModeEditForm";

class ModeEdit extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearModeState();
    }

    handleSubmit(data) {
        !data.modeId ?
            this.props.saveMode(data)
            : this.props.updateMode(data);
    }

    render() {
        const {mode} = this.props;
        const {isLoading, error, message} = this.props.modeEdit;

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
                                <ModeEditForm
                                    initialValues={mode ?
                                        {
                                            modeId: mode.modeId,
                                            name: mode.name,
                                            helpable: mode.helpable,
                                            pyramid: mode.pyramid,
                                            skipable: mode.skipable,
                                            rightAnswer: mode.rightAnswer,
                                            pauseable: mode.pauseable,
                                            preservable: mode.preservable,
                                            reportable: mode.reportable,
                                            starrable: mode.starrable
                                        }
                                        : null
                                    }
                                    isDefault={mode ? mode.isDefault : false}
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

ModeEdit.propTypes = {
    modeEdit: PropTypes.object.isRequired,
    mode: PropTypes.object, // Nullable for new objects

    saveMode: PropTypes.func.isRequired,
    updateMode: PropTypes.func.isRequired,
    clearModeState: PropTypes.func.isRequired
};

export default ModeEdit;
