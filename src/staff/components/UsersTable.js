import React, {useState} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {selectFilter, textFilter} from 'react-bootstrap-table2-filter';
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import {email, minLength2, required} from "../../utils/validators";
import {isRoleManageable} from "../../utils/security";
import StaffEditModal from "./StaffEditModal";
import {cssUtils} from "../../utils/cssUtils";


const UsersTable = props => {
    const initEditState = {mode: false, editableStaffId: null};

    const [edit, setEditMode] = useState(initEditState);

    const deactivateEditModal = () => setEditMode(initEditState);

    const {userInfo, users, positions, roles, expanded} = props;

    const {content, organisations, faculties, departments} = users;

    const {authenticated} = userInfo;

    const columns = [
        {
            dataField: 'staffId',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'department.faculty.organisation.orgId',
            text: 'Organisation',
            sort: true,
            filter: selectFilter({
                options: organisations
            }),
            style: !expanded ? cssUtils.getShortCellStyle : null,
            headerStyle: () => cssUtils.getDefaultHeaderStyle('250px', 'left'),
            formatter: cell => organisations[cell],
            title: cell => organisations[cell],
            hidden: authenticated.isGlobalAdmin ? false : true,
            editable: false
        },
        {
            dataField: 'department.faculty.facId',
            text: 'Faculty',
            sort: true,
            filter: selectFilter({
                options: faculties
            }),
            style: !expanded ? cssUtils.getShortCellStyle : null,
            headerStyle: () => cssUtils.getDefaultHeaderStyle('250px', 'left'),
            formatter: cell => faculties[cell],
            title: cell => faculties[cell],
            hidden: authenticated.isAtLeastOrgAdmin ? false : true,
            editable: false
        },
        {
            dataField: 'department.depId',
            text: 'Department',
            sort: true,
            filter: selectFilter({
                options: departments
            }),
            style: !expanded ? cssUtils.getShortCellStyle : null,
            headerStyle: () => cssUtils.getDefaultHeaderStyle('250px', 'left'),
            formatter: cell => departments[cell],
            title: cell => departments[cell],
            hidden: authenticated.isAtLeastFacAdmin ? false : true,
            editable: false
        },
        {
            dataField: 'user.surname',
            text: 'Surname',
            sort: true,
            filter: textFilter(),
            validator: (newValue) => {
                if (required(newValue) || minLength2(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid surname'
                    };
                }
                return true;
            },
            title: cell => cell,
            style: cssUtils.getShortCellStyle,
            headerStyle: () => cssUtils.getDefaultHeaderStyle('150px', 'left'),
            editable:  (cell, row) => {
                const {role} = row.user;
                const {authenticated} = props.userInfo;
                return isRoleManageable(role, authenticated);
            }
        },
        {
            dataField: 'user.name',
            text: 'Name',
            sort: true,
            filter: textFilter(),
            validator: (newValue) => {
                if (required(newValue) || minLength2(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid name'
                    };
                }
                return true;
            },
            title: cell => cell,
            style: cssUtils.getShortCellStyle,
            headerStyle: () => cssUtils.getDefaultHeaderStyle('150px', 'left'),
            editable:  (cell, row) => {
                const {role} = row.user;
                const {authenticated} = props.userInfo;
                return isRoleManageable(role, authenticated);
            }
        },
        {
            dataField: 'user.email',
            text: 'Email',
            sort: true,
            filter: textFilter(),
            validator: (newValue) => {
                if (required(newValue) || email(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid email'
                    };
                }
                return true;
            },
            title: cell => cell,
            style: cssUtils.getShortCellStyle,
            headerStyle: () => cssUtils.getDefaultHeaderStyle('150px', 'left'),
            editable:  (cell, row) => {
                const {role} = row.user;
                const {authenticated} = props.userInfo;
                return isRoleManageable(role, authenticated);
            }
        },
        {
            dataField: 'user.role',
            text: 'Role',
            sort: true,
            filter: selectFilter({
                options: roles.forFilter
            }),
            title: cell => cell,
            style: cssUtils.getShortCellStyle,
            headerStyle: () => cssUtils.getDefaultHeaderStyle('150px', 'left'),
            editable: false
        },
        {
            dataField: 'position.posId',
            text: 'Position',
            sort: true,
            filter: selectFilter({
                options: positions.forFilter
            }),
            formatter: cell => positions.forFilter[cell],
            title: cell => positions.forFilter[cell],
            style: cssUtils.getShortCellStyle,
            headerStyle: () => cssUtils.getDefaultHeaderStyle('150px', 'left'),
            editable: false
        },
        {
            dataField: 'user.active',
            text: 'Active',
            filter: selectFilter({
                options: {
                    true: "true",
                    false: "false"
                }
            }),
            align: 'center',
            title: (cell) => `This user is ${cell ? 'active' : 'disabled'}`,
            headerStyle: () => cssUtils.getDefaultHeaderStyle('70px', 'center'),
            formatter: cell => {
                return cell ?
                    <span className="badge badge-success">Active</span> :
                    <span className="badge badge-danger">Inactive</span>;
            },
            editable: false
        },
        {
            dataField: 'edit',
            isDummyField: true,
            editable: false,
            text: 'Edit',
            align: 'center',
            title: () => 'Edit',
            headerStyle: () => cssUtils.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {staffId} = row;
                const {role} = row.user;
                const {authenticated} = props.userInfo;
                const isEditable = isRoleManageable(role, authenticated);
                return (
                    <a href="#" className={`badge badge-${isEditable ? 'info' : 'secondary'}`}
                       onClick={() => isEditable ? setEditMode({
                           mode: true,
                           editableStaffId: staffId
                       }) : null}>
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
            headerStyle: () => cssUtils.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell, row) => {
                const {staffId} = row;
                const {role} = row.user;
                const {authenticated} = props.userInfo;
                const isEditable = isRoleManageable(role, authenticated);
                return (
                    <a href="#" className={`badge badge-${isEditable ? 'warning' : 'secondary'}`}
                       onClick={() => isEditable ? props.deleteStaff(staffId) : null}>
                        <FaTrashAlt/>
                    </a>);
            }
        },
    ];

    return (
        <div className="pb-5">
            <BootstrapTable bootstrap4 striped hover condensed
                            remote={{filter: false, pagination: false, sort: false, cellEdit: true}}
                            keyField='staffId'
                            data={content}
                            columns={columns}
                            filter={filterFactory()}
                            pagination={paginationFactory({
                                showTotal: true,
                                pageStartIndex: 1,
                                sizePerPageList: [
                                    {text: '10', value: 10},
                                    {text: '30', value: 30},
                                    {text: 'All', value: content.length}
                                ]
                            })}
                            headerClasses="thead-light"
                            wrapperClasses="table-responsive"
                            cellEdit={cellEditFactory({mode: 'dbclick'})}
                            noDataIndication={() => "No data!"}
                            onTableChange={props.onTableChange}
            />
            {
                edit.mode &&
                <StaffEditModal show={edit.mode} deactivateModal={deactivateEditModal}
                                editableStaffId={edit.editableStaffId}/>
            }
        </div>
    );
};

UsersTable.propTypes = {
    userInfo: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    roles: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,

    positions: PropTypes.object.isRequired,
    deleteStaff: PropTypes.func.isRequired,
    onTableChange: PropTypes.func.isRequired
};

export default UsersTable;