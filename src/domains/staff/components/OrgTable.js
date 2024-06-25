import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import OrgEditModal from "./OrgEditModal";

const initState = {mode: false, editableOrgId: null};

const OrgTable = props => {

    const [edit, setEditMode] = useState(initState);

    const deactivateModal = () => {
        setEditMode(initState);
    }

    const {organisations} = props;

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
                const {orgId} = row;
                return (
                    <a href="#" className="badge badge-info"
                       onClick={() => setEditMode({mode: true, editableOrgId: orgId})} >
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
                const {orgId} = row;
                return (
                    <a href="#" className="badge badge-warning" onClick={() => props.deleteOrg(orgId)}>
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
                            noDataIndication={() => "No data!"}
                            onTableChange={props.onTableChange}
            />
            {
                edit.mode &&
                <OrgEditModal show={edit.mode} deactivateModal={deactivateModal} editableOrgId = {edit.editableOrgId}/>
            }
        </div>
    );
};

OrgTable.propTypes = {
    organisations: PropTypes.array.isRequired,
    onTableChange: PropTypes.func.isRequired
};

export default OrgTable;