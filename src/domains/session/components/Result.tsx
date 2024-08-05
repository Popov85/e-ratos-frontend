import React from 'react';
import {FinishInfo} from "../types/FinishInfo";
import Passed from "./Passed";
import TimeOut from "./TimeOut";

type Props = {
    result: FinishInfo
}

const Result: React.FC<Props> = ({result: {user, scheme, passed, timeouted, percent, grade, timeSpent, points}}) => {

    const renderScore = () => {
        if (!percent) return null;
        return (
            <div className="row mb-1">
                <div className="col-4">
                    <div className="text-secondary">score:</div>
                </div>
                <div className="col-8">
                    <div className="alert-sm alert-info text-center">{percent + "%"}</div>
                </div>
            </div>
        );
    }

    const renderGrade = () => {
        if (!grade) return null;
        return (
            <div className="row mb-1">
                <div className="col-4">
                    <div className="text-secondary">grade:</div>
                </div>
                <div className="col-8">
                    <div className="alert-sm alert-info text-center">{grade}</div>
                </div>
            </div>);
    }

    const renderTime = () => {
        if (!timeSpent) return null;
        return (
            <div className="row mb-1">
                <div className="col-4">
                    <div className="text-secondary">spent:</div>
                </div>
                <div className="col-8">
                    <div className="alert-sm alert-info text-center">{timeSpent}</div>
                </div>
            </div>);
    }

    const renderPoints = () => {
        if (!points) return null;
        return (
            <div className="row">
                <div className="col-4">
                    <div className="text-secondary">points:</div>
                </div>
                <div className="col-8">
                    <div className="alert-sm alert-info text-center">{points}</div>
                </div>
            </div>);
    }

    return (
        <div className="container-fluid">
            <div className="row pt-3">
                <div className="col-1 col-sm-2 col-md-3 col-lg-4"/>
                <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                    <div className="row mb-1 text-center">
                        <div className="col-12">
                            <Passed isPassed={passed}/>
                        </div>
                    </div>
                    <TimeOut timeouted={timeouted}/>
                    <div className="bg-light">
                        <div className="row mb-1">
                            <div className="col-4">
                                <div className="text-secondary">name:</div>
                            </div>
                            <div className="col-8">
                                <div className="alert-sm alert-info">{user}</div>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-4">
                                <div className="text-secondary">scheme:</div>
                            </div>
                            <div className="col-8">
                                <div className="alert-sm alert-info">{scheme}</div>
                            </div>
                        </div>
                        {renderScore()}
                        {renderGrade()}
                        {renderTime()}
                        {renderPoints()}
                    </div>
                </div>
                <div className="col-1 col-sm-2 col-md-3 col-lg-4"/>
            </div>
        </div>
    );
}

export default Result;