import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FaSync} from "react-icons/fa";
import ResultsTable from "./ResultsTable";
import {ResultSpecs} from "../objects/specs/ResultSpecs";
import Spinner from "../../common/Spinner";
import Header from "../../common/Header";

// TODO: CSV export
/*const columns = [
    {
        dataField: 'resultId',
        text: 'ID',
        hidden: true
    },
    {
        dataField: 'course.name',
        text: 'Course'
    },
    {
        dataField: 'scheme.name',
        text: 'Scheme'
    },
    {
        dataField: 'student.user.name',
        text: 'Name'
    },
    {
        dataField: 'student.user.surname',
        text: 'Surname'
    },
    {
        dataField: 'student.user.email',
        text: 'Email'
    },
    {
        dataField: 'student.studentClass.name',
        text: 'Class'
    },
    {
        dataField: 'student.faculty.name',
        text: 'Faculty'
    },
    {
        dataField: 'sessionEnded',
        text: 'When'
    },
    {
        dataField: 'sessionLasted',
        text: 'LA'
    },
    {
        dataField: 'grade',
        text: 'GR'
    },
    {
        dataField: 'percent',
        text: 'PR',
    },
    {
        dataField: 'passed',
        text: 'PA',
    },
    {
        dataField: 'timeOuted',
        text: 'TO',
    },
    {
        dataField: 'cancelled',
        text: 'CD',
    },
    {
        dataField: 'lms',
        text: 'LMS',
    },
]*/

class Results extends Component {

    constructor(props) {
        super(props);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    componentDidMount() {
        if (!this.props.results.content) {
            this.props.getDepResults();
        }
        // TODO: If empty -> load all Dep. courses and all org. faculties
    }

    getFilterSpecs(filtersMap) {
        console.log("map = ", filtersMap);
        let courseId = filtersMap.get("course");
        let schemeId = filtersMap.get("scheme.name");
        let surname = filtersMap.get("student.user.surname");
        let from = filtersMap.get("sessionEnded");
        let lms = filtersMap.get("lms");
        let specs = new ResultSpecs(
            courseId ? courseId.filterVal : null,
            schemeId ? schemeId.filterVal : null,
            surname ? surname.filterVal : null,
            from ? from.filterVal : null,
            null,
            lms ? lms.filterVal : null,
            false);
        console.log("specs = ", specs);
        return specs;
    }

    handleTableChange(type, {page, sizePerPage, filters, sortField, sortOrder}) {
        let params = `page=${page}&size=${sizePerPage}${sortField ?
            '&sort=' + sortField + ',' + sortOrder : ''}`;
        console.log("params = ", params);
        let map = new Map(Object.entries(filters));
        if (map.size === 0) {
            console.log("Filter is empty");
            this.props.getDepResults(params);
        } else {
            console.log("Filter size = ", map.size);
            let specs = this.getFilterSpecs(map);
            this.props.getDepResultsWithSpecs(params, specs);
        }
    }

    render() {
        const {results} = this.props;

        const {courses} = this.props;
        const {totalElements, size, number, isLoading, error} = this.props.results;

        return (
            <div className="p-3">
                <div className="alert alert-secondary text-center">
                    <h5 className="alert-heading">
                        <strong>Department results</strong>
                    </h5>
                </div>
                {
                    isLoading && !results.content &&
                    <Spinner
                        color = "secondary"
                        message = "Wait... API call is in progress!"
                    />
                }
                {
                    error &&
                    <div className="text-center">
                        <Header
                            widely
                            color = "alert-danger"
                            title = "Failed to perform API call..."
                        />
                    </div>
                }
                {
                    !isLoading &&
                    <div className="text-right mt-3 mb-3">
                        <span>
                           <button className="btn btn-sm btn-info ml-2"
                                   onClick={() => this.props.getDepResults()}>
                               <FaSync/>&nbsp;Refresh
                            </button>
                        </span>

                    </div>
                }
                {
                    results.content ?
                        <div>
                            <ResultsTable
                                courses = {courses}
                                results={results.content}
                                page={number}
                                sizePerPage={size}
                                totalSize={totalElements}
                                isLoading={isLoading ? true : false}
                                onTableChange={this.handleTableChange}
                            />
                        </div> : null
                }
            </div>
        );
    }
}

Results.propTypes = {
    courses: PropTypes.object.isRequired,
    results: PropTypes.object.isRequired,

    getDepResults: PropTypes.func.isRequired,
    getDepResultsWithSpecs: PropTypes.func.isRequired

};

export default Results;