import React from 'react';
import PropTypes from 'prop-types';
import Failure from "../../common/components/Failure";
import HelpEditForm from "../forms/HelpEditForm";
import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

let options = {
    defaultBlockTag: null,
};

class HelpEdit extends React.Component {

    componentDidMount() {
        //Clear all previous messages
        this.props.clearHelpState();
    }

    handleSubmit(data) {
        const {help} = data;
        data.help = (help instanceof Object)
            ? stateToHTML(convertFromRaw(help), options) : help;
        //console.log("help = ", data);
        !data.helpId ?
            this.props.saveHelp(data)
            : this.props.updateHelp(data)
    }

    render() {
        const {authorization, help} = this.props;
        const {isLoading, error, message} = this.props.helpEdit;

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
                                <HelpEditForm
                                    initialValues={help ?
                                        {
                                            helpId: help.helpId,
                                            name: help.name,
                                            help: help.help
                                        }
                                        : null
                                    }
                                    finished={!!message}
                                    disabled={isLoading}
                                    onSubmit={data => this.handleSubmit(data)}
                                />
                            </div>
                            <div className="form-group text-center mt-n2 mb-2" hidden={!!message}>
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

HelpEdit.propTypes = {
    authorization: PropTypes.object.isRequired,
    helpEdit: PropTypes.object.isRequired,
    help: PropTypes.object, // Nullable for new objects

    clearHelpState: PropTypes.func.isRequired,
    saveHelp: PropTypes.func.isRequired,
    updateHelp: PropTypes.func.isRequired
};

export default HelpEdit;
