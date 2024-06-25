import React from 'react';
import PropTypes from 'prop-types';

const PeekFree = props => {

    const {name, minValue, passValue, maxValue, staff, isDefault} = props.grading;

    return (
        <div className="text-left">
            <span>Name: {name}</span><br/>
            <span>Min value: {minValue}</span><br/>
            <span>Pass value: {passValue}</span><br/>
            <span>Max value: {maxValue}</span><br/>
            <span>Default: <input type="checkbox" checked={isDefault} disabled/></span><br/>
            <span>By: {staff.name+' '+staff.surname}</span><br/>
        </div>
    );
};

PeekFree.propTypes = {
    grading: PropTypes.object.isRequired
};

export default PeekFree;