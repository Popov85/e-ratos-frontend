import React, {useState} from 'react';
//@ts-ignore
import BootstrapTable from 'react-bootstrap-table-next';
//@ts-ignore
import paginationFactory from 'react-bootstrap-table2-paginator';
//@ts-ignore
import cellEditFactory from 'react-bootstrap-table2-editor';
//@ts-ignore
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import {Organisation} from "../types/Organisation";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {deleteOrg} from "../actions/organisationsActions";
import OrgEditModal from "./OrgEditModal";

const initState: { mode: boolean, editableOrgId: number | undefined } = {mode: false, editableOrgId: undefined};

type Props = {
    organisations: Array<Organisation>;
    onTableChange: (type: string, {cellEdit}: {
        cellEdit: { rowId: number; dataField: string; newValue: string; };
    }) => void;
}

const OrgTable: React.FC<Props> = ({organisations, onTableChange}) => {

    const dispatch: Dispatch<any> = useDispatch();

    const [edit, setEditMode] = useState(initState);

    const deactivateModal = (): void => {
        setEditMode(initState);
    }

    const defaultSorted = [{
        dataField: 'name',
        order: 'asc'
    }];

    const columns = [
        {
            dataField: 'orgId',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'name',
            text: 'Organisation',
            sort: true,
            filter: textFilter(),
            title: (cell: any) => cell,
            editable: true
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
            formatter: (cell: any, row: any) => {
                const {orgId} = row;
                return (
                    <a href="#" className="badge badge-info"
                       onClick={() => setEditMode({mode: true, editableOrgId: orgId})}>
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
            title: (): string => 'Delete',
            headerStyle: () => {
                return {width: '40px', textAlign: 'center'};
            },
            formatter: (cell: any, row: any) => {
                const {orgId} = row;
                return (
                    <a href="#" className="badge badge-warning" onClick={() => dispatch(deleteOrg(orgId))}>
                        <FaTrashAlt/>
                    </a>);
            }
        },
    ];


    return (
        <div>
            <BootstrapTable bootstrap4 striped hover condensed
                            remote={{filter: false, pagination: false, sort: false, cellEdit: true}}
                            keyField='orgId'
                            data={organisations}
                            columns={columns}
                            defaultSorted={defaultSorted}
                            filter={filterFactory()}
                            pagination={paginationFactory({
                                showTotal: true,
                                pageStartIndex: 0,
                                sizePerPageList: [
                                    {text: '5', value: 5},
                                    {text: 'All', value: organisations.length}
                                ]
                            })}
                            headerClasses="thead-light"
                            cellEdit={cellEditFactory({mode: 'dbclick'})}
                            noDataIndication={(): string => "No data!"}
                            onTableChange={onTableChange}
            />
            {
                edit.mode &&
                <OrgEditModal show={edit.mode} deactivateModal={deactivateModal} editableOrgId={edit.editableOrgId}/>
            }
        </div>
    );
};

export default OrgTable;