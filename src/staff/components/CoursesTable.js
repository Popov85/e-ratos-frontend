import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {Comparator, dateFilter, selectFilter, textFilter} from 'react-bootstrap-table2-filter';
import {FaCaretSquareDown, FaCaretSquareUp, FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import CourseEditModal from "./CourseEditModal";
import CourseAssociateModal from "./CourseAssociateModal";
import ConfirmModal from "../../common/components/ConfirmModal";
import {minLength2, required} from "../../utils/validators";
import {staffFilter} from "../../utils/filters/staffFilter";
import {lmsFilter} from "../../utils/filters/lmsFilter";
import {defaultSorted, lmsOptions} from "../../utils/constants";
import {utilsCSS} from "../../utils/utilsCSS";
import '../../../main.css';
import {isEditable} from "../../utils/security";

const CoursesTable = props => {
    const initEditState = {mode: false, editableCourseId: null};
    const initDeleteState = {mode: false, deletableCourseId: null};
    const initAssociateState = {mode: false, associatableCourseId: null};
    const initDisassociateState = {mode: false, disassociatableCourseId: null};

    const [edit, setEditMode] = useState(initEditState);
    const [remove, setDeleteMode] = useState(initDeleteState);
    const [associate, setAssociateMode] = useState(initAssociateState);
    const [disassociate, setDisassociateMode] = useState(initDisassociateState);

    const deactivateEditModal = () => setEditMode(initEditState);
    const deactivateDeleteModal = () => setDeleteMode(initDeleteState);
    const deactivateAssociateModal = () => setAssociateMode(initAssociateState);
    const deactivateDisassociateModal = () => setDisassociateMode(initDisassociateState);

    const {userInfo, courses, accesses, expanded} = props;
    const {authenticated} = userInfo;

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
            style: !expanded ? utilsCSS.getShortCellStyle : null,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('350px', 'left'),
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
                return isEditable(authenticated, staff, access);
            }
        },
        {
            dataField: 'staff',
            text: 'Created by',
            sort: true,
            sortFunc: (a, b, order) => staffFilter.getStaffSorted(a, b, order),
            filter: textFilter({
                onFilter: staffFilter.getStaffFiltered
            }),
            formatter: (cell, row) => {
                const {name, surname} = row.staff;
                return `${surname} ${name}`;
            },
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('180px', 'left'),
            title: cell => `${cell.name} ${cell.surname} (${cell.position})`,
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
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('220px', 'center'),
            editable: false
        },
        {
            dataField: 'access.accessId',
            text: 'Access',
            sort: true,
            filter: selectFilter({
                options: accesses
            }),
            formatter: cell => accesses[cell],
            title: cell => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'center'),
            editable: false
        },
        {
            dataField: 'lms',
            text: 'LMS',
            sort: true,
            align: 'center',
            filter: selectFilter({
                options: lmsOptions,
                onFilter: lmsFilter.getLMSFiltered
            }),
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'center'),
            formatter: (cell) => {
                return cell ?
                    <span className="badge badge-success pt-1 pb-1 pr-2 pl-2" title={cell.name}>LMS</span> :
                    <span className="badge badge-dark pt-1 pb-1 pr-2 pl-2">non-LMS</span>;
            },
            title: cell => cell,

            editable: false
        },
        {
            dataField: 'action',
            isDummyField: true,
            editable: false,
            text: 'Do',
            align: 'center',
            title: (cell, row) => row.lms ? 'Disassociate?' : 'Associate with LMS?',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {courseId, lms, staff, access} = row;
                return (
                    <a href="#" className={`badge badge-${isEditable(authenticated, staff, access) ? 'dark' : 'secondary'}`}
                       onClick={() => isEditable(authenticated, staff, access)?
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
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {courseId, staff, access} = row;
                return (
                    <a href="#" className={`badge badge-${isEditable(authenticated, staff, access) ? 'success' : 'secondary'}`}
                       onClick={() => isEditable(authenticated, staff, access) ? setEditMode({
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
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {courseId, staff, access} = row;
                return (
                    <a href="#" className={`badge badge-${isEditable(authenticated, staff, access) ? 'warning' : 'secondary'}`}
                       onClick={() => isEditable(authenticated, staff, access) ? setDeleteMode({
                           mode: true,
                           deletableCourseId: courseId
                       }) : null}>
                        <FaTrashAlt/>
                    </a>);
            },
            hidden: !authenticated.isAtLeastInstructor ? true : false
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
                                pageStartIndex: 1,
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
                edit.mode &&
                <CourseEditModal show={edit.mode} deactivateModal={deactivateEditModal}
                                 editableCourseId={edit.editableCourseId}/>
            }
            {
                remove.mode &&
                <ConfirmModal show={remove.mode} deactivateModal={deactivateDeleteModal}
                              action="Delete the selected course?"
                              params={[remove.deletableCourseId]}
                              doActionIfOK={props.deleteCourse}/>
            }
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

        </div>
    );
};

CoursesTable.propTypes = {
    userInfo: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    accesses: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,

    deleteCourse: PropTypes.func.isRequired,
    associateCourseWithLMS: PropTypes.func.isRequired,
    disassociateCourseWithLMS: PropTypes.func.isRequired,
    onTableChange: PropTypes.func.isRequired
};

export default CoursesTable;