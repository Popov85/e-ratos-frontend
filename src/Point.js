import React from 'react';
import PropTypes from 'prop-types';

const Point = props => {
    if (!props.points) return null;
    return (
        <div className="row">
            <div className="col-4">
                <div className="text-secondary">points:</div>
            </div>
            <div className="col-8">
                <div className="alert-sm alert-info text-center">{props.points}</div>
            </div>
        </div>);
};

Point.propTypes = {
    points: PropTypes.number
};

export default Point;