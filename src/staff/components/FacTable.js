import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {selectFilter, textFilter} from 'react-bootstrap-table2-filter';
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import FacEditModal from "./FacEditModal";

const initState = {mode: false, editableFacId: null};

const FacTable = props => {

    const [edit, setEditMode] = useState(initState);

    const deactivateModal = () => {
        setEditMode(initState);
    }

    const {userInfo, faculties, organisations} = props;
    const {authenticated} = userInfo;

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
            formatter: cell => organisations[cell],
            title: cell => cell,
            editable: false,
            hidden: authenticated.isGlobalAdmin ? false : true,
        },
        {
            dataField: 'name',
            text: 'Faculty',
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
                const {facId} = row;
                return (
                    <a href="#" className="badge badge-info" onClick={() => setEditMode({mode: true, editableFacId: facId})}>
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
                const {facId} = row;
                return (
                    <a href="#" className="badge badge-warning" onClick={() => props.deleteFac(facId)}>
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
                            noDataIndication={() => "No data!"}
                            onTableChange={props.onTableChange}
            />
            {
                edit.mode &&
                <FacEditModal show={edit.mode} deactivateModal={deactivateModal} editableFacId = {edit.editableFacId}/>
            }
        </div>
    );
};

FacTable.propTypes = {
    userInfo: PropTypes.object.isRequired,
    faculties: PropTypes.array.isRequired,
    organisations: PropTypes.object,
    onTableChange: PropTypes.func.isRequired
};

export default FacTable;