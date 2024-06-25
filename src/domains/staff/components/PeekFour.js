import React from 'react';
import PropTypes from 'prop-types';

const PeekFour = props => {

    const {name, threshold3, threshold4, threshold5, staff, isDefault} = props.grading;

    return (
        <div className="text-left">
            <span>Name: {name}</span><br/>
            <span>Threshold3: {threshold3}</span><br/>
            <span>Threshold4: {threshold4}</span><br/>
            <span>Threshold5: {threshold5}</span><br/>
            <span>Default: <input type="checkbox" checked={isDefault} disabled/></span><br/>
            <span>By: {staff.name+' '+staff.surname}</span><br/>
        </div>
    );
};

PeekFour.propTypes = {
    grading: PropTypes.object.isRequired
};

export default PeekFour;