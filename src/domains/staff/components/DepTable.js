import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {selectFilter, textFilter} from 'react-bootstrap-table2-filter';
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import DepEditModal from "./DepEditModal";

const initState = {mode: false, editableDepId: null};

const DepTable = props => {

    const [edit, setEditMode] = useState(initState);

    const deactivateModal = () => {
        setEditMode(initState);
    }

    const {authorization, departments, faculties, organisations} = props;

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
            formatter: cell => organisations[cell],
            title: cell => cell,
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
            formatter: cell => faculties[cell],
            title: cell => cell,
            editable: false,
            hidden: !authorization.isAtLeastOrgAdmin,
        },

        {
            dataField: 'name',
            text: 'Department',
            sort: true,
            filter: textFilter(),
            title: cell => cell,
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
            formatter: (cell, row) => {
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
            title: () => 'Delete',
            headerStyle: () => {
                return {width: '40px', textAlign: 'center'};
            },
            formatter: (cell, row) => {
                const {depId} = row;
                return (
                    <a href="#" className="badge badge-warning" onClick={() => props.deleteDep(depId)}>
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
                            noDataIndication={() => "No data!"}
                            onTableChange={props.onTableChange}
            />
            {
                edit.mode &&
                <DepEditModal show={edit.mode} deactivateModal={deactivateModal} editableDepId={edit.editableDepId}/>
            }
        </div>
    );
};

DepTable.propTypes = {
    authorization: PropTypes.object.isRequired,
    departments: PropTypes.array.isRequired,
    faculties: PropTypes.object,
    organisations: PropTypes.object,

    deleteDep: PropTypes.func.isRequired,
    onTableChange: PropTypes.func.isRequired
};

export default DepTable;