import React from 'react';
import PropTypes from 'prop-types';
import McqMultiPreviewComponent from "../../session/components/questions/McqMultiPreviewComponent";
import McqSinglePreviewComponent from "../../session/components/questions/McqSinglePreviewComponent";

const PreviewMcqQuestion = props => {
    const {questionMcq} = props;

    if (questionMcq.single)
        return <McqSinglePreviewComponent question={questionMcq}/>;
    return <McqMultiPreviewComponent question={questionMcq}/>;

};

PreviewMcqQuestion.propTypes = {
    questionMcq: PropTypes.object.isRequired
};

export default PreviewMcqQuestion;