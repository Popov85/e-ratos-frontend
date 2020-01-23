import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
    textFilter,
    selectFilter,
    Comparator,
    dateFilter,
    numberFilter
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import {FaCheck, FaMinus, FaInfo, FaFileCsv, FaSync, FaExpand, FaCompress} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import ResultsColumnsToggler from "./ResultsColumnsToggler";
import {CSVLink} from "react-csv";

import "../../../main.css";

const CSVHeaders = [
    {label: 'Course', key: 'scheme.course.name'},
    {label: 'Scheme', key: 'scheme.name'},
    {label: 'Name', key: 'student.user.name'},
    {label: 'Surname', key: 'student.user.surname'},
    {label: 'Email', key: 'student.user.email'},
    {label: 'Faculty', key: 'student.faculty.name'},
    {label: 'Class', key: 'student.studentClass.name'},
    {label: 'Year', key: 'student.entranceYear'},
    {label: 'Session ended', key: 'sessionEnded'},
    {label: 'Session lasted', key: 'sessionLasted'},
    {label: 'Percent', key: 'percent'},
    {label: 'Grade', key: 'grade'},
    {label: 'Passed', key: 'passed'},
    {label: 'Session lasted', key: 'sessionLasted'},
    {label: 'Timeouted', key: 'timeOuted'},
    {label: 'Cancelled', key: 'cancelled'},
    {label: 'LMS', key: 'lms'}
];

const filterStyle = {
    fontSize: '13px'
};

const headerStyle = (width, align) => {
    return {
        width: `${width}`,
        textAlign: `${align}`,
        fontSize: '13px'
    }
};

const cellStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '13px'
};

const defaultCellStyle = {
    fontSize: '13px'
};

class ResultsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            hiddenColumns: ["Name", "Email", "Faculty", "Class", "Year", "Lasted", "Timeouted", "Cancelled", "Points"]
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleToggle(hiddenColumns) {
        this.setState({hiddenColumns})
    }

    handleRefresh() {
        this.refresh(false);
    }

    renderCaption() {
        const {expanded} = this.state;
        return (
            <div className = "d-flex">
                <div className="mr-1">
                    <button type="button" className="btn btn-sm btn-secondary" title="Expand/compress"
                            onClick={() => this.setState({expanded: !this.state.expanded})}>
                        {expanded ? <FaCompress/> : <FaExpand/>}
                    </button>
                </div>
                <div className="flex-grow-1">
                    <ResultsColumnsToggler
                        hiddenColumns={this.state.hiddenColumns}
                        handleToggle={this.handleToggle}/>
                </div>
                <div className="ml-1">
                    <CSVLink
                        data={this.props.results}
                        headers={CSVHeaders}
                        filename={"results.csv"}
                        className="btn btn-sm btn-success"
                        target="_blank" title="Export to CSV format?">
                        <FaFileCsv/>&nbsp;Exports
                    </CSVLink>
                    <button className="btn btn-sm btn-info ml-1"
                            title="Refresh results?"
                            onClick={() => this.handleRefresh()}>
                        <FaSync/>&nbsp;Refresh
                    </button>
                </div>

            </div>);
    }

    render() {

        const {expanded, hiddenColumns} = this.state;
        const {results, courses, schemes, faculties} = this.props;

        const columns = [
            {
                dataField: 'update',
                isDummyField: true,
                text: '',
                headerStyle: {display: 'none'},
                style: {display: 'none'},
                filter: textFilter({
                    getFilter: filter => this.refresh = filter
                })
            },
            {
                dataField: 'resultId',
                text: 'ID',
                hidden: true
            },
            {
                dataField: 'scheme.course',
                text: 'Course',
                sort: true,
                filter: selectFilter({
                    options: courses,
                    style: filterStyle
                }),
                formatter: cell => courses[cell.courseId],
                headerStyle: () => headerStyle('200px', 'left'),
                title: cell => cell.name,
                style: !expanded ? cellStyle : defaultCellStyle,
            },
            {
                dataField: 'scheme',
                text: 'Scheme',
                sort: true,
                filter: selectFilter({
                    options: schemes,
                    style: filterStyle
                }),
                formatter: cell => schemes[cell.schemeId],
                headerStyle: () => headerStyle('200px', 'left'),
                title: cell => cell.name,
                style: !expanded ? cellStyle : defaultCellStyle,
            },
            {
                dataField: 'student.user.surname',
                text: 'Surname',
                sort: true,
                hidden: hiddenColumns.includes("Surname"),
                filter: textFilter({
                    style: filterStyle
                }),
                headerStyle: () => headerStyle('120px', 'left'),
                title: cell => cell,
                style: cellStyle,
            },
            {
                dataField: 'student.user.name',
                text: 'Name',
                sort: true,
                hidden: hiddenColumns.includes("Name"),
                filter: textFilter({
                    style: filterStyle
                }),
                headerStyle: () => headerStyle('120px', 'left'),
                title: cell => cell,
                style: cellStyle,
            },
            {
                dataField: 'student.user.email',
                text: 'Email',
                sort: true,
                hidden: hiddenColumns.includes("Email"),
                filter: textFilter({
                    style: filterStyle
                }),
                headerStyle: () => headerStyle('150px', 'left'),
                title: cell => cell,
                style: cellStyle,
            },
            {
                dataField: 'student.faculty',
                text: 'Faculty',
                sort: true,
                hidden: hiddenColumns.includes("Faculty"),
                filter: selectFilter({
                    options: faculties,
                    style: filterStyle
                }),
                formatter: cell => faculties[cell.facId],
                headerStyle: () => headerStyle('200px', 'left'),
                title: cell => cell,
                style: cellStyle,
            },
            {
                dataField: 'student.studentClass.name',
                text: 'Class',
                sort: true,
                align: 'center',
                hidden: hiddenColumns.includes("Class"),
                filter: textFilter({
                    placeholder: 'Class',
                    style: filterStyle
                }),
                headerStyle: () => headerStyle('70px', 'left'),
                title: cell => cell,
                style: cellStyle,
            },
            {
                dataField: 'student.entranceYear',
                text: 'Year',
                sort: true,
                align: 'center',
                hidden: hiddenColumns.includes("Year"),
                filter: textFilter({
                    placeholder: 'Year',
                    style: filterStyle
                }),
                headerStyle: () => headerStyle('70px', 'left'),
                title: cell => cell,
                style: cellStyle,
            },
            {
                dataField: 'sessionEnded',
                text: 'Session ended',
                sort: true,
                align: 'center',
                filter: dateFilter({
                    placeholder: 'Ended',
                    comparatorStyle: filterStyle,
                    comparatorClassName: 'w-auto p-0',
                    dateStyle: {fontSize: '13px'},
                    dateClassName: 'w-auto ml-0 pl-0 pr-0',
                    withoutEmptyComparatorOption: true,
                    comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
                }),
                headerStyle: () => headerStyle('185px', 'center'),
                title: cell => cell,
                style: cellStyle,
            },
            {
                dataField: 'sessionLasted',
                text: 'Lasted, sec',
                sort: true,
                align: 'center',
                hidden: hiddenColumns.includes("Lasted"),
                filter: numberFilter({
                    style: null,
                    className: '',
                    placeholder: 'Lasted',
                    comparatorStyle: filterStyle,
                    comparatorClassName: 'w-auto p-0',
                    withoutEmptyComparatorOption: true,
                    comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
                    numberStyle: filterStyle,
                    numberClassName: 'w-100 m-0 p-0'
                }),
                headerStyle: () => headerStyle('100px', 'center'),
                title: cell => `${cell}, sec`,
                formatter: (cell) => {
                    return cell >= 60 ?
                        <span className="badge badge-success pt-1 pb-1 pr-2 pl-2">{cell}</span> :
                        <span className="badge badge-danger pt-1 pb-1 pr-2 pl-2">{cell}</span>;
                },
                style: cellStyle,
            },
            {
                dataField: 'grade',
                text: 'Grade',
                sort: true,
                align: 'center',
                filter: numberFilter({
                    style: null,
                    className: '',
                    placeholder: 'Grade',
                    comparatorStyle: filterStyle,
                    comparatorClassName: 'w-auto p-0',
                    withoutEmptyComparatorOption: true,
                    comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
                    numberStyle: filterStyle,
                    numberClassName: 'w-100 m-0 p-0'
                }),
                headerStyle: () => headerStyle('100px', 'center'),
                title: cell => cell,
                formatter: (cell) => {
                    let grade = Number(cell);
                    return [1, 5, 200].includes(grade) ?
                        <span className="badge badge-success pt-1 pb-1 pr-2 pl-2">{cell}</span> :
                        <span className="badge badge-warning pt-1 pb-1 pr-2 pl-2">{cell}</span>;
                },
                style: cellStyle,
            },
            {
                dataField: 'percent',
                text: 'Percent',
                sort: true,
                align: 'center',
                filter: numberFilter({
                    style: null,
                    className: '',
                    placeholder: 'Percent',
                    comparatorStyle: filterStyle,
                    comparatorClassName: 'w-auto p-0',
                    withoutEmptyComparatorOption: true,
                    comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
                    numberStyle: filterStyle,
                    numberClassName: 'w-100 m-0 p-0'
                }),
                headerStyle: () => headerStyle('100px', 'center'),
                title: cell => cell,
                style: cellStyle,
                formatter: (cell) => {
                    let percent = Number(cell);
                    if (percent === 100) {
                        return <span className="badge badge-success pt-1 pb-1 pr-2 pl-2">{cell}</span>;
                    } else if (percent < 100 && percent > 50) {
                        return <span className="badge badge-warning pt-1 pb-1 pr-2 pl-2">{cell}</span>;
                    } else {
                        return <span className="badge badge-danger pt-1 pb-1 pr-2 pl-2">{cell}</span>;
                    }
                }
            },
            {
                dataField: 'passed',
                text: 'Passed',
                sort: true,
                align: 'center',
                filter: selectFilter({
                    placeholder: 'Passed',
                    options: {
                        true: "true",
                        false: "false"
                    },
                    style: filterStyle,
                    className: 'p-0',
                }),
                headerStyle: () => headerStyle('60px', 'center'),
                title: cell => cell ? 'Passed' : 'Failed',
                style: cellStyle,
                formatter: (cell) => {
                    return cell ?
                        <span className="badge badge-success pt-1 pb-1 pr-2 pl-2">Passed</span> :
                        <span className="badge badge-danger pt-1 pb-1 pr-2 pl-2">Failed</span>;
                }
            },
            {
                dataField: 'lms',
                text: 'LMS',
                sort: true,
                align: 'center',
                filter: selectFilter({
                    placeholder: 'LMS',
                    options: {
                        true: "true",
                        false: "false"
                    },
                    style: filterStyle,
                    className: 'p-0'
                }),
                title: cell => `This session was ${cell ? 'from LMS' : 'not from LMS'}`,
                headerStyle: () => headerStyle('60px', 'center'),
                style: cellStyle,
                formatter: (cell) => {
                    return cell === true ?
                        <span className="badge badge-warning pt-1 pb-1 pr-2 pl-2">LMS</span> :
                        <span className="badge badge-secondary"><FaMinus style={{fontSize: '0.75em'}}/></span>;
                }
            },
            {
                dataField: 'timeouted',
                text: 'Timeout',
                align: 'center',
                hidden: hiddenColumns.includes("Timeouted"),
                filter: selectFilter({
                    placeholder: 'Timeout?',
                    options: {
                        true: "true",
                        false: "false"
                    },
                    style: filterStyle,
                    className: 'p-0'
                }),
                title: cell => `This session was ${cell ? 'timeouted' : 'not timeouted'}`,
                headerStyle: () => headerStyle('60px', 'center'),
                style: cellStyle,
                formatter: (cell) => {
                    return cell !== true ?
                        <span className="badge badge-secondary"><FaCheck style={{fontSize: '0.75em'}}/></span> :
                        <span className="badge badge-danger"><FaCheck style={{fontSize: '0.75em'}}/></span>;
                }
            },
            {
                dataField: 'cancelled',
                text: 'Cancel',
                align: 'center',
                hidden: hiddenColumns.includes("Cancelled"),
                filter: selectFilter({
                    placeholder: 'Cancelled?',
                    options: {
                        true: "true",
                        false: "false"
                    },
                    style: filterStyle,
                    className: 'p-0'
                }),
                title: cell => `This session was ${cell ? 'cancelled' : 'not cancelled'}`,
                headerStyle: () => headerStyle('60px', 'center'),
                style: cellStyle,
                formatter: (cell) => {
                    return cell !== true ?
                        <span className="badge badge-secondary"><FaCheck style={{fontSize: '0.75em'}}/></span> :
                        <span className="badge badge-danger"><FaCheck style={{fontSize: '0.75em'}}/></span>;
                }
            },

            {
                dataField: 'points',
                text: 'Points',
                align: 'center',
                sort: true,
                hidden: hiddenColumns.includes("Points"),
                filter: selectFilter({
                    placeholder: 'Points',
                    options: {
                        true: "true",
                        false: "false"
                    },
                    style: filterStyle,
                    className: 'p-0'
                }),
                title: cell => `For this result the student was ${cell ? 'granted' : 'not granted'} game points`,
                headerStyle: () => headerStyle('60px', 'center'),
                style: cellStyle,
                formatter: (cell) => {
                    return cell ?
                        <span className="badge badge-success pt-1 pb-1 pr-2 pl-2">{cell}</span> :
                        <span className="badge badge-secondary"><FaMinus style={{fontSize: '0.75em'}}/></span>;
                }
            },
            {
                dataField: 'details',
                isDummyField: true,
                text: 'Info',
                align: 'center',
                title: (cell, row) => `Details id=${row.resultId}`,
                headerStyle: () => headerStyle('40px', 'center'),
                formatter: (cell, row) => {
                    return (
                        <LinkContainer to={`/results/details/${row.resultId}`}>
                            <a href="#" className="badge badge-info">
                                <FaInfo style={{fontSize: '0.75em'}}/>
                            </a>
                        </LinkContainer>);
                }
            }
        ];

        const {page, sizePerPage, totalSize} = this.props;
        return (
            <BootstrapTable
                remote
                bootstrap4
                striped hover condensed
                caption={this.renderCaption()}
                wrapperClasses="table-responsive"
                headerClasses="thead-light"
                keyField="resultId"
                data={results}
                columns={columns}
                filter={filterFactory()}
                pagination={paginationFactory({
                    page, sizePerPage, totalSize,
                    showTotal: true,
                    pageStartIndex: 0,
                    sizePerPageList: [
                        {text: '20', value: 20},
                        {text: '50', value: 50},
                        {text: '100', value: 100}
                    ]
                })}
                onTableChange={this.props.onTableChange}
            />
        );
    }
}

ResultsTable.propTypes = {
    results: PropTypes.array.isRequired,
    courses: PropTypes.object.isRequired,
    schemes: PropTypes.object.isRequired,
    faculties: PropTypes.object.isRequired,

    page: PropTypes.number.isRequired,
    sizePerPage: PropTypes.number.isRequired,
    totalSize: PropTypes.number.isRequired,

    onTableChange: PropTypes.func.isRequired
};

export default ResultsTable;
