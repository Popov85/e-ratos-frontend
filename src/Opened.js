import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Header from "./Header";
import Cancelled from './Cancelled';
import Finish from "./Finish";
import Batch from './Batch';
import Spinner from './Spinner';
import Failure from './Failure';
import ApiBatch from './ApiBatch';
import NotFound from './NotFound';
import RunOutOfTime from "./RunOutOfTime";
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

    // TODO: make a separate component!
    reTryCancelAPICall() {
        this.setState({ isLoaded: false, error: null, serverError : null });
        const { lms, schemeInfo } = this.props;
        ApiBatch.cancel(schemeInfo.schemeId, lms)
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
        this.setState({ isLoaded: false, error: null, serverError : null });
        const { lms, schemeInfo } = this.props;
        ApiBatch.current(schemeInfo.schemeId, lms)
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
        const { schemeInfo } = this.props
        return <Cancelled
            schemeId={schemeInfo.schemeId}
            result={this.state.result} />;
    }

    renderContinue() {
        const { schemeInfo } = this.props
        return <Batch
            schemeInfo={schemeInfo}
            batch={this.state.batch} />;
    }

    renderFinish() {
        const { schemeInfo } = this.props
        return <Finish
            schemeId={schemeInfo.schemeId}
            result={this.state.result}
            mode={schemeInfo.mode}
            settings={schemeInfo.settings} />;
    }

    renderButtons() {
        return (
            <div className="row text-center mt-3">
                <div className="col-12">
                    <button className="btn btn-secondary mr-1" onClick={() => this.reTryCancelAPICall()} title="Cancel the opened session and then return to the requested one!">Finish>></button>
                    <button className="btn btn-secondary" onClick={() => this.reTryCurrentAPICall()} title="Continue the opened session">Continue>></button>
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
        const {lms, schemeInfo} = this.props;
        const { isLoaded, isClosed, isContinued, isFinished, isRunOutOfTime, isNotFound, error, serverError } = this.state;
        if (!isLoaded) return <Spinner message="Waiting..." />;
        if (isNotFound) return <NotFound schemeId={schemeInfo.schemeId} />
        if (isRunOutOfTime) return <RunOutOfTime lms = {lms} schemeInfo={schemeInfo}/>
        if (isClosed) return this.renderCancelled();
        if (isContinued) return this.renderContinue();
        if (isFinished) return this.renderFinish();
        return (
            <div className="mt-1">
                <Logo />
                <Header title="PREVIOUS IS OPENED" color="alert-warning" />
                {(error) ? <Failure
                    message={error.message}
                    serverError={serverError} /> : null}
                {this.renderButtons()}
            </div>);
    }
}

Opened.propTypes = {
    lms: PropTypes.bool.isRequired,
    schemeInfo: PropTypes.object.isRequired
};

export default Opened;