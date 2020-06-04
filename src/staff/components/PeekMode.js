import React from 'react';
import PropTypes from 'prop-types';

const PeekMode = props => {

    const {name, helpable, pyramid, skipable, rightAnswer, preservable, reportable, starrable, staff, isDefault} = props.mode;

    return (
        <div className="text-left">
            <span>Name: {name}</span><br/>
            <span>Helpable: <input type="checkbox" checked={helpable} disabled/></span><br/>
            <span>Pyramid: <input type="checkbox" checked={pyramid} disabled/></span><br/>
            <span>Skipable: <input type="checkbox" checked={skipable} disabled/></span><br/>
            <span>Right answer: <input type="checkbox" checked={rightAnswer} disabled/></span><br/>
            <span>Preservable: <input type="checkbox" checked={preservable} disabled/></span><br/>
            <span>Reportable: <input type="checkbox" checked={reportable} disabled/></span><br/>
            <span>Starrable: <input type="checkbox" checked={starrable} disabled/></span><br/>
            <span>Default: <input type="checkbox" checked={isDefault} disabled/></span><br/>
            <span>By: {staff.name+' '+staff.surname}</span><br/>
        </div>
    );
};

PeekMode.propTypes = {
    mode: PropTypes.object.isRequired
};

export default PeekMode;