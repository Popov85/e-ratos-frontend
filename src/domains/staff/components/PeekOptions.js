import React from 'react';
import PropTypes from 'prop-types';

const PeekOptions = props => {

    const {name, displayQuestionsLeft, displayBatchesLeft, displayCurrentScore,
        displayEffectiveScore, displayProgress, displayMotivationalMessages,
        displayResultScore, displayResultMark, displayTimeSpent, displayResultOnThemes,
        displayResultOnQuestions, staff, isDefault} = props.options;

    return (
        <div className="text-left">
            <span>Name: {name}</span><br/>
            <span>DisplayQuestionsLeft: <input type="checkbox" checked={displayQuestionsLeft} disabled/></span><br/>
            <span>DisplayBatchesLeft: <input type="checkbox" checked={displayBatchesLeft} disabled/></span><br/>
            <span>DisplayCurrentScore: <input type="checkbox" checked={displayCurrentScore} disabled/></span><br/>
            <span>DisplayEffectiveScore: <input type="checkbox" checked={displayEffectiveScore} disabled/></span><br/>
            <span>DisplayProgress: <input type="checkbox" checked={displayProgress} disabled/></span><br/>
            <span>DisplayMotivationalMessages: <input type="checkbox" checked={displayMotivationalMessages} disabled/></span><br/>
            <span>DisplayResultScore: <input type="checkbox" checked={displayResultScore} disabled/></span><br/>
            <span>DisplayResultMark: <input type="checkbox" checked={displayResultMark} disabled/></span><br/>
            <span>DisplayTimeSpent: <input type="checkbox" checked={displayTimeSpent} disabled/></span><br/>
            <span>DisplayResultOnThemes: <input type="checkbox" checked={displayResultOnThemes} disabled/></span><br/>
            <span>DisplayResultOnQuestions: <input type="checkbox" checked={displayResultOnQuestions} disabled/></span><br/>
            <span>Default: <input type="checkbox" checked={isDefault} disabled/></span><br/>
            <span>By: {staff.name+' '+staff.surname}</span><br/>
        </div>
    );
};

PeekOptions.propTypes = {
    options: PropTypes.object.isRequired
};

export default PeekOptions;
