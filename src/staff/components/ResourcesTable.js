import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {Comparator, dateFilter, textFilter} from 'react-bootstrap-table2-filter';
import {FaFilm, FaImage, FaItunesNote, FaPencilAlt, FaTrashAlt, FaWpforms} from "react-icons/fa";
import ConfirmModal from "../../common/ConfirmModal";
import {minLength2, required} from "../../utils/validators";
import {staffFilter} from "../../utils/filters/staffFilter";
import {utilsCSS} from "../../utils/utilsCSS";
import '../../../main.css';
import ResourcePreloader from "./ResourcePreloader";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import ResourceEditModal from "./ResourceEditModal";

const ResourcesTable = props => {
    const initEditState = {mode: false, editableResourceId: null};
    const initDeleteState = {mode: false, deletableResourceId: null};

    const [edit, setEditMode] = useState(initEditState);
    const [remove, setDeleteMode] = useState(initDeleteState);

    const deactivateEditModal = () => setEditMode(initEditState);
    const deactivateDeleteModal = () => setDeleteMode(initDeleteState);

    const {userInfo, resources, expanded} = props;
    const {authenticated} = userInfo;

    const resourceTooltip = (link, width, height) => {
        return (
            <Tooltip placement = "left">
                <ResourcePreloader url={link} width={width} height={height} message = "Loading.."/>
            </Tooltip>
        );
    }

    const columns = [
        {
            dataField: 'resourceId',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'width',
            text: 'width',
            hidden: true
        },
        {
            dataField: 'height',
            text: 'height',
            hidden: true
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: true,
            filter: textFilter(),
            title: cell => cell,
            style: !expanded ? utilsCSS.getShortCellStyle : null,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('450px', 'left'),
            validator: (newValue) => {
                if (required(newValue) || minLength2(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid name!'
                    };
                }
                return true;
            },
            editable: true
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
            dataField: 'lastUsed',
            text: 'Last used',
            sort: true,
            align: 'center',
            filter: dateFilter({
                placeholder: 'Last used',
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
            dataField: 'type',
            text: 'Res',
            align: "center",
            title: cell => cell,
            style: !expanded ? utilsCSS.getShortCellStyle : null,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {link, width, height} = row;
                if (cell==='image') return (
                    <OverlayTrigger
                        trigger="click"
                        placement="left"
                        overlay={resourceTooltip(link, width, height)}>
                        <FaImage size="1.25em" color="gray"/>
                    </OverlayTrigger>
                );
                if (cell==='audio') return (
                    <OverlayTrigger
                        trigger="click"
                        placement="left"
                        overlay={resourceTooltip(link, width, height)}>
                        <FaItunesNote size="1.25em" color="gray"/>
                    </OverlayTrigger>
                );
                if (cell==='video') return (
                    <OverlayTrigger
                        trigger="click"
                        placement="left"
                        overlay={resourceTooltip(link, width, height)}>
                        <FaFilm size="1.25em" color="gray"/>
                    </OverlayTrigger>
                );
                return (
                    <OverlayTrigger
                        trigger="click"
                        placement="left"
                        overlay={resourceTooltip(link, width, height)}>
                        <FaWpforms size="1.25em" color="gray"/>
                    </OverlayTrigger>
                );
            },
            editable: false
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
                const {resourceId} = row;
                return (
                    <a href="#" className="badge badge-success"
                       onClick={() => setEditMode({mode: true, editableResourceId: resourceId})}>
                        <FaPencilAlt/>
                    </a>
                );
            },
            hidden: !authenticated.isAtLeastInstructor ? true : false
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
                const {resourceId} = row;
                return (
                    <a href="#" className="badge badge-warning"
                       onClick={() => setDeleteMode({mode: true, deletableResourceId: resourceId})}>
                        <FaTrashAlt/>
                    </a>
                );
            },
            hidden: !authenticated.isAtLeastInstructor ? true : false
        },
    ];

    return (
        <div className="pb-5">
            <BootstrapTable bootstrap4 striped hover condensed
                            remote={{filter: false, pagination: false, sort: false, cellEdit: true}}
                            keyField='resourceId'
                            data={resources}
                            columns={columns}
                            filter={filterFactory()}
                            pagination={paginationFactory({
                                showTotal: true,
                                pageStartIndex: 1,
                                sizePerPageList: [
                                    {text: '10', value: 10},
                                    {text: '20', value: 20},
                                    {text: '50', value: 50},
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
                <ResourceEditModal show={edit.mode} deactivateModal={deactivateEditModal}
                                editableResourceId={edit.editableResourceId}/>
            }
            {
                remove.mode &&
                <ConfirmModal show={remove.mode} deactivateModal={deactivateDeleteModal}
                              action="Delete the selected resource?"
                              params={[remove.deletableResourceId]}
                              doActionIfOK={props.deleteResource}/>
            }
        </div>
    );
};

ResourcesTable.propTypes = {
    userInfo: PropTypes.object.isRequired,
    resources: PropTypes.array.isRequired,
    expanded: PropTypes.bool.isRequired,

    deleteResource: PropTypes.func.isRequired,
    onTableChange: PropTypes.func.isRequired
};

export default ResourcesTable;