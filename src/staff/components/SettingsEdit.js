import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/components/Failure";
import SettingsEditForm from "../forms/SettingsEditForm";

class SettingsEdit extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearSettingsState();
    }

    handleSubmit(data) {
        //console.log("Settings = ", data);
        !data.settingsId ?
            this.props.saveSettings(data)
            : this.props.updateSettings(data);
    }

    render() {
        const {settings} = this.props;
        const {isLoading, error, message} = this.props.settingsEdit;

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
                                <SettingsEditForm
                                    initialValues={settings ?
                                        {
                                            setId: settings.setId,
                                            name: settings.name,
                                            secondsPerQuestion: settings.secondsPerQuestion,
                                            questionsPerSheet: settings.questionsPerSheet,
                                            daysKeepResultDetails: settings.daysKeepResultDetails,
                                            level2Coefficient: settings.level2Coefficient,
                                            level3Coefficient: settings.level3Coefficient,
                                            strictControlTimePerQuestion: settings.strictControlTimePerQuestion
                                        }
                                        : {
                                            secondsPerQuestion: 1,
                                            questionsPerSheet: 1,
                                            daysKeepResultDetails: 10,
                                            level2Coefficient: 1,
                                            level3Coefficient: 1,
                                            strictControlTimePerQuestion: false
                                        }
                                    }
                                    isDefault={settings ? settings.isDefault : false}
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

SettingsEdit.propTypes = {
    settingsEdit: PropTypes.object.isRequired,
    settings: PropTypes.object, // Nullable for new objects

    saveSettings: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    clearSettingsState: PropTypes.func.isRequired
};

export default SettingsEdit;
