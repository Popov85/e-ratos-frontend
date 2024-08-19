import React, {useState} from 'react';
//@ts-ignore
import BootstrapTable from 'react-bootstrap-table-next';
//@ts-ignore
import paginationFactory from 'react-bootstrap-table2-paginator';
//@ts-ignore
import cellEditFactory from 'react-bootstrap-table2-editor';
//@ts-ignore
import filterFactory, {selectFilter, textFilter} from 'react-bootstrap-table2-filter';
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {deleteDep} from "../actions/departmentsActions";
import {TableObject} from "../types/table/TableObject";
import {Department} from "../types/Department";
import DepEditModal from "./DepEditModal";

const initState = {mode: false, editableDepId: undefined};

type Props = {
    authorization: Partial<Authorization>;
    departments: Array<Department>;
    organisations: TableObject | null;
    faculties: TableObject | null;
    onTableChange: (type: string, {cellEdit}: any) => void;
}

const DepTable: React.FC<Props> = ({authorization, departments, faculties, organisations, onTableChange}) => {

    if (!organisations || !faculties) return null;

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
            dataField: 'depId',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'faculty.organisation.orgId',
            text: 'Organisation',
            sort: true,
            filter: selectFilter({
                options: organisations
            }),
            formatter: (cell: any) => organisations[cell],
            title: (cell: any) => cell,
            editable: false,
            hidden: !authorization.isGlobalAdmin,
        },
        {
            dataField: 'faculty.facId',
            text: 'Faculty',
            sort: true,
            filter: selectFilter({
                options: faculties
            }),
            formatter: (cell: any) => faculties[cell],
            title: (cell: any) => cell,
            editable: false,
            hidden: !authorization.isAtLeastOrgAdmin,
        },

        {
            dataField: 'name',
            text: 'Department',
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
            title: (): string => 'Update',
            headerStyle: () => {
                return {width: '40px', textAlign: 'center'};
            },
            formatter: (cell: any, row: any) => {
                const {depId} = row;
                return (
                    <a href="#" className="badge badge-info"
                       onClick={() => setEditMode({mode: true, editableDepId: depId})}>
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
                const {depId} = row;
                return (
                    <a href="#" className="badge badge-warning" onClick={() => dispatch(deleteDep(depId))}>
                        <FaTrashAlt/>
                    </a>);
            }
        },
    ];

    return (
        <div>
            <BootstrapTable bootstrap4 striped hover condensed
                            remote={{filter: false, pagination: false, sort: false, cellEdit: true}}
                            keyField='depId'
                            data={departments}
                            columns={columns}
                            defaultSorted={defaultSorted}
                            filter={filterFactory()}
                            pagination={paginationFactory({
                                showTotal: true,
                                pageStartIndex: 0,
                                sizePerPageList: [
                                    {text: '20', value: 20},
                                    {text: '50', value: 50},
                                    {text: 'All', value: departments.length}
                                ]
                            })}
                            headerClasses="thead-light"
                            cellEdit={cellEditFactory({mode: 'dbclick'})}
                            noDataIndication={(): string => "No data!"}
                            onTableChange={onTableChange}
            />
            {
                edit.mode &&
                <DepEditModal show={edit.mode} deactivateModal={deactivateModal} editableDepId={edit.editableDepId}/>
            }
        </div>
    );
};

export default DepTable;