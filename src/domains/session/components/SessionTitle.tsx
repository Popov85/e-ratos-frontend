import React from 'react';
import {FaPause, FaPlay, FaPowerOff, FaSave} from "react-icons/fa";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {getCancelled, getPaused, getPreserved, getProceeded} from "../actions/sessionActions";
import {RootState} from "../../../store/rootReducer";
import {getContext, getSchemeInfo} from "../selectors/contextSelector";
import {Context} from "../types/Context";
import {getUserInfo} from "../../common/selectors/userSelector";
import {UserInfo} from "../../common/types/UserInfo";
import {SchemeInfo} from "../types/SchemeInfo";
import {getBatch} from "../selectors/sessionSelector";
import {BatchInfo} from "../types/BatchInfo";
import CountdownSession from "./CountdownSession";
import CountdownBatch from "./CountdownBatch";


const SessionTitle: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const context: Context | null = useSelector((state: RootState) => getContext(state));
    const userInfo: UserInfo | null = useSelector((state: RootState) => getUserInfo(state));
    const schemeInfo: SchemeInfo | null = useSelector((state: RootState) => getSchemeInfo(state));
    const currentBatch: BatchInfo | null = useSelector((state: RootState) => getBatch(state));
    const isPaused: boolean = useSelector((state: RootState) => state.session.session.paused);

    if (!context || !userInfo || !schemeInfo || !currentBatch) return null;

    const {isLMS, schemeId} = context;
    const {pauseable, preservable} = schemeInfo.mode;

    const renderSessionLeftTitle = () => {
        if (!!currentBatch.sessionExpiresInSec) return null;
        return (
            <span className="d-flex align-items-center">
                  {
                      pauseable ?
                          isPaused ?
                              <a href="#" className="badge badge-secondary mr-1"
                                 onClick={() => dispatch(getProceeded(schemeId, isLMS))} title="Wish to proceed?">
                                  Play&nbsp;<FaPlay color="white"/>
                              </a>
                              :
                              <a href="#" className="badge badge-secondary mr-1"
                                 onClick={() => dispatch(getPaused(schemeId, isLMS))} title="Wish to pause?">
                                  Pause&nbsp;<FaPause color="white"/>
                              </a>
                          :
                          null
                  }
                <CountdownSession/>
                <CountdownBatch/>
              </span>
        );
    }

    const renderSessionRightTitle = () => {
        const {email} = userInfo;
        return (
            <span className="d-flex align-items-center text-white">
                <strong className="mr-1 d-none d-md-inline" title="Current user">{email}</strong>
                <strong className="mr-1 d-none d-md-inline" title="Current context">{isLMS ? "|LMS" : "|non-LMS"}</strong>
                {
                    preservable ?
                        <a href="#" className="badge badge-secondary mr-1"
                           onClick={() => dispatch(getPreserved(schemeId, isLMS))} title="Wish to preserve?">
                            Preserve&nbsp;<FaSave color="white"/>
                        </a>
                        : null
                }
                <a href="#" className="badge badge-danger" onClick={() => dispatch(getCancelled(schemeId, isLMS))}
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

export default SessionTitle;