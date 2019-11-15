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
            <span
                className="text-secondary text-small d-inline-flex border align-items-center justify-content-start float-left">
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
        return (
            <span
                className="text-secondary text-small border d-inline-flex border align-items-center justify-content-start float-right">
                <span className="mr-1" title="Current user">{props.userInfo.email}</span>
                <span className="mr-1" title="Current context">{isLMS ? "|LMS" : "|non-LMS"}</span>
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
        <div>
            {renderSessionLeftTitle()}
            {renderSessionRightTitle()}
        </div>
    );
};

SessionTitle.propTypes = {
    context: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    schemeInfo: PropTypes.object.isRequired,
    isPaused: PropTypes.bool.isRequired,
    isTimeLimited: PropTypes.bool.isRequired,

    getCancelled: PropTypes.func,
    getPreserved: PropTypes.func,
    getPaused: PropTypes.func,
    getProceeded: PropTypes.func
};

export default SessionTitle;