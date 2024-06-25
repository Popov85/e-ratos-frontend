import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import {FaArrowRight, FaFilm, FaImage, FaItunesNote, FaWpforms} from "react-icons/fa";
import {minLength2, required} from "../../../utils/validators";
import {staffFilter} from "../../../utils/filters/staffFilter";
import {utilsCSS} from "../../../utils/utilsCSS";
import '../../../../main.css';
import ResourcePreloader from "./ResourcePreloader";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {utilsTable} from "../../../utils/utilsTable";

const ResourcesLookupTable = props => {

    const {resources, expanded} = props;

    const resourceTooltip = (link, width, height) => {
        return (
            <Tooltip placement = "left">
                <ResourcePreloader url={link} width={width} height={height} message = "Loading.."/>
            </Tooltip>
        );
    }

    const columns = [
        {
            dataField: 'resourceId',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'width',
            text: 'width',
            hidden: true
        },
        {
            dataField: 'height',
            text: 'height',
            hidden: true
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: true,
            filter: textFilter({
                style: utilsCSS.getDefaultFilterStyle('13px')
            }),
            title: cell => cell,
            style: !expanded ? utilsCSS.getShortCellStyle('13px') : null,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('150px', 'left', '13px'),
            validator: (newValue) => {
                if (required(newValue) || minLength2(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid name!'
                    };
                }
                return true;
            },
            editable: false
        },
        {
            dataField: 'staff',
            text: 'Created by',
            sort: true,
            sortFunc: (a, b, order) => staffFilter.getStaffSorted(a, b, order),
            filter: textFilter({
                onFilter: staffFilter.getStaffFiltered,
                style: utilsCSS.getDefaultFilterStyle('13px')
            }),
            formatter: (cell, row) => {
                const {name, surname} = row.staff;
                return `${surname} ${name}`;
            },
            style: utilsCSS.getShortCellStyle('13px'),
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'left', '13px'),
            title: cell => `${cell.name} ${cell.surname} (${cell.position})`,
            editable: false
        },
        {
            dataField: 'lastUsed',
            text: 'Last used',
            sort: true,
            align: 'left',
            title: cell => cell,
            style: utilsCSS.getShortCellStyle('13px'),
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'left', '13px'),
            editable: false
        },
        {
            dataField: 'type',
            text: 'Res',
            align: "center",
            title: cell => cell,
            style: !expanded ? utilsCSS.getShortCellStyle('13px') : null,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('35px', 'center', '13px'),
            formatter: (cell, row) => {
                const {link, width, height} = row;
                if (cell==='image') return (
                    <OverlayTrigger
                        trigger="click"
                        placement="left"
                        overlay={resourceTooltip(link, width, height)}>
                        <a href ="#" className="badge badge-secondary p-1"><FaImage color="white"/></a>
                    </OverlayTrigger>
                );
                if (cell==='audio') return (
                    <OverlayTrigger
                        trigger="click"
                        placement="left"
                        overlay={resourceTooltip(link, width, height)}>
                        <a href ="#" className="badge badge-secondary p-1"><FaItunesNote color="white"/></a>
                    </OverlayTrigger>
                );
                if (cell==='video') return (
                    <OverlayTrigger
                        trigger="click"
                        placement="left"
                        overlay={resourceTooltip(link, width, height)}>
                        <a href ="#" className="badge badge-secondary p-1"><FaFilm color="white"/></a>
                    </OverlayTrigger>
                );
                return (
                    <OverlayTrigger
                        trigger="click"
                        placement="left"
                        overlay={resourceTooltip(link, width, height)}>
                        <a href ="#" className="badge badge-secondary p-1"><FaWpforms color="white"/></a>
                    </OverlayTrigger>
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
                       onClick={() => props.selectResource(row)}>
                        <FaArrowRight/>
                    </a>
                );
            }
        }
    ];

    return (
        <div className="pb-5">
            <BootstrapTable bootstrap4 striped hover condensed
                            keyField='resourceId'
                            data={resources}
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
        </div>
    );
};

ResourcesLookupTable.propTypes = {
    userInfo: PropTypes.object.isRequired,
    resources: PropTypes.array.isRequired,

    selectResource: PropTypes.func.isRequired
};

export default ResourcesLookupTable;