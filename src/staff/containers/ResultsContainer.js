import React from 'react';
import {connect} from "react-redux";
import Results from "../components/Results";
import {getDepResults, getDepResultsWithSpec} from "../actions/resultsActions";

const mapStateToProps = state => {
    return {
        courses: state.courses,
        results: state.results,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDepResults: (params) => dispatch(getDepResults(params)),
        getDepResultsWithSpecs: (params, specs) => dispatch(getDepResultsWithSpec(params, specs))
    }
}

const ResultsContainer = connect(mapStateToProps, mapDispatchToProps)(Results);

export default ResultsContainer;