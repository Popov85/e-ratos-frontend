import React from 'react';
import PropTypes from 'prop-types';

const PeekSettings = props => {

    const {name, secondsPerQuestion, questionsPerSheet, daysKeepResultDetails, strictControlTimePerQuestion, level2Coefficient, level3Coefficient, staff, isDefault} = props.settings;

    return (
        <div className="text-left">
            <span>Name: {name}</span><br/>
            <span>SecondsPerQuestion: {secondsPerQuestion}</span><br/>
            <span>QuestionPerSheet: {questionsPerSheet}</span><br/>
            <span>DaysKeepResultDetails: {daysKeepResultDetails}</span><br/>
            <span>Level2Coefficient: {level2Coefficient}</span><br/>
            <span>Level3Coefficient: {level3Coefficient}</span><br/>
            <span>StrictControlTimePerQuestion: <input type="checkbox" checked={strictControlTimePerQuestion} disabled/></span><br/>
            <span>Default: <input type="checkbox" checked={isDefault} disabled/></span><br/>
            <span>By: {staff.name+' '+staff.surname}</span><br/>
        </div>
    );
};

PeekSettings.propTypes = {
    settings: PropTypes.object.isRequired
};

export default PeekSettings;