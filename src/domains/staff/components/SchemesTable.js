import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {
    Comparator,
    dateFilter,
    numberFilter,
    selectFilter,
    textFilter
} from 'react-bootstrap-table2-filter';
import {FaCheck, FaCompress, FaExpand, FaFlask, FaMinus, FaPencilAlt, FaPlus, FaSync, FaTrashAlt, FaRegCopy} from "react-icons/fa";
import ConfirmModal from "../../common/components/ConfirmModal";
import {minLength2, required} from "../../../utils/validators";
import {staffFilter} from "../../../utils/filters/staffFilter";
import {defaultSorted} from "../../../utils/constants";
import {utilsCSS} from "../../../utils/utilsCSS";
import '../../../../main.css';
import {isEditable} from "../../../utils/security";
import SchemesColumnsToggler from "./SchemesColumnsToggler";
import SchemeEditModal from "./SchemeEditModal";
import SchemeURLModal from "./SchemeURLModal";

const SchemesTable = props => {

    const initNewState = false;
    const initURLState = {mode: false, schemeId: null};
    const initEditState = {mode: false, editableSchemeId: null};
    const initDeleteState = {mode: false, deletableSchemeId: null};

    const initExpanded =false;
    const initHiddenColumns =  ["Staff", "Created", "Access", "Themes", "Groups"];

    const [create, setNewMode] = useState(initNewState);
    const [showURL, setURLMode] = useState(initURLState);
    const [edit, setEditMode] = useState(initEditState);
    const [remove, setDeleteMode] = useState(initDeleteState);

    const [expanded, setExpanded] = useState(initExpanded);
    const [hiddenColumns, setHiddenColumns] = useState(initHiddenColumns);

    const deactivateNewModal = () => setNewMode(initNewState);
    const deactivateURLModal = () => setURLMode(initURLState);
    const deactivateEditModal = () => setEditMode(initEditState);
    const deactivateDeleteModal = () => setDeleteMode(initDeleteState);

    const {userInfo, authorization, schemes, courses, accesses, settings, strategies, modes, gradings, options} = props;

    const handleToggle=(hiddenColumns)=> setHiddenColumns(hiddenColumns);

    const renderCaption =()=> {
        if (props.isLoading) return null;
        return (
            <div className = "d-flex">
                <div className="mr-1">
                    <button type="button" className="btn btn-sm btn-secondary" title="Expand/compress"
                            onClick={() => setExpanded(!expanded)}>
                        {expanded ? <FaCompress/> : <FaExpand/>}
                    </button>
                </div>
                <div className="flex-grow-1">
                    <SchemesColumnsToggler
                        hiddenColumns={hiddenColumns}
                        handleToggle={handleToggle}/>
                </div>
                <div className="ml-1">
                    <button type="button" className="btn btn-sm btn-success"
                            onClick={() => setNewMode(true)}>
                        <FaPlus/>&nbsp;New
                    </button>

                    <button className="btn btn-sm btn-info ml-1"
                            title="Refresh results?"
                            onClick={() => props.handleRefresh()}>
                        <FaSync/>&nbsp;Refresh
                    </button>
                </div>

            </div>);
    }

    const columns = [
        {
            dataField: 'schemeId',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'name',
            text: 'Scheme',
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
            editable: (cell, row) => {
                const {staff, access} = row;
                return isEditable(userInfo, staff, access);
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
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('240px', 'left'),
            title: cell => courses[cell],
            style: !expanded ? utilsCSS.getShortCellStyle : null,
            editable: false
        },
        {
            dataField: 'strategy.strId',
            text: 'Strategy',
            sort: true,
            filter: selectFilter({
                options: strategies
            }),
            formatter: cell => strategies[cell],
            title: cell => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'center'),
            editable: false
        },
        {
            dataField: 'settings.setId',
            text: 'Settings',
            sort: true,
            filter: selectFilter({
                options: settings
            }),
            formatter: cell => settings[cell],
            title: cell => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'center'),
            editable: false
        },
        {
            dataField: 'mode.modeId',
            text: 'Mode',
            sort: true,
            filter: selectFilter({
                options: modes
            }),
            formatter: cell => modes[cell],
            title: cell => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'center'),
            editable: false
        },
        {
            dataField: 'options.optId',
            text: 'Options',
            sort: true,
            filter: selectFilter({
                options: options
            }),
            formatter: cell => options[cell],
            title: cell => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'center'),
            editable: false
        },
        {
            dataField: 'grading.gradingId',
            text: 'Grading',
            sort: true,
            filter: selectFilter({
                options: gradings
            }),
            formatter: cell => gradings[cell],
            title: cell => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'center'),
            editable: false
        },
        {
            dataField: 'themesCount',
            text: 'Themes',
            sort: true,
            align: 'center',
            filter: numberFilter({
                style: null,
                className: '',
                placeholder: 'Themes',
                comparatorStyle: utilsCSS.getDefaultFilterStyle('13px'),
                comparatorClassName: 'w-auto p-0',
                withoutEmptyComparatorOption: true,
                comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
                numberStyle: utilsCSS.getDefaultFilterStyle('13px'),
                numberClassName: 'w-100 m-0 p-0'
            }),
            hidden: hiddenColumns.includes("Themes"),
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'center', '13px'),
            title: cell => cell,
            style: utilsCSS.getShortCellStyle('13px'),
            formatter: (cell) => {
                let quantity = Number(cell);
                if (quantity === 1) {
                    return <span className="badge badge-success pt-1 pb-1 pr-2 pl-2">{cell}</span>;
                } else if (quantity < 8 && quantity > 1) {
                    return <span className="badge badge-warning pt-1 pb-1 pr-2 pl-2">{cell}</span>;
                } else {
                    return <span className="badge badge-danger pt-1 pb-1 pr-2 pl-2">{cell}</span>;
                }
            }
        },
        {
            dataField: 'groupsCount',
            text: 'Groups',
            sort: true,
            align: 'center',
            filter: numberFilter({
                style: null,
                className: '',
                placeholder: 'Groups',
                comparatorStyle: utilsCSS.getDefaultFilterStyle('13px'),
                comparatorClassName: 'w-auto p-0',
                withoutEmptyComparatorOption: true,
                comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
                numberStyle: utilsCSS.getDefaultFilterStyle('13px'),
                numberClassName: 'w-100 m-0 p-0'
            }),
            hidden: hiddenColumns.includes("Groups"),
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'center', '13px'),
            title: cell => cell,
            style: utilsCSS.getShortCellStyle('13px'),
            formatter: (cell) => {
                let quantity = Number(cell);
                if (quantity === 0) {
                    return <span className="badge badge-success pt-1 pb-1 pr-2 pl-2">{cell}</span>;
                } else if (quantity < 4 && quantity > 0) {
                    return <span className="badge badge-warning pt-1 pb-1 pr-2 pl-2">{cell}</span>;
                } else {
                    return <span className="badge badge-danger pt-1 pb-1 pr-2 pl-2">{cell}</span>;
                }
            }
        },
        {
            dataField: 'active',
            text: 'Active',
            align: 'center',
            filter: selectFilter({
                placeholder: 'Active?',
                options: {
                    true: "true",
                    false: "false"
                },
                style: utilsCSS.getDefaultFilterStyle('13px'),
                className: 'p-0'
            }),
            title: cell => `This scheme is ${cell ? 'active' : 'deactivated'}`,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('60px', 'center', '13px'),
            style: utilsCSS.getShortCellStyle('13px'),
            formatter: (cell) => {
                return cell === true ?
                    <span className="badge badge-success"><FaCheck style={{fontSize: '0.75em'}}/></span> :
                    <span className="badge badge-danger"><FaCheck style={{fontSize: '0.75em'}}/></span>;
            }
        },
        {
            dataField: 'lmsOnly',
            text: 'LMSOnly',
            align: 'center',
            filter: selectFilter({
                placeholder: 'LMS only?',
                options: {
                    true: "true",
                    false: "false"
                },
                style: utilsCSS.getDefaultFilterStyle('13px'),
                className: 'p-0'
            }),
            title: cell => `This scheme is ${cell ? 'LMS only' : 'LMS not only'}`,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('60px', 'center', '13px'),
            style: utilsCSS.getShortCellStyle('13px'),
            formatter: (cell) => {
                return cell === true ?
                    <span className="badge badge-success"><FaCheck style={{fontSize: '0.75em'}}/></span> :
                    <span className="badge badge-secondary"><FaMinus style={{fontSize: '0.75em'}}/></span>;
            }
        },
        {
            dataField: 'staff',
            text: 'Created by',
            sort: true,
            sortFunc: (a, b, order) => staffFilter.getStaffSorted(a, b, order),
            filter: textFilter({
                onFilter: staffFilter.getStaffFiltered,
                style: utilsCSS.getDefaultFilterStyle('13px'),
            }),
            hidden: hiddenColumns.includes("Staff"),
            formatter: (cell, row) => {
                const {name, surname} = row.staff;
                return `${surname} ${name}`;
            },
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('180px', 'left', '13px'),
            title: cell => `${cell.name} ${cell.surname} (${cell.position})`,
            editable: false
        },
        {
            dataField: 'access.accessId',
            text: 'Access',
            sort: true,
            filter: selectFilter({
                options: accesses,
                style: utilsCSS.getDefaultFilterStyle('13px'),
            }),
            hidden: hiddenColumns.includes("Access"),
            formatter: cell => accesses[cell],
            title: cell => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'center', '13px'),
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
                comparatorStyle: utilsCSS.getDefaultFilterStyle('13px'),
                dateStyle: {fontSize: '13px'},
                comparators: [Comparator.EQ, Comparator.GT, Comparator.LT],
            }),
            hidden: hiddenColumns.includes("Created"),
            title: cell => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('220px', 'center', '13px'),
            editable: false
        },
        {
            dataField: 'url',
            isDummyField: true,
            editable: false,
            text: 'URL',
            align: 'center',
            title: () => 'URL',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const { schemeId } = row;
                return (
                    <a href="#" className="badge badge-success"
                       onClick={() => setURLMode({ mode: true, schemeId: schemeId })}>
                        <FaRegCopy />
                    </a>
                );
            }
        },
        {
            dataField: 'edit',
            isDummyField: true,
            editable: false,
            text: 'Edt',
            align: 'center',
            title: () => 'Edit',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {schemeId, staff, access} = row;
                return isEditable(userInfo, staff, access) ?
                    <a href="#" className="badge badge-success"
                       onClick={() => setEditMode({mode: true, editableSchemeId: schemeId})}>
                        <FaPencilAlt/>
                    </a> :
                    <span className="badge badge-secondary">
                        <FaPencilAlt/>
                    </span>;
            }
        },
        {
            dataField: 'test',
            isDummyField: true,
            editable: false,
            text: 'Test',
            align: 'center',
            title: () => 'Test',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {schemeId} = row;
                return (
                    <a
                        href={`/session?schemeId=${schemeId}`}
                        className="badge badge-success"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFlask />
                    </a>
                );
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
                const {schemeId, staff, access} = row;
                return isEditable(userInfo, staff, access) ?
                    <a href="#" className="badge badge-warning"
                       onClick={() => setDeleteMode({mode: true, deletableSchemeId: schemeId})}>
                        <FaTrashAlt/>
                    </a> :
                    <span className="badge badge-secondary">
                        <FaTrashAlt/>
                    </span>;
            },
            hidden: !authorization.isAtLeastInstructor
        },
    ];

    return (
        <div className="pb-5">
            <BootstrapTable bootstrap4 striped hover condensed
                            remote={{filter: false, pagination: false, sort: false, cellEdit: true}}
                            keyField='schemeId'
                            data={schemes}
                            columns={columns}
                            defaultSorted={defaultSorted}
                            filter={filterFactory()}
                            caption={renderCaption()}
                            pagination={paginationFactory({
                                showTotal: true,
                                pageStartIndex: 1,
                                sizePerPageList: [
                                    {text: '10', value: 10},
                                    {text: '25', value: 25},
                                    {text: 'All', value: schemes.length}
                                ]
                            })}
                            wrapperClasses="table-responsive"
                            headerClasses="thead-light"
                            cellEdit={cellEditFactory({mode: 'dbclick'})}
                            noDataIndication={() => "No data!"}
                            onTableChange={props.onTableChange}
            />
            {
                create &&
                <SchemeEditModal show={true} deactivateModal={deactivateNewModal}/>
            }
            {
                edit.mode &&
                <SchemeEditModal show={true} deactivateModal={deactivateEditModal}
                                 editableSchemeId={edit.editableSchemeId}/>
            }
            {
                showURL.mode &&
                <SchemeURLModal show={true} deactivateModal={deactivateURLModal}
                                 schemeId={showURL.schemeId}/>
            }
            {
                remove.mode &&
                <ConfirmModal show={true} deactivateModal={deactivateDeleteModal}
                              action="Delete the selected scheme?"
                              params={[remove.deletableSchemeId]}
                              doActionIfOK={props.deleteScheme}/>
            }
        </div>
    );
};

SchemesTable.propTypes = {
    userInfo: PropTypes.object.isRequired,
    authorization: PropTypes.object.isRequired,
    schemes: PropTypes.array.isRequired,
    courses: PropTypes.object.isRequired,
    accesses: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    strategies: PropTypes.object.isRequired,
    modes: PropTypes.object.isRequired,
    gradings: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,

    updateSchemeName: PropTypes.func.isRequired,
    updateSchemeActive: PropTypes.func.isRequired,
    updateSchemeLMSOnly:PropTypes.func.isRequired,
    deleteScheme: PropTypes.func.isRequired,
    handleRefresh: PropTypes.func.isRequired,
    onTableChange: PropTypes.func.isRequired
};

export default SchemesTable;