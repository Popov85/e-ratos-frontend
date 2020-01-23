import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {Comparator, dateFilter, selectFilter, textFilter} from 'react-bootstrap-table2-filter';
import {FaCaretSquareDown, FaCaretSquareUp, FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import CourseEditModal from "./CourseEditModal";
import CourseAssociateModal from "./CourseAssociateModal";
import ConfirmModal from "../../common/ConfirmModal";
import {minLength2, required} from "../../utils/validators";

import '../../../main.css';
import {isRoleManageable} from "../../utils/security";

const headerStyle = (width, align) => {
    return {
        width: `${width}`,
        textAlign: `${align}`,
        fontSize: '16px'
    }
};

const cellStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};

const activeOptions = {
    true: "true",
    false: "false"
};

const lmsOptions = {
    "LMS": "LMS",
    "non-LMS": "non-LMS"
};

const initEditState = {mode: false, editableCourseId: null};

const initAssociateState = {mode: false, associatableCourseId: null};

const initDisassociateState = {mode: false, disassociatableCourseId: null};


const CoursesTable = props => {

    const [edit, setEditMode] = useState(initEditState);

    const [associate, setAssociateMode] = useState(initAssociateState);

    const [disassociate, setDisassociateMode] = useState(initDisassociateState);


    const deactivateEditModal = () => {
        setEditMode(initEditState);
    }

    const deactivateAssociateModal = () => {
        setAssociateMode(initAssociateState);
    }

    const deactivateDisassociateModal = () => {
        setDisassociateMode(initDisassociateState);
    }

    const {userInfo, courses, expanded} = props;
    const {authenticated} = userInfo;

    const defaultSorted = [{
        dataField: 'name',
        order: 'asc'
    }];

    const staffSorting = (a, b, order) => {
        let surnameA=a.surname.toLowerCase(), surnameB=b.surname.toLowerCase();
        if (order === 'asc') {
            if (surnameA < surnameB) //sort string ascending
                return -1;
            if (surnameA > surnameB)
                return 1;
            return 0;
        } else {
            if (surnameB < surnameA) //sort string descending
                return -1;
            if (surnameB > surnameA)
                return 1;
            return 0;
        }
    }

    const staffFilter = (filterVal, data) => {
        if (filterVal) {
            return data.filter(item =>
                (item.staff.name.includes(filterVal, 0)
                    || item.staff.surname.includes(filterVal, 0)));
        }
        return data;
    }

    const lmsFilter = (filterVal, data) => {
        if (filterVal) {
            if (filterVal === 'non-LMS') {
                return data.filter(item => item.lms === null);
            } else {
                return data.filter(item => item.lms !== null);
            }
        }
        return data;
    }

    const isEditable = (staff, access) => {
        if (access.name === 'dep-private') return false;
        return (staff.staffId !== authenticated.userId)
    }

    const columns = [
        {
            dataField: 'courseId',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'name',
            text: 'Course',
            sort: true,
            filter: textFilter(),
            title: cell => cell,
            style: !expanded ? cellStyle : null,
            headerStyle: () => headerStyle('350px', 'left'),
            validator: (newValue) => {
                if (required(newValue) || minLength2(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid name!'
                    };
                }
                return true;
            },
            editable:  (cell, row) => {
                const {staff, access} = row;
                return !isEditable(staff, access);
            }
        },
        {
            dataField: 'staff',
            text: 'Created by',
            sort: true,
            sortFunc: (a, b, order) => staffSorting(a, b, order),
            filter: textFilter({
                onFilter: staffFilter
            }),
            formatter: (cell, row) => {
                const {name, surname} = row.staff;
                return `${surname} ${name}`;
            },
            style: cellStyle,
            headerStyle: () => headerStyle('220px', 'left'),
            title: cell => cell.name + " " + cell.surname,
            editable: false
        },
        {
            dataField: 'created',
            text: 'Created on',
            sort: true,
            align: 'center',
            filter: dateFilter({
                placeholder: 'Created on',
                comparatorClassName: 'w-auto p-0',
                dateClassName: 'w-auto ml-0 pl-0 pr-0',
                comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
            }),
            title: cell => cell,
            style: cellStyle,
            headerStyle: () => headerStyle('220px', 'center'),
            editable: false
        },
        {
            dataField: 'access.name',
            text: 'Access',
            sort: true,
            filter: textFilter(),
            title: cell => cell,
            style: cellStyle,
            headerStyle: () => headerStyle('100px', 'center'),
            editable: false
        },
        {
            dataField: 'active',
            text: 'Active',
            sort: true,
            align: 'center',
            filter: selectFilter({
                options: activeOptions
            }),
            headerStyle: () => headerStyle('80px', 'center'),
            formatter: (cell) => {
                return cell ?
                    <span className="badge badge-success pt-1 pb-1 pr-2 pl-2">on</span> :
                    <span className="badge badge-danger pt-1 pb-1 pr-2 pl-2">off</span>;
            },
            style: cellStyle,
            editable: false
        },
        {
            dataField: 'lms',
            text: 'LMS',
            sort: true,
            align: 'center',
            filter: selectFilter({
                options: lmsOptions,
                onFilter: lmsFilter
            }),
            headerStyle: () => headerStyle('100px', 'center'),
            formatter: (cell) => {
                return cell ?
                    <span className="badge badge-success pt-1 pb-1 pr-2 pl-2" title={cell.name}>LMS</span> :
                    <span className="badge badge-dark pt-1 pb-1 pr-2 pl-2">non-LMS</span>;
            },
            title: cell => cell,
            style: cellStyle,
            editable: false
        },
        {
            dataField: 'action',
            isDummyField: true,
            editable: false,
            text: 'Do',
            align: 'center',
            title: (cell, row) => row.lms ? 'Disassociate?' : 'Associate with LMS?',
            headerStyle: () => {
                return {width: '40px', textAlign: 'center'};
            },
            formatter: (cell, row) => {
                const {courseId, lms, staff, access} = row;
                return (
                    <a href="#" className={`badge badge-${isEditable(staff, access) ? 'secondary' : 'dark'}`}
                       onClick={() => !isEditable(staff, access) ?
                           !lms ?
                               setAssociateMode({mode: true, associatableCourseId: courseId})
                               : setDisassociateMode({mode: true, disassociatableCourseId: courseId})
                           : null}>
                        {lms ? <FaCaretSquareDown/> : <FaCaretSquareUp/>}
                    </a>);
            }
        },
        {
            dataField: 'update',
            isDummyField: true,
            editable: false,
            text: 'Upd',
            align: 'center',
            title: () => 'Update',
            headerStyle: () => {
                return {width: '40px', textAlign: 'center'};
            },
            formatter: (cell, row) => {
                const {courseId, staff, access} = row;
                return (
                    <a href="#" className={`badge badge-${isEditable(staff, access) ? 'secondary' : 'info'}`}
                       onClick={() => !isEditable(staff, access) ? setEditMode({
                           mode: true,
                           editableCourseId: courseId
                       }) : null}>
                        <FaPencilAlt/>
                    </a>);
            }
        },
        {
            dataField: 'delete',
            isDummyField: true,
            editable: false,
            text: 'Del',
            align: 'center',
            title: () => 'Delete',
            headerStyle: () => {
                return {width: '40px', textAlign: 'center'};
            },
            formatter: (cell, row) => {
                const {courseId, staff, access} = row;
                return (
                    <a href="#" className={`badge badge-${isEditable(staff, access) ? 'secondary' : 'warning'}`}
                       onClick={() => !isEditable(staff, access) ? props.deleteCourse(courseId) : null}>
                        <FaTrashAlt/>
                    </a>);
            }
        },
    ];

    return (
        <div className="pb-5">
            <BootstrapTable bootstrap4 striped hover condensed
                            remote={{filter: false, pagination: false, sort: false, cellEdit: true}}
                            keyField='courseId'
                            data={courses}
                            columns={columns}
                            defaultSorted={defaultSorted}
                            filter={filterFactory()}
                            pagination={paginationFactory({
                                showTotal: true,
                                pageStartIndex: 0,
                                sizePerPageList: [
                                    {text: '10', value: 10},
                                    {text: '50', value: 50},
                                    {text: 'All', value: courses.length}
                                ]
                            })}
                            wrapperClasses="table-responsive"
                            headerClasses="thead-light"
                            cellEdit={cellEditFactory({mode: 'dbclick'})}
                            noDataIndication={() => "No data!"}
                            onTableChange={props.onTableChange}
            />
            {
                associate.mode &&
                <CourseAssociateModal show={associate.mode} deactivateModal={deactivateAssociateModal}
                                      associatableCourseId={associate.associatableCourseId}/>
            }
            {
                disassociate.mode &&
                <ConfirmModal show={disassociate.mode} deactivateModal={deactivateDisassociateModal}
                              action="Disassociate the course and LMS?"
                              params={[disassociate.disassociatableCourseId]}
                              doActionIfOK={props.disassociateCourseWithLMS}/>
            }
            {
                edit.mode &&
                <CourseEditModal show={edit.mode} deactivateModal={deactivateEditModal}
                                 editableCourseId={edit.editableCourseId}/>
            }
        </div>
    );
};

CoursesTable.propTypes = {
    userInfo: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    expanded: PropTypes.bool.isRequired,

    deleteCourse: PropTypes.func.isRequired,
    associateCourseWithLMS: PropTypes.func.isRequired,
    disassociateCourseWithLMS: PropTypes.func.isRequired,
    onTableChange: PropTypes.func.isRequired
};

export default CoursesTable;