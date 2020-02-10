import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import {LinkContainer} from 'react-router-bootstrap';
import filterFactory, {Comparator, dateFilter, selectFilter, textFilter} from 'react-bootstrap-table2-filter';
import {FaNewspaper, FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import ConfirmModal from "../../common/ConfirmModal";
import {minLength2, required} from "../../utils/validators";
import {staffFilter} from "../../utils/filters/staffFilter";
import {lmsFilter} from "../../utils/filters/lmsFilter";
import {defaultSorted, lmsOptions} from "../../utils/constants";
import {cssUtils} from "../../utils/cssUtils";
import '../../../main.css';
import {isEditable} from "../../utils/security";
import ThemeEditModal from "./ThemeEditModal";
import QuestionsMcqContainer from "../containers/QuestionsMcqContainer";

const ThemesTable = props => {
    const initEditState = {mode: false, editableThemeId: null};
    const initDeleteState = {mode: false, deletableThemeId: null};

    const [edit, setEditMode] = useState(initEditState);
    const [remove, setDeleteMode] = useState(initDeleteState);

    const deactivateEditModal = () => setEditMode(initEditState);
    const deactivateDeleteModal = () => setDeleteMode(initDeleteState);

    const {userInfo, themes, courses, accesses, expanded} = props;
    const {authenticated} = userInfo;

    const columns = [
        {
            dataField: 'themeId',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'name',
            text: 'Theme',
            sort: true,
            filter: textFilter(),
            title: cell => cell,
            style: !expanded ? cssUtils.getShortCellStyle : null,
            headerStyle: () => cssUtils.getDefaultHeaderStyle('350px', 'left'),
            validator: (newValue) => {
                if (required(newValue) || minLength2(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid name!'
                    };
                }
                return true;
            },
            editable: (cell, row) => {
                const {staff, access} = row;
                return isEditable(authenticated, staff, access);
            }
        },
        {
            dataField: 'course.courseId',
            text: 'Course',
            sort: true,
            filter: selectFilter({
                options: courses
            }),
            formatter: cell => courses[cell],
            headerStyle: () => cssUtils.getDefaultHeaderStyle('240px', 'left'),
            title: cell => courses[cell],
            style: !expanded ? cssUtils.getShortCellStyle : null,
            editable: false
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
            style: cssUtils.getShortCellStyle,
            headerStyle: () => cssUtils.getDefaultHeaderStyle('180px', 'left'),
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
            style: cssUtils.getShortCellStyle,
            headerStyle: () => cssUtils.getDefaultHeaderStyle('220px', 'center'),
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
            style: cssUtils.getShortCellStyle,
            headerStyle: () => cssUtils.getDefaultHeaderStyle('100px', 'center'),
            editable: false
        },
        {
            dataField: 'course.lms',
            text: 'LMS',
            sort: true,
            align: 'center',
            filter: selectFilter({
                options: lmsOptions,
                onFilter: lmsFilter.getLMSFromCourseFiltered
            }),
            style: cssUtils.getShortCellStyle,
            headerStyle: () => cssUtils.getDefaultHeaderStyle('100px', 'center'),
            formatter: (cell) => {
                return cell ?
                    <span className="badge badge-success pt-1 pb-1 pr-2 pl-2" title={cell.name}>LMS</span> :
                    <span className="badge badge-dark pt-1 pb-1 pr-2 pl-2">non-LMS</span>;
            },
            title: cell => cell,
            editable: false
        },
        {
            dataField: 'edit',
            isDummyField: true,
            editable: false,
            text: 'Edt',
            align: 'center',
            title: () => 'Edit',
            headerStyle: () => cssUtils.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {themeId, staff, access} = row;
                return isEditable(authenticated, staff, access) ?
                    <a href="#" className="badge badge-success"
                       onClick={() => setEditMode({mode: true, editableThemeId: themeId})}>
                        <FaPencilAlt/>
                    </a> :
                    <span className="badge badge-secondary">
                        <FaPencilAlt/>
                    </span>;
            }
        },
        {
            dataField: 'show',
            isDummyField: true,
            editable: false,
            text: 'Shw',
            align: 'center',
            title: () => 'Show questions',
            headerStyle: () => cssUtils.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {themeId, staff, access} = row;
                return isEditable(authenticated, staff, access) ?
                    <LinkContainer to={`/themes/${themeId}/questions-mcq`}>
                        <a href="#" className="badge badge-info">
                            <FaNewspaper/>
                        </a>
                    </LinkContainer> :
                    <span className="badge badge-secondary">
                        <FaNewspaper/>
                    </span>
            }
        },
        {
            dataField: 'delete',
            isDummyField: true,
            editable: false,
            text: 'Del',
            align: 'center',
            title: () => 'Delete',
            headerStyle: () => cssUtils.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {themeId, staff, access} = row;
                return isEditable(authenticated, staff, access) ?
                    <a href="#" className="badge badge-warning"
                       onClick={() => setDeleteMode({mode: true, deletableThemeId: themeId})}>
                        <FaTrashAlt/>
                    </a> :
                    <span className="badge badge-secondary">
                        <FaTrashAlt/>
                    </span>;
            },
            hidden: !authenticated.isAtLeastInstructor ? true : false
        },
    ];

    return (
        <div className="pb-5">
            <BootstrapTable bootstrap4 striped hover condensed
                            remote={{filter: false, pagination: false, sort: false, cellEdit: true}}
                            keyField='themeId'
                            data={themes}
                            columns={columns}
                            defaultSorted={defaultSorted}
                            filter={filterFactory()}
                            pagination={paginationFactory({
                                showTotal: true,
                                pageStartIndex: 1,
                                sizePerPageList: [
                                    {text: '10', value: 10},
                                    {text: '50', value: 50},
                                    {text: 'All', value: themes.length}
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
                <ThemeEditModal show={edit.mode} deactivateModal={deactivateEditModal}
                                 editableThemeId={edit.editableThemeId}/>
            }
            {
                remove.mode &&
                <ConfirmModal show={remove.mode} deactivateModal={deactivateDeleteModal}
                              action="Delete the selected theme?"
                              params={[remove.deletableThemeId]}
                              doActionIfOK={props.deleteTheme}/>
            }
        </div>
    );
};

ThemesTable.propTypes = {
    userInfo: PropTypes.object.isRequired,
    themes: PropTypes.array.isRequired,
    courses: PropTypes.object.isRequired,
    accesses: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,

    deleteTheme: PropTypes.func.isRequired,
    onTableChange: PropTypes.func.isRequired
};

export default ThemesTable;