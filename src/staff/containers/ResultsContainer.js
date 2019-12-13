import React from 'react';
import {connect} from "react-redux";
import {
    clearLoadingFailure,
    getAllDepResultsDataForTable,
    getAllDepResultsDataForTableAdmin,
    getAllDepResultsDataForTableGlobalAdmin,
    getAllSchemesForDepResultsTableFilterByCourseId,
    getDepResults,
    getDepResultsAdmin,
    getDepResultsWithSpec,
    getDepResultsWithSpecAdmin,
    setExistingDepResultsFilterSchemes
} from "../actions/resultsActions";
import Results from "../components/Results";

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo,
        results: state.results,
        affiliation: state.affiliationSelectorCacheable.selected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearLoadingFailure: () => dispatch(clearLoadingFailure()),

        setExistingDepResultsFilterSchemes: (courseId) =>dispatch(setExistingDepResultsFilterSchemes(courseId)),

        getAllSchemesForDepResultsTableFilterByCourseId: (courseId) =>dispatch(getAllSchemesForDepResultsTableFilterByCourseId(courseId)),

        getDepResults: (params) => dispatch(getDepResults(params)),
        getDepResultsWithSpecs: (params, specs) => dispatch(getDepResultsWithSpec(params, specs)),
        getDepResultsAdmin: (depId, params) => dispatch(getDepResultsAdmin(depId, params)),
        getDepResultsWithSpecAdmin: (depId, params, spec) =>dispatch(getDepResultsWithSpecAdmin(depId, params, spec)),

        getAllDepResultsDataForTable: () => dispatch(getAllDepResultsDataForTable()),
        getAllDepResultsDataForTableAdmin: (depId) => dispatch(getAllDepResultsDataForTableAdmin(depId)),
        getAllDepResultsDataForTableGlobalAdmin: (depId, orgId) => dispatch(getAllDepResultsDataForTableGlobalAdmin(depId, orgId))
    }
}


const ResultsContainer = connect(mapStateToProps, mapDispatchToProps)(Results);

export default ResultsContainer;