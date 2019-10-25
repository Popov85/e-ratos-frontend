import React from 'react';
import PropTypes from 'prop-types';
import {FaRocket} from 'react-icons/fa';
import Logo from '../../common/Logo';
import Login from '../../common/Login';
import Failure from '../../common/Failure';
import Header from "../../common/Header";
import StartNavbarContainer from "../containers/StartNavbarContainer";
import SessionContainer from "../containers/SessionContainer";
import OpenedContainer from "../containers/OpenedContainer";
import FinishContainer from "../containers/FinishContainer";
import CancelledContainer from "../containers/CancelledContainer";
import RunOutOfTimeContainer from "../containers/RunOutOfTimeContainer";
import PreservedContainer from "../containers/PreservedContainer";
import NotFoundContainer from "../containers/NotFoundContainer";

import '../../../main.css';

const Start = (props) => {

    const renderStart = () => {
        const {isLoaded} = props.session;
        if (!isLoaded)
            return (
                <div className="text-center mt-3">
                    <button className="btn btn-info pl-5 pr-5" type="button" disabled>
                        Start <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>
                    </button>
                </div>
            );
        const schemeId = props.schemeInfo.schemeId;
        const isLMS = props.panelInfo.lms;
        return (
            <div className="text-center mt-3">
                <button className="btn btn-info pl-5 pr-5" onClick={() => props.getStarted(schemeId, isLMS)}>
                    Start&nbsp;<FaRocket color="white"/>
                </button>
            </div>);
    }

    const renderFailure = () => {
        const isLMS = props.panelInfo.lms;
        const schemeId = props.schemeInfo.schemeId;
        return (
            <div>
                <StartNavbarContainer/>
                <div className="mt-3 mb-2"><Logo/></div>
                <Failure message={"Some failure"}/>
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <button className="btn btn-info pl-5 pr-5" onClick={() => props.getStarted(schemeId, isLMS)}>
                            Re-try <FaRocket/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const {status} = props.session;
    const {schemeInfo, logout, failure} = props;

    if (logout) return <Login/>;

    if (failure.type === "opened") return <OpenedContainer/>;
    if (failure.type === 'notFound') return <NotFoundContainer/>
    if (failure.type === 'runOutOfTime') return <RunOutOfTimeContainer/>
    if (failure.is && failure.location === "start") return renderFailure();

    if (status === "started") return <SessionContainer/>;
    if (status === "finished") return <FinishContainer/>;
    if (status === "cancelled") return <CancelledContainer/>;
    if (status === "preserved") return <PreservedContainer/>;

    return (
        <div>
            <StartNavbarContainer/>
            <div className="container-fluid">
                <div className="mb-2"><Logo/></div>
                <Header
                    title="WELCOME"
                    color="alert-success"/>
                <div className="row">
                    <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4"/>
                    <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xl-4">
                        <div className="bg-light">
                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">scheme:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info"
                                         title={"Scheme ID = " + schemeInfo.schemeId}>{schemeInfo.name}</div>
                                </div>
                            </div>
                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">questions:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info"
                                         title="The quantity of questions in this scheme you are going to answer">{schemeInfo.questions}</div>
                                </div>
                            </div>
                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">time:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info"
                                         title="How many seconds per question you have">{(schemeInfo.timings < 0) ? "unlimited" : (schemeInfo.timings + " s per question")}</div>
                                </div>
                            </div>
                            <div className="row mb-1">
                                <div className="col-3">
                                    <div className="text-secondary">batch:</div>
                                </div>
                                <div className="col-9">
                                    <div className="alert-sm alert-info"
                                         title="Is each batch limited in time?">{schemeInfo.batchTimeLimited ? "limited" : "unlimited"}</div>
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
                                    <div className="alert-sm alert-info"
                                         title="The creator of the current scheme">{schemeInfo.staff}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4 col-xl-4"/>
                </div>
                {renderStart()}
            </div>
        </div>)
}

const propTypes = {
    panelInfo: PropTypes.object.isRequired,
    schemeInfo: PropTypes.object.isRequired,
    session: PropTypes.object,
    logout: PropTypes.bool,
    failure: PropTypes.object,

    getStarted: PropTypes.func.isRequired
};

Start.propTypes = propTypes;

export default Start;