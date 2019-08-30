import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogoMini from './LogoMini';
import Header from "./Header";
import Cancelled from './Cancelled';
import Finish from "./Finish";
import Batch from './Batch';
import Spinner from './Spinner';
import Failure from './Failure';
import ApiBatch from './ApiBatch';
import NotFound from './NotFound';
import RunOutOfTime from "./RunOutOfTime";
import { FaPowerOff, FaStepForward } from 'react-icons/fa';

import { processError } from './Error';

class Opened extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isClosed: false,
            isContinued: false,
            isFinished: false,
            isNotFound: false,
            isRunOutOfTime: false,

            result: null,
            batch: null,

            isLoaded: true,
            error: null,
            serverError: null
        }
    }

    reTryCancelAPICall() {
        this.setState({ isLoaded: false, error: null, serverError: null });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.cancel(schemeInfo.schemeId, panelInfo.lms)
            .then(result => {
                this.setState({
                    result,
                    isClosed: true
                });
            }).catch(e => {
                processError(e, "Failed to perform 'cancel' API call", this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    reTryCurrentAPICall() {
        this.setState({ isLoaded: false, error: null, serverError: null });
        const { panelInfo, schemeInfo } = this.props;
        ApiBatch.current(schemeInfo.schemeId, panelInfo.lms)
            .then(batch => {
                this.setState({
                    batch,
                    isContinued: true
                });
            }).catch(e => {
                processError(e, "Failed to perform 'current' API call", this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    renderCancelled() {
        const { panelInfo, schemeInfo } = this.props
        return <Cancelled
            panelInfo={panelInfo}
            schemeInfo={schemeInfo}
            result={this.state.result} />;
    }

    renderContinue() {
        const { panelInfo, schemeInfo } = this.props
        return <Batch
            panelInfo={panelInfo}
            schemeInfo={schemeInfo}
            batch={this.state.batch} />;
    }

    renderFinish() {
        const { panelInfo, schemeInfo } = this.props
        return <Finish
            panelInfo={panelInfo}
            schemeInfo={schemeInfo}
            result={this.state.result} />;
    }

    renderButtons() {
        return (
            <div className="row text-center mt-3">
                <div className="col-12">
                    <button className="btn btn-secondary mr-1"
                        onClick={() => this.reTryCancelAPICall()}
                        title="Cancel the opened session and then return to the requested one!">
                        Finish&nbsp;<FaPowerOff color="white" />
                    </button>
                    <button className="btn btn-secondary"
                        onClick={() => this.reTryCurrentAPICall()}
                        title="Continue the opened session">
                        Continue&nbsp;<FaStepForward color="white" />
                    </button>
                </div>
            </div>
        );
    }

    renderFailure() {
        return (
            <div>
                <Failure
                    message={this.state.error.message}
                    serverError={this.state.serverError} />
                {this.renderButtons()}
            </div>
        );
    }

    render() {
        const { panelInfo, schemeInfo } = this.props;
        const { isLoaded, isClosed, isContinued, isFinished, isRunOutOfTime, isNotFound, error, serverError } = this.state;
        if (!isLoaded)
            return (<div>
                <LogoMini />
                <Header title="PREVIOUS SESSION IS OPENED" color="alert-warning" />
                <Spinner message="Waiting..." />
            </div>);
        if (isNotFound) return <NotFound panelInfo={panelInfo} schemeInfo={schemeInfo} />
        if (isRunOutOfTime) return <RunOutOfTime panelInfo={panelInfo} schemeInfo={schemeInfo} />
        if (isClosed) return this.renderCancelled();
        if (isContinued) return this.renderContinue();
        if (isFinished) return this.renderFinish();
        return (
            <div className="mt-1">
                <LogoMini />
                <Header title="PREVIOUS SESSION IS OPENED" color="alert-warning" />
                {error ? <Failure
                    message={error.message}
                    serverError={serverError} /> : null}
                {this.renderButtons()}
            </div>);
    }
}

Opened.propTypes = {
    panelInfo: PropTypes.object.isRequired,
    schemeInfo: PropTypes.object.isRequired
};

export default Opened;