import React from 'react';

const TimeOut: React.FC<{ timeouted: boolean }> = ({timeouted = false}) => {
    if (!timeouted) return null;
    return (
        <div className="row mb-1">
            <div className="col-12">
                <div className="alert-sm alert-warning text-center">Time-outed!</div>
            </div>
        </div>);
};

export default TimeOut;