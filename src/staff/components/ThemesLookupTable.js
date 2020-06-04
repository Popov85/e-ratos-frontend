import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {selectFilter, textFilter} from 'react-bootstrap-table2-filter';
import {FaArrowRight, FaEye} from "react-icons/fa";
import {staffFilter} from "../../utils/filters/staffFilter";
import {defaultSorted} from "../../utils/constants";
import {utilsCSS} from "../../utils/utilsCSS";
import '../../../main.css';
import {utilsTable} from "../../utils/utilsTable";
import SchemeThemeEditModal from "./SchemeThemeEditModal";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import ThemesSupportContainer from "../containers/ThemesSupportContainer";

const ThemesLookupTable = props => {

    const initEditState = {mode: false, selectedThemeId: null, selectedTheme: null};

    const [edit, setEditMode] = useState(initEditState);

    const deactivateEditModal = () => setEditMode(initEditState);

    const themeSupportTooltip = themeId => {
        return (
            <Tooltip placement = "top">
                <ThemesSupportContainer themeId={themeId} action="peek"/>
            </Tooltip>
        );
    }

    const {themes, themesSupport, courses} = props;

    const columns = [
        {
            dataField: 'themeId',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'name',
            text: 'Theme',
            sort: true,
            filter: textFilter({
                style: utilsCSS.getDefaultFilterStyle('13px')
            }),
            title: cell => cell,
            style: utilsCSS.getShortCellStyle('13px'),
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'left', '13px'),
            editable: false
        },
        {
            dataField: 'course.courseId',
            text: 'Course',
            sort: true,
            filter: selectFilter({
                options: courses,
                style: utilsCSS.getDefaultFilterStyle('13px')
            }),
            formatter: cell => courses[cell],
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('150px', 'left', '13px'),
            title: cell => courses[cell],
            style: utilsCSS.getShortCellStyle('13px'),
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
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('100px', 'left','13px'),
            title: cell => `${cell.name} ${cell.surname} (${cell.position})`,
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
                const {themeId} = row;
                return (
                    <OverlayTrigger
                        trigger="click"
                        placement="top"
                        overlay={themeSupportTooltip(themeId)}>
                        <a href ="#" className="badge badge-info"><FaEye color="white"/></a>
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
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center', '13px'),
            formatter: (cell, row) => {
                const {themeId, name} = row;
                return (
                    <a href="#" className="badge badge-warning"
                       onClick={() => setEditMode({mode: true, selectedThemeId: themeId, selectedTheme: name})}>
                        <FaArrowRight/>
                    </a>);
            }
        },
    ];

    return (
        <div className="pb-5">
            {
                themesSupport.isLoading && <div className="text-center text-secondary">Loading....</div>
            }
            <BootstrapTable bootstrap4 striped hover condensed
                            remote={{filter: false, pagination: false, sort: false, cellEdit: true}}
                            keyField='themeId'
                            data={themes}
                            columns={columns}
                            defaultSorted={defaultSorted}
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
                edit.mode &&
                <SchemeThemeEditModal show={edit.mode} deactivateModal={deactivateEditModal} deactivateThemesLookupModal = {props.deactivateThemesLookupModal}
                                 selectedThemeId={edit.selectedThemeId} selectedTheme={edit.selectedTheme} fields = {props.fields}/>
            }
        </div>
    );
};

ThemesLookupTable.propTypes = {
    userInfo: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    themes: PropTypes.array.isRequired,
    themesSupport : PropTypes.object.isRequired,
    courses: PropTypes.object.isRequired,
    deactivateThemesLookupModal: PropTypes.func.isRequired,
    getAllQuestionsTypesAndLevelsByThemeId: PropTypes.func.isRequired
};

export default ThemesLookupTable;