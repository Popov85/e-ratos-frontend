import React, {useState} from 'react';
// @ts-ignore
import BootstrapTable from 'react-bootstrap-table-next';
// @ts-ignore
import paginationFactory from 'react-bootstrap-table2-paginator';
// @ts-ignore
import cellEditFactory from 'react-bootstrap-table2-editor';
// @ts-ignore
import filterFactory, {selectFilter, textFilter} from 'react-bootstrap-table2-filter';
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {Dispatch} from "redux";
import {deleteFac} from "../actions/facultiesActions";
import {Faculty} from "../types/Faculty";
import {TableObject} from "../types/table/TableObject";
import FacEditModal from "./FacEditModal";

const initState = {mode: false, editableFacId: undefined};

type Props = {
    faculties: Faculty[];
    organisations: TableObject | null;
    onTableChange: (type: string, {cellEdit}: any) => void
}

const FacTable: React.FC<Props> = ({faculties, organisations, onTableChange}) => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    if (!logged || !authorization) return null;

    if (!organisations) return null;

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
            dataField: 'facId',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'organisation.orgId',
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
            dataField: 'name',
            text: 'Faculty',
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
                const {facId} = row;
                return (
                    <a href="#" className="badge badge-info"
                       onClick={() => setEditMode({mode: true, editableFacId: facId})}>
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
                const {facId} = row;
                return (
                    <a href="#" className="badge badge-warning" onClick={() => dispatch(deleteFac(facId))}>
                        <FaTrashAlt/>
                    </a>);
            }
        },
    ];

    return (
        <div>
            <BootstrapTable bootstrap4 striped hover condensed
                            remote={{filter: false, pagination: false, sort: false, cellEdit: true}}
                            keyField='facId'
                            data={faculties}
                            columns={columns}
                            defaultSorted={defaultSorted}
                            filter={filterFactory()}
                            pagination={paginationFactory({
                                showTotal: true,
                                pageStartIndex: 0,
                                sizePerPageList: [
                                    {text: '20', value: 20},
                                    {text: 'All', value: faculties.length}
                                ]
                            })}
                            headerClasses="thead-light"
                            cellEdit={cellEditFactory({mode: 'dbclick'})}
                            noDataIndication={(): string => "No data!"}
                            onTableChange={onTableChange}
            />
            {
                edit.mode &&
                <FacEditModal show={edit.mode} deactivateModal={deactivateModal} editableFacId={edit.editableFacId}/>
            }
        </div>
    );
};

export default FacTable;