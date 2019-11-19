import React from 'react';
import {useParams} from "react-router-dom";
import ResultsViewer from "./ResultsViewer";

const UserEditManager = props => {
    let {resultId} = useParams();
    return <ResultsViewer resultId = {Number(resultId)}/>
};

export default UserEditManager;