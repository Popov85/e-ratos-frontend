import React from 'react';
import {useParams} from "react-router-dom";
import ResultsViewerContainer from "../containers/ResultsViewerContainer";

const ResultsViewerManager = props => {
    let {resultId} = useParams();
    return <ResultsViewerContainer resultId = {Number(resultId)}/>
};

export default ResultsViewerManager;