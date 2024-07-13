import React from 'react';
import PropTypes from 'prop-types';
import CountdownSessionContainer from "../containers/CountdownSessionContainer";
import CountdownBatchContainer from "../containers/CountdownBatchContainer";
import {FaPause, FaPlay, FaPowerOff, FaSave} from "react-icons/fa";

const SessionTitle = props => {

    const {isLMS, schemeId} = props.context;
    const {pauseable, preservable} = props.schemeInfo.mode;

    const renderSessionLeftTitle = () => {
        if (!props.isTimeLimited) return null;
        return (
            <span className="d-flex align-items-center">
                  {
                      pauseable ?
                          props.isPaused ?
                              <a href="#" className="badge badge-secondary mr-1"
                                 onClick={() => props.getProceeded(schemeId, isLMS)} title="Wish to proceed?">
                                  Play&nbsp;<FaPlay color="white"/>
                              </a>
                              :
                              <a href="#" className="badge badge-secondary mr-1"
                                 onClick={() => props.getPaused(schemeId, isLMS)} title="Wish to pause?">
                                  Pause&nbsp;<FaPause color="white"/>
                              </a>
                          :
                          null
                  }
                <CountdownSessionContainer/>
                <CountdownBatchContainer/>
              </span>
        );
    }

    const renderSessionRightTitle = () => {
        const {email} = props.userInfo;
        return (
            <span className="d-flex align-items-center text-white">
                <strong className="mr-1 d-none d-md-inline" title="Current user">{email}</strong>
                <strong className="mr-1 d-none d-md-inline" title="Current context">{isLMS ? "|LMS" : "|non-LMS"}</strong>
                {
                    preservable ?
                        <a href="#" className="badge badge-secondary mr-1"
                           onClick={() => props.getPreserved(schemeId, isLMS)} title="Wish to preserve?">
                            Preserve&nbsp;<FaSave color="white"/>
                        </a>
                        : null
                }
                <a href="#" className="badge badge-danger" onClick={() => props.getCancelled(schemeId, isLMS)}
                   title="Wish to cancel?">
                    Cancel&nbsp;<FaPowerOff color="white"/>
                </a>
            </span>);
    }

    return (
        <div className="bg-info p-0 text-secondary border d-flex align-items-center justify-content-between">
            {renderSessionLeftTitle()}
            {renderSessionRightTitle()}
        </div>
    );
};

SessionTitle.propTypes = {
    userInfo: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    schemeInfo: PropTypes.object.isRequired,
    isPaused: PropTypes.bool.isRequired,
    isTimeLimited: PropTypes.bool.isRequired,

    getCancelled: PropTypes.func,
    getPreserved: PropTypes.func,
    getPaused: PropTypes.func,
    getProceeded: PropTypes.func
};

export default SessionTitle;