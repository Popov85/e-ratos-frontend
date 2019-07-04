import React from 'react';
import PropTypes from 'prop-types';
import Passed from "./Passed";
import Point from "./Point";
import TimeOut from "./TimeOut";

const Result = props => {
    const { user, scheme, passed, percent, grade, points, isTimeouted } = props.result;
    return (
        <div className="row pt-5">
            <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4" />
            <div className="col-xs-10 col-sm-8 col-md-6 col-lg-4">

                <div className="row mb-1 text-center">
                    <div className="col-12">
                        <Passed isPassed={passed} />
                    </div>
                </div>

                <TimeOut isTimeouted={isTimeouted}/>

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

                    <div className="row mb-1">
                        <div className="col-4">
                            <div className="text-secondary">percent:</div>
                        </div>
                        <div className="col-8">
                            <div className="alert-sm alert-info text-center">{percent.toFixed(1)+"%"}</div>
                        </div>
                    </div>

                    <div className="row mb-1">
                        <div className="col-4">
                            <div className="text-secondary">grade:</div>
                        </div>
                        <div className="col-8">
                            <div className="alert-sm alert-info text-center">{grade}</div>
                        </div>
                    </div>

                    <Point points={points}/>
                
                </div>

            </div>
            <div className="col-xs-1 col-sm-2 col-md-3 col-lg-4"/>
        </div>)
};

Result.propTypes = {
    result: PropTypes.object.isRequired
};

export default Result;