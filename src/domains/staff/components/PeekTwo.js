import React from 'react';
import PropTypes from 'prop-types';

const PeekTwo = props => {

    const {name, threshold, staff, isDefault} = props.grading;

    return (
        <div className="text-left">
            <span>Name: {name}</span><br/>
            <span>Threshold: {threshold}</span><br/>
            <span>Default: <input type="checkbox" checked={isDefault} disabled/></span><br/>
            <span>By: {staff.name+' '+staff.surname}</span><br/>
        </div>
    );
};

PeekTwo.propTypes = {
    grading: PropTypes.object.isRequired
};

export default PeekTwo;