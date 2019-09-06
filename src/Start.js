import React from 'react';
import PropTypes from 'prop-types';
import Opened from './Opened';
import Batch from './Batch';
import Failure from './Failure';
import Logo from './Logo';
import Header from './Header';
import Login from './Login';
import InfoPanel from "./InfoPanel";
import ApiBatch from './ApiBatch';
import { processError } from './Error';
import { FaRocket } from 'react-icons/fa';


import '../main.css';

export default class Start extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Maybe session on this scheme is already opened?
            isOpened: false,

            // Is start API call already performed?
            isStarted: false,

            // Is logouted?
            isLogout: false,

            // First batch
            batch: null,

            isLoaded: true,
            error: null,
            serverError: null
        }

        this.logoutAct = this.logoutAct.bind(this);
    }

    logoutAct() {
        this.setState({ isLogout: true });
    }

    reTryStartAPICall() {
        this.setState({ isLoaded: false, error: null, serverError: null });
        ApiBatch.start(this.props.schemeInfo.schemeId, this.props.panelInfo.lms)
            .then(batch => {
                if (batch.questions.length === 0) {
                    this.setState({ error: new Error("No questions found in the scheme!") });
                } else {
                    this.setState({ batch, isStarted: true });
                }
            }).catch(e => {
                processError(e, "Failed to start a new session", this);
            }).finally(() => {
                this.setState({ isLoaded: true });
            });
    }

    renderBatch() {
        const { panelInfo, schemeInfo } = this.props;
        const { batch } = this.state;
        return <Batch
            panelInfo={panelInfo}
            schemeInfo={schemeInfo}
            batch={batch} />
    }

    renderOpened() {
        const { panelInfo, schemeInfo } = this.props;
        return <Opened
            panelInfo={panelInfo}
            schemeInfo={schemeInfo} />
    }

    renderStart() {
        const { isLoaded } = this.state;
        if (!isLoaded)
            return (
                <div className="text-center mt-3">
                    <button className="btn btn-info pl-3 pr-3" type="button" disabled>
                        Start...<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
                    </button>
                </div>
            );
        return (
            <div className="text-center mt-3">
                <button className="btn btn-info pl-3 pr-3" onClick={() => this.reTryStartAPICall()}>
                    Start&nbsp;<FaRocket color="white" />
                </button>
            </div>);
    }

    renderFailure() {
        return (
            <div className="mt-3" >
                <div className="mb-2"><Logo /></div>
                <Failure message={this.state.error.message} serverError={this.state.serverError} />
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <button className="btn btn-secondary btn-sm pl-5 pr-5" onClick={() => this.reTryStartAPICall()}>Re-try>></button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { isStarted, isOpened, isLogout, error } = this.state;
        if (isLogout) return <Login />
        if (isStarted) return this.renderBatch();
        if (isOpened) return this.renderOpened();
        if (error) return this.renderFailure();
        const { panelInfo, schemeInfo } = this.props;
        return (
            <div className="container-fluid">
                <InfoPanel
                    panelInfo={panelInfo}
                    logoutAct={this.logoutAct} />
                <div className="mb-2"><Logo /></div>
                <Header
                    title="WELCOME"
                    color="alert-success" />
                <div className="row">
                    <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
                    <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xl-4">

                        <div className="bg-light">

                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">scheme:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info" title={"Scheme ID = " + schemeInfo.schemeId}>{schemeInfo.name}</div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">questions:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info" title="The quantity of questions in this scheme you are going to answer">{schemeInfo.questions}</div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">time:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info" title="How many seconds per question you have">{(schemeInfo.timings < 0) ? "unlimited" : (schemeInfo.timings + " s per question")}</div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">batch:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info" title="Is each batch limited in time?">{schemeInfo.batchTimeLimited ? "limited" : "unlimited"}</div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">type:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info"
                                        title="Training (educational) or exam (controlling)? Training type allows skipping and pyramiding (dynamic behaviour)">
                                        {(schemeInfo.mode.skipable || schemeInfo.mode.pyramid) ? "training" : "exam"}
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">author:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info" title="The creator of the current schme">{schemeInfo.staff}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4" />
                </div>

                {this.renderStart()}

            </div>)
    }
}

const propTypes = {
    panelInfo: PropTypes.object.isRequired,
    schemeInfo: PropTypes.object.isRequired
};

Start.propTypes = propTypes;