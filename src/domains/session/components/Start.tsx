import React from 'react';
import {FaRocket} from 'react-icons/fa';
import Logo from '../../common/components/Logo';
import Failure from '../../common/components/Failure';
import Header from "../../common/components/Header";
// @ts-ignore
import SessionContainer from "../containers/SessionContainer";
// @ts-ignore
import OpenedContainer from "../containers/OpenedContainer";
// @ts-ignore
import FinishContainer from "../containers/FinishContainer";
// @ts-ignore
import CancelledContainer from "../containers/CancelledContainer";
// @ts-ignore
import RunOutOfTimeContainer from "../containers/RunOutOfTimeContainer";
// @ts-ignore
import PreservedContainer from "../containers/PreservedContainer";
// @ts-ignore
import NotFoundContainer from "../containers/NotFoundContainer";
import '../../../../main.css';
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {getStarted} from "../actions/sessionActions";
import {getContext, getSchemeInfo} from "../selectors/contextSelector";
import {Context} from "../types/Context";
import {SchemeInfo} from "../types/SchemeInfo";
import {SessionErrorsEnum} from "../types/SessionErrorsEnum";
import {SessionStatesEnum} from "../types/SessionStatesEnum";
import StartNavbar from "./StartNavbar";


const Start: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    // At this point context is fully loaded and available!
    const context: Context = useSelector((state: RootState) => getContext(state)) as Context;
    // At this point scheme info is fully loaded and present!
    const schemeInfo: SchemeInfo = useSelector((state: RootState) => getSchemeInfo(state)) as SchemeInfo;
    const session = useSelector((state: RootState) => state.session.session);
    const failure = useSelector((state: RootState) => state.session.failure);

    const {schemeId, isLMS} = context;


    const renderStart = () => {
        const {active} = schemeInfo;
        const {isLoaded} = session;
        if (!isLoaded)
            return (
                <div className="text-center mt-3">
                    <button className="btn btn-info pl-5 pr-5" type="button" disabled>
                        Start <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>
                    </button>
                </div>
            );
        if (!active)
            return (
                <div className="text-center mt-3">
                    <button className="btn btn-info pl-5 pr-5" type="button" disabled>
                        Start
                    </button>
                </div>
            );
        return (
            <div className="text-center mt-3">
                <button className="btn btn-info pl-5 pr-5" onClick={() => dispatch(getStarted(schemeId, isLMS))}>
                    Start&nbsp;<FaRocket color="white"/>
                </button>
            </div>);
    }

    const renderFailure = () => {
        return (
            <div>
                <StartNavbar/>
                <div className="mt-3 mb-2"><Logo/></div>
                <Failure message={"Some failure: probably scheme is NOT available any more!"}/>
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <button className="btn btn-info pl-5 pr-5"
                                onClick={() => dispatch(getStarted(schemeId, isLMS))}>
                            Re-try <FaRocket/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Fail-safe protection.
    if (!context || !schemeInfo) return null;

    if (failure.type === SessionErrorsEnum.Opened) return <OpenedContainer/>;
    if (failure.type === SessionErrorsEnum.NotFound) return <NotFoundContainer/>
    if (failure.type === SessionErrorsEnum.RunOutOfTime) return <RunOutOfTimeContainer/>
    if (failure.is && failure.location === "start") return renderFailure();

    const {status} = session;

    if (status === SessionStatesEnum.Started) return <SessionContainer/>;
    if (status === SessionStatesEnum.Finished) return <FinishContainer/>;
    if (status === SessionStatesEnum.Cancelled) return <CancelledContainer/>;
    if (status === SessionStatesEnum.Preserved) return <PreservedContainer/>;

    return (
        <div className="container-fluid p-0">
            <StartNavbar/>
            <div>
                <div className="mb-2"><Logo/></div>
                {
                    schemeInfo?.active ? (
                        <Header
                            title="WELCOME"
                            color="alert-success"
                        />
                    ) : (
                        <Header
                            title="REQUESTED SCHEME IS NOT AVAILABLE"
                            color="alert-danger"
                        />
                    )
                }
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
                                         title="How many seconds per question you have">{(schemeInfo.timings <= 0) ? "unlimited" : (schemeInfo.timings + " s per question")}</div>
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
                                    <div className="text-secondary">mode:</div>
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

export default Start;