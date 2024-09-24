import React, {useState} from 'react';
// @ts-ignore
import BootstrapTable from 'react-bootstrap-table-next';
// @ts-ignore
import paginationFactory from 'react-bootstrap-table2-paginator';
// @ts-ignore
import cellEditFactory from 'react-bootstrap-table2-editor';
// @ts-ignore
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
// @ts-ignore
import {FaPencilAlt, FaRegCopy, FaTrashAlt} from "react-icons/fa";
import ConfirmModal from "../../common/components/ConfirmModal";
import {minLength2, required} from "../../../utils/validators/validators";
// @ts-ignore
import {defaultSorted} from "../../../utils/constants";
import {utilsCSS} from "../../../utils/utilsCSS";
import '../../../../main.css';
import {OverlayTrigger, Popover} from "react-bootstrap";
// @ts-ignore
import {CopyToClipboard} from "react-copy-to-clipboard";
import {LMS} from "../types/LMS";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import LmsEditModal from "./LmsEditModal";
import {deleteLMS} from "../actions/lmsActions";

type Props = {
    authorization: Authorization,
    lms: Array<LMS>,
    expanded: boolean,
    onTableChange: (type: string, {cellEdit}: any) => void;
}

const LmsTable: React.FC<Props> = props => {

    const dispatch: Dispatch<any> = useDispatch();

    const initEditState = {mode: false, editableLmsId: 0};

    const initDeleteState = {mode: false, deletableLmsId: 0};

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
            title: (cell: any) => cell,
            style: !expanded ? utilsCSS.getShortCellStyle : null,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('350px', 'left'),
            validator: (newValue: any) => {
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
            title: (cell: any): string => `LTI version: ${cell}`,
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
            title: (cell: any) => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'center'),
            formatter: (): string => '********'
        },
        {
            dataField: 'credentials.secret',
            text: 'Client Secret',
            isDummyField: true,
            editable: false,
            align: 'center',
            title: (cell: any) => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('150px', 'center'),
            formatter: (): string => '****************'
        },
        {
            dataField: 'copyLMS',
            isDummyField: true,
            editable: false,
            text: 'cLMS',
            align: 'center',
            title: (): string => 'Copy name',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell: any, row: any) => {
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
            title: (): string => 'Copy key',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell: any, row: any) => {
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
            title: (): string => 'Copy Secret',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell: any, row: any) => {
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
            title: (): string => 'Copy Passport',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell: any, row: any) => {
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
            formatter: (cell: any, row: any) => {
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
            title: (): string => 'Delete',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell: any, row: any) => {
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
                              doActionIfOK={() => dispatch(deleteLMS(remove.deletableLmsId))}/>
            }
        </div>
    );
};

export default LmsTable;