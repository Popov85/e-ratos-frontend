import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {FaPencilAlt, FaRegCopy, FaTrashAlt} from "react-icons/fa";
import ConfirmModal from "../../common/components/ConfirmModal";
import {minLength2, required} from "../../../utils/validators";
import {defaultSorted} from "../../../utils/constants";
import {utilsCSS} from "../../../utils/utilsCSS";
import '../../../../main.css';
import {OverlayTrigger, Popover} from "react-bootstrap";
import LmsEditModal from "./LmsEditModal";
import {CopyToClipboard} from "react-copy-to-clipboard";

const LmsTable = props => {
    const initEditState = {mode: false, editableLmsId: null};
    const initDeleteState = {mode: false, deletableLmsId: null};

    const [edit, setEditMode] = useState(initEditState);
    const [remove, setDeleteMode] = useState(initDeleteState);

    const deactivateEditModal = () => setEditMode(initEditState);
    const deactivateDeleteModal = () => setDeleteMode(initDeleteState);

    const {authorization, lms, expanded} = props;

    const ltiHeader = () => {
        return (
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <span>LTI</span>
            </OverlayTrigger>
        );
    }

    const popover = (
        <Popover id="lti-popover">
            <Popover.Title as="h3">Learning tool interoperability</Popover.Title>
            <Popover.Content>
                See <a href='https://www.imsglobal.org/specs/ltiv1p1/implementation-guide' target='_blank'>Standard</a>
            </Popover.Content>
        </Popover>
    );

    const columns = [
        {
            dataField: 'lmsId',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'name',
            text: 'LMS',
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
            editable: () => authorization.isAtLeastOrgAdmin
        },
        {
            dataField: 'ltiVersion.version',
            text: 'LTI',
            editable: false,
            align: 'center',
            title: cell => `LTI version: ${cell}`,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'center'),
            headerFormatter: ltiHeader
        },
        {
            dataField: 'credentials.key',
            text: 'Client Key',
            isDummyField: true,
            editable: false,
            align: 'center',
            title: cell => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'center'),
            formatter: () => '********'
        },
        {
            dataField: 'credentials.secret',
            text: 'Client Secret',
            isDummyField: true,
            editable: false,
            align: 'center',
            title: cell => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('150px', 'center'),
            formatter: () => '****************'
        },
        {
            dataField: 'copyLMS',
            isDummyField: true,
            editable: false,
            text: 'cLMS',
            align: 'center',
            title: () => 'Copy name',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {name} = row;
                return (
                    <CopyToClipboard text={name}>
                        <a href="#" className="badge badge-success">
                            <FaRegCopy/>
                        </a>
                    </CopyToClipboard>);
            }
        },
        {
            dataField: 'copyKey',
            isDummyField: true,
            editable: false,
            text: 'cKey',
            align: 'center',
            title: () => 'Copy key',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {credentials} = row;
                return (
                    <CopyToClipboard text={credentials.key}>
                        <a href="#" className="badge badge-success">
                            <FaRegCopy/>
                        </a>
                    </CopyToClipboard>);
            }
        },
        {
            dataField: 'copySecret',
            isDummyField: true,
            editable: false,
            text: 'cSec',
            align: 'center',
            title: () => 'Copy Secret',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {credentials} = row;
                return (
                    <CopyToClipboard text={credentials.secret}>
                        <a href="#" className="badge badge-success">
                            <FaRegCopy/>
                        </a>
                    </CopyToClipboard>);
            }
        },
        {
            dataField: 'copyPassport',
            isDummyField: true,
            editable: false,
            text: 'cPas',
            align: 'center',
            title: () => 'Copy Passport',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {name, credentials} = row;
                return (
                    <CopyToClipboard text={`${name}:${credentials.key}:${credentials.secret}`}>
                        <a href="#" className="badge badge-success">
                            <FaRegCopy/>
                        </a>
                    </CopyToClipboard>);
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
                const {lmsId} = row;
                return (
                    <a href="#" className="badge badge-success"
                       onClick={() => setEditMode({mode: true, editableLmsId: lmsId})}>
                        <FaPencilAlt/>
                    </a>);
            },
            hidden: !authorization.isAtLeastOrgAdmin
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
                const {lmsId} = row;
                return (
                    <a href="#" className="badge badge-warning"
                       onClick={() => setDeleteMode({mode: true, deletableLmsId: lmsId})}>
                        <FaTrashAlt/>
                    </a>);
            },
            hidden: !authorization.isAtLeastOrgAdmin
        },
    ];

    return (
        <div className="pb-5">
            <BootstrapTable bootstrap4 striped hover condensed
                            remote={{filter: false, pagination: false, sort: false, cellEdit: true}}
                            keyField='lmsId'
                            data={lms}
                            columns={columns}
                            defaultSorted={defaultSorted}
                            filter={filterFactory()}
                            pagination={paginationFactory({
                                showTotal: true,
                                pageStartIndex: 1,
                                sizePerPageList: [
                                    {text: '5', value: 5},
                                    {text: 'All', value: lms.length}
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
                <LmsEditModal show={edit.mode} deactivateModal={deactivateEditModal}
                              editableLmsId={edit.editableLmsId}/>
            }
            {
                remove.mode &&
                <ConfirmModal show={remove.mode} deactivateModal={deactivateDeleteModal}
                              action="Delete the selected LMS?"
                              params={[remove.deletableLmsId]}
                              doActionIfOK={props.deleteLMS}/>
            }
        </div>
    );
};

LmsTable.propTypes = {
    authorization: PropTypes.object.isRequired,
    lms: PropTypes.array.isRequired,
    expanded: PropTypes.bool.isRequired,

    deleteLMS: PropTypes.func.isRequired,
    onTableChange: PropTypes.func.isRequired
};

export default LmsTable;