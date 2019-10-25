import React from 'react';
import PropTypes from 'prop-types';
import Passed from "./Passed";
import TimeOut from "./TimeOut";

const Result = (props) => {

    const {user, scheme, passed, timeouted, percent, grade, timeSpent, points} = props.result;

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
        <div className="row pt-5">
            <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4"/>
            <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4">
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
            <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4"/>
        </div>);
}

const propTypes = {
    result: PropTypes.object.isRequired
};

Result.propTypes = propTypes;

export default Result;