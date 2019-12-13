import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import filterFactory, {selectFilter, textFilter} from 'react-bootstrap-table2-filter';
import {FaPencilAlt} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import {email, minLength2} from "../../utils/validators";
import {isRoleManageable} from "../../utils/security";

const UsersTable = props => {

    const {userInfo, users, positions, roles} = props;

    const {content, organisations, faculties, departments} = users;
    
    const {authenticated} = userInfo

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
                if (minLength2(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid surname'
                    };
                }
                return true;
            },
            title: cell => cell,
        },
        {
            dataField: 'user.name',
            text: 'Name',
            sort: true,
            filter: textFilter(),
            validator: (newValue) => {
                if (minLength2(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid name'
                    };
                }
                return true;
            },
            title: cell => cell,
        },
        {
            dataField: 'user.email',
            text: 'Email',
            sort: true,
            filter: textFilter(),
            style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            },
            validator: (newValue) => {
                if (email(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid email'
                    };
                }
                return true;
            },
            title: cell => cell,
        },
        {
            dataField: 'user.role',
            text: 'Role',
            sort: true,
            filter: selectFilter({
                options: roles.forFilter
            }),
            style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '13px'
            },
            editor: {
                type: Type.SELECT,
                options: roles.forEdit
            },
            title: cell => cell,
            editable: (cell, row) => {
                return isRoleManageable(cell, props.userInfo.authenticated);
            }
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
            editor: {
                type: Type.SELECT,
                options: positions.forEdit
            },
            editable: true
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
            headerStyle: () => {
                return {width: '70px', textAlign: 'center'};
            },
            formatter: (cell, row) => {
                return cell ?
                    <span className="badge badge-success">Active</span> :
                    <span className="badge badge-danger">Inactive</span>;
            }
        },
        {
            dataField: 'edit',
            isDummyField: true,
            editable: false,
            text: 'Edit',
            align: 'center',
            title: ()=>'Edit',
            headerStyle: () => {
                return {width: '40px', textAlign: 'center'};
            },
            formatter: (cell, row) => {
                const {role} = row.user;
                const {authenticated} = props.userInfo;
                const isEditable = isRoleManageable(role, authenticated);
                return (
                    <LinkContainer to={`/users/edit/${row.staffId}`}>
                        <a href="#" className={`badge badge-${isEditable ? 'info':'danger'}`}>
                            <FaPencilAlt/>
                        </a>
                    </LinkContainer>);
            }
        },
    ];

    return (
        <BootstrapTable bootstrap4 striped hover condensed
            remote={{ filter: false, pagination: false, sort: false, cellEdit: true}}
            keyField='staffId'
            data={content}
            columns={columns}
            filter={filterFactory()}
            pagination={paginationFactory({
                showTotal: true,
                pageStartIndex: 0,
                sizePerPageList: [
                    {text: '20', value: 20},
                    {text: '50', value: 50},
                    {text: 'All', value: content.length}
                ]
            })}
            headerClasses="thead-light"
            cellEdit={cellEditFactory({mode: 'dbclick'})}
            noDataIndication={ ()=> "No data!"}
            onTableChange={props.onTableChange}
        />
    );
};

UsersTable.propTypes = {
    users: PropTypes.object.isRequired,
    roles: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    positions: PropTypes.object.isRequired,
    onTableChange: PropTypes.func.isRequired
};

export default UsersTable;