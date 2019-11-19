import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {textFilter, selectFilter, dateFilter} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import {FaCheck, FaMinus, FaInfo} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";

const cellStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '13px'
}

const
    ResultsTable = props => {

        const {results, courses} = props;

        const columns = [
            {
                dataField: 'resultId',
                text: 'ID',
                hidden: true
            },
            {
                dataField: 'course',
                text: 'Course',
                sort: true,
                filter: selectFilter({
                    options: courses
                }),
                formatter: cell => courses[cell.courseId],
                headerStyle: () => {
                    return {width: '200px', textAlign: 'left', fontSize: '13px'};
                },
                style: cellStyle,
            },
            {
                dataField: 'scheme.name',
                text: 'Scheme',
                sort: true,
                filter: textFilter(),
                headerStyle: () => {
                    return {width: '200px', textAlign: 'left', fontSize: '13px'};
                },
                style: cellStyle,
            },
            {
                dataField: 'student.user.name',
                text: 'Name',
                sort: true,
                filter: textFilter(),
                headerStyle: () => {
                    return {width: '120px', textAlign: 'center', fontSize: '13px'};
                },
                style: cellStyle,
            },
            {
                dataField: 'student.user.surname',
                text: 'Surname',
                sort: true,
                filter: textFilter(),
                headerStyle: () => {
                    return {width: '120px', textAlign: 'center', fontSize: '13px'};
                },
                style: cellStyle,
            },
            {
                dataField: 'student.user.email',
                text: 'Email',
                sort: true,
                filter: textFilter(),
                headerStyle: () => {
                    return {width: '150px', textAlign: 'left', fontSize: '13px'};
                },
                style: cellStyle,
            },
            {
                dataField: 'student.faculty.name',
                text: 'Faculty',
                sort: true,
                filter: textFilter(),
                headerStyle: () => {
                    return {width: '200px', textAlign: 'left', fontSize: '13px'};
                },
                style: cellStyle,
            },
            {
                dataField: 'student.studentClass.name',
                text: 'Class',
                sort: true,
                filter: textFilter(),
                headerStyle: () => {
                    return {textAlign: 'center', fontSize: '13px'};
                },
                style: cellStyle,
            },
            {
                dataField: 'student.entranceYear',
                text: 'Year',
                sort: true,
                filter: textFilter(),
                headerStyle: () => {
                    return {textAlign: 'center', fontSize: '13px'};
                },
                style: cellStyle,
            },
            {
                dataField: 'sessionEnded',
                text: 'When',
                sort: true,
                filter: dateFilter(),
                headerStyle: () => {
                    return {width: '150px', textAlign: 'left', fontSize: '13px'};
                },
                style: cellStyle,
            },
            {
                dataField: 'sessionLasted',
                text: 'LA',
                sort: true,
                align: 'center',
                filter: textFilter(),
                headerStyle: () => {
                    return {textAlign: 'center', fontSize: '13px'};
                },
                style: cellStyle,
            },
            {
                dataField: 'grade',
                text: 'GR',
                sort: true,
                align: 'center',
                filter: textFilter(),
                headerStyle: () => {
                    return {textAlign: 'center', fontSize: '13px'};
                },
                style: cellStyle,
            },
            {
                dataField: 'percent',
                text: 'PR',
                sort: true,
                align: 'center',
                filter: textFilter(),
                headerStyle: () => {
                    return {textAlign: 'center', fontSize: '13px'};
                },
                style: cellStyle,
                formatter: (cell) => {
                    if (cell===100) {
                        return <span className="badge badge-success">{cell}</span>;
                    } else if (cell < 100 && cell > 50) {
                        return <span className="badge badge-warning">{cell}</span>;
                    } else {
                        return <span className="badge badge-danger">{cell}</span>;
                    }
                }
            },
            {
                dataField: 'passed',
                text: 'PA',
                sort: true,
                align: 'center',
                filter: textFilter(),
                headerStyle: () => {
                    return {textAlign: 'center', fontSize: '13px'};
                },
                style: cellStyle,
                formatter: (cell) => {
                    return cell ?
                        <span className="badge badge-success">Passed</span> :
                        <span className="badge badge-danger">Failed</span>;
                }
            },
            {
                dataField: 'timeOuted',
                text: 'TO',
                sort: true,
                align: 'center',
                filter: textFilter(),
                title: cell => `This session was ${cell ? 'timeouted' : 'not timeouted'}`,
                headerStyle: () => {
                    return {textAlign: 'center', fontSize: '13px'};
                },
                style: cellStyle,
                formatter: (cell) => {
                    return cell !== true ?
                        <span className="badge badge-secondary"><FaCheck style={{fontSize: '0.75em'}}/></span> :
                        <span className="badge badge-danger"><FaCheck style={{fontSize: '0.75em'}}/></span>;
                }
            },
            {
                dataField: 'cancelled',
                text: 'CD',
                sort: true,
                align: 'center',
                filter: textFilter(),
                title: cell => `This session was ${cell ? 'cancelled' : 'not cancelled'}`,
                headerStyle: () => {
                    return {textAlign: 'center', fontSize: '13px'};
                },
                style: cellStyle,
                formatter: (cell) => {
                    return cell !== true ?
                        <span className="badge badge-secondary"><FaCheck style={{fontSize: '0.75em'}}/></span> :
                        <span className="badge badge-danger"><FaCheck style={{fontSize: '0.75em'}}/></span>;
                }
            },
            {
                dataField: 'lms',
                text: 'LMS',
                sort: true,
                align: 'center',
                filter: selectFilter({
                    options: {
                        true: "true",
                        false: "false"
                    }
                }),
                title: cell => `This session was ${cell ? 'from LMS' : 'not from LMS'}`,
                headerStyle: () => {
                    return {textAlign: 'center', fontSize: '13px'};
                },
                style: cellStyle,
                formatter: (cell) => {
                    return cell === true ?
                        <span className="badge badge-warning">LMS</span> :
                        <span className="badge badge-secondary"><FaMinus style={{fontSize: '0.75em'}}/></span>;
                }
            },
            {
                dataField: 'details',
                isDummyField: true,
                text: '',
                align: 'center',
                title: ()=>'Details',
                headerStyle: () => {
                    return {width: '40px', textAlign: 'center'};
                },
                formatter: (cell, row) => {
                    return (
                        <LinkContainer to={`/results/details/${row.resultId}`}>
                            <a href="#" className="badge badge-info">
                                <FaInfo style={{fontSize: '0.75em'}}/>
                            </a>
                        </LinkContainer>);
                }
            },
        ]

        const {page, sizePerPage, totalSize} = props;

        return (
            <BootstrapTable bootstrap4 striped hover condensed
                            remote
                            keyField='resultId'
                            data={results}
                            loading={props.isLoading}
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
                            })
                            }
                            onTableChange={props.onTableChange}
            />
        );
    };

ResultsTable.propTypes = {
    courses: PropTypes.object.isRequired,
    results: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    sizePerPage: PropTypes.number.isRequired,
    totalSize: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,

    onTableChange: PropTypes.func.isRequired
};

export default ResultsTable;