import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {FaArrowRight, FaEye} from "react-icons/fa";
import {staffFilter} from "../../utils/filters/staffFilter";
import {utilsCSS} from "../../utils/utilsCSS";
import '../../../main.css';
import {utilsTable} from "../../utils/utilsTable";
import HelpMod from "../../session/components/HelpMod";

const HelpsLookupTable = props => {

    const initPreviewState = {mode: false, previewHelp: null};
    const [preview, setPreviewMode] = useState(initPreviewState);
    const deactivatePreviewModal = () => setPreviewMode(initPreviewState);

    const {helps, expanded} = props;

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
            filter: textFilter({
                style: utilsCSS.getDefaultFilterStyle('13px')
            }),
            title: cell => cell,
            style: !expanded ? utilsCSS.getShortCellStyle('13px') : null,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'left', '13px'),
            editable: false
        },
        {
            dataField: 'help',
            text: 'Help',
            sort: true,
            filter: textFilter({
                style: utilsCSS.getDefaultFilterStyle('13px')
            }),
            title: cell => cell,
            style: !expanded ? utilsCSS.getShortCellStyle('13px') : null,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('150px', 'left', '13px'),
            editable: false
        },
        {
            dataField: 'staff',
            text: 'Created by',
            sort: true,
            style: utilsCSS.getShortCellStyle('13px'),
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'left', '13px'),
            title: cell => `${cell.name} ${cell.surname} (${cell.position})`,
            sortFunc: (a, b, order) => staffFilter.getStaffSorted(a, b, order),
            formatter: (cell, row) => {
                const {name, surname} = row.staff;
                return `${surname} ${name}`;
            },
            filter: textFilter({
                onFilter: staffFilter.getStaffFiltered,
                style: utilsCSS.getDefaultFilterStyle('13px')
            }),
            editable: false
        },
        {
            dataField: 'preview',
            isDummyField: true,
            text: 'Prw',
            align: "center",
            title: () => 'Preview',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('35px', 'center', '13px'),
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
            dataField: 'select',
            isDummyField: true,
            editable: false,
            text: 'Sel',
            align: 'center',
            title: () => 'Select',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('35px', 'center', '13px'),
            formatter: (cell, row) => {
                return (
                    <a href="#" className="badge badge-warning"
                       onClick={() => props.selectHelp(row)}>
                        <FaArrowRight/>
                    </a>
                );
            }
        }
    ];

    return (
        <div className="pb-5">
            <BootstrapTable bootstrap4 striped hover condensed
                            keyField='helpId'
                            data={helps}
                            columns={columns}
                            filter={filterFactory()}
                            pagination={paginationFactory({
                                showTotal: true,
                                pageStartIndex: 1,
                                paginationSize: 2,
                                sizePerPageList: [
                                    {text: '5', value: 5},
                                    {text: '10', value: 10}
                                ],
                                paginationTotalRenderer: utilsTable.getCustomTotal,
                                sizePerPageRenderer: utilsTable.getCustomSizePerPageRenderer,
                                pageButtonRenderer: utilsTable.getCustomPageButtonRenderer
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
        </div>
    );
};

HelpsLookupTable.propTypes = {
    userInfo: PropTypes.object.isRequired,
    helps: PropTypes.array.isRequired,

    selectHelp: PropTypes.func.isRequired
};

export default HelpsLookupTable;