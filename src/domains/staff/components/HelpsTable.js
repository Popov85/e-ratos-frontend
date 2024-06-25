import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {FaEye, FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import ConfirmModal from "../../common/components/ConfirmModal";
import {minLength2, required} from "../../../utils/validators";
import {staffFilter} from "../../../utils/filters/staffFilter";
import {utilsCSS} from "../../../utils/utilsCSS";
import '../../../../main.css';
import HelpMod from "../../session/components/HelpMod";
import HelpEditModal from "./HelpEditModal";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {utilsHTML} from "../../../utils/utilsHTML";

const HelpsTable = props => {

    const initEditState = {mode: false, editableHelpId: null};
    const initDeleteState = {mode: false, deletableHelpId: null};
    const initPreviewState = {mode: false, previewHelp: null};

    const [edit, setEditMode] = useState(initEditState);
    const [remove, setDeleteMode] = useState(initDeleteState);
    const [preview, setPreviewMode] = useState(initPreviewState);

    const deactivateEditModal = () => setEditMode(initEditState);
    const deactivateDeleteModal = () => setDeleteMode(initDeleteState);
    const deactivatePreviewModal = () => setPreviewMode(initPreviewState);

    const helpTooltip = help => {
        return <Tooltip>{help}</Tooltip>;
    }

    const helpFormatter = help => (
        <OverlayTrigger
            trigger = "click"
            placement="bottom-start"
            overlay={helpTooltip(help)}>
            <span dangerouslySetInnerHTML={utilsHTML.createMarkup(help)}/>
        </OverlayTrigger>
    );

    const {authorization, helps, expanded} = props;

    const columns = [
        {
            dataField: 'helpId',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'name',
            text: 'Name',
            sort: true,
            filter: textFilter(),
            title: cell => cell,
            style: !expanded ? utilsCSS.getShortCellStyle : null,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('150px', 'left'),
            validator: (newValue) => {
                if (required(newValue) || minLength2(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid name!'
                    };
                }
                return true;
            },
            editable: !!authorization.isAtLeastInstructor
        },
        {
            dataField: 'help',
            text: 'Help',
            sort: true,
            filter: textFilter(),
            title: cell => cell,
            style: !expanded ? utilsCSS.getShortCellStyle : null,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('350px', 'left'),
            validator: (newValue) => {
                if (required(newValue) || minLength2(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid help!'
                    };
                }
                return true;
            },
            formatter: cell => helpFormatter(cell),
            editable: !!authorization.isAtLeastInstructor
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
            dataField: 'preview',
            isDummyField: true,
            text: 'Prw',
            align: "center",
            title: () => 'Preview',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('35px', 'center'),
            formatter: (cell, row) => {
                const {help} = row;
                return (
                    <a href="#" className="badge badge-info"
                       onClick={() => setPreviewMode({mode: true, previewHelp: help})}>
                        <FaEye/>
                    </a>
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
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('35px', 'center'),
            formatter: (cell, row) => {
                const {helpId} = row;
                return (
                    <a href="#" className="badge badge-success"
                       onClick={() => setEditMode({mode: true, editableHelpId: helpId})}>
                        <FaPencilAlt/>
                    </a>
                );
            },
            hidden: !authorization.isAtLeastInstructor
        },
        {
            dataField: 'delete',
            isDummyField: true,
            editable: false,
            text: 'Del',
            align: 'center',
            title: () => 'Delete',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('35px', 'center'),
            formatter: (cell, row) => {
                const {helpId} = row;
                return (
                    <a href="#" className="badge badge-warning"
                       onClick={() => setDeleteMode({mode: true, deletableHelpId: helpId})}>
                        <FaTrashAlt/>
                    </a>
                );
            },
            hidden: !authorization.isAtLeastInstructor
        },
    ];

    return (
        <div className="pb-5">
            <BootstrapTable bootstrap4 striped hover condensed
                            remote={{filter: false, pagination: false, sort: false, cellEdit: true}}
                            keyField='helpId'
                            data={helps}
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
                preview.mode &&
                <HelpMod show={preview.mode} hideHelp={deactivatePreviewModal}
                                   content={preview.previewHelp}/>
            }
            {
                edit.mode &&
                <HelpEditModal show={edit.mode} deactivateModal={deactivateEditModal}
                                editableHelpId={edit.editableHelpId}/>
            }
            {
                remove.mode &&
                <ConfirmModal show={remove.mode} deactivateModal={deactivateDeleteModal}
                              action="Delete the selected help?"
                              params={[remove.deletableHelpId]}
                              doActionIfOK={props.deleteHelp}/>
            }
        </div>
    );
};

HelpsTable.propTypes = {
    authorization: PropTypes.object.isRequired,
    helps: PropTypes.array.isRequired,
    expanded: PropTypes.bool.isRequired,

    deleteHelp: PropTypes.func.isRequired,
    onTableChange: PropTypes.func.isRequired
};

export default HelpsTable;