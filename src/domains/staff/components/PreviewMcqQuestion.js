import React from 'react';
import PropTypes from 'prop-types';
import McqSinglePreview from "../../session/components/questions/McqSinglePreview";
import McqMultiPreview from "../../session/components/questions/McqMultiPreview";


const PreviewMcqQuestion = props => {
    const {questionMcq} = props;

    if (questionMcq.single)
        return <McqSinglePreview question={questionMcq}/>;
    return <McqMultiPreview question={questionMcq}/>;

};

PreviewMcqQuestion.propTypes = {
    questionMcq: PropTypes.object.isRequired
};

export default PreviewMcqQuestion;