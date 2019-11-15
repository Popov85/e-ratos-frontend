import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory, {Type} from 'react-bootstrap-table2-editor';
import filterFactory, {selectFilter, textFilter} from 'react-bootstrap-table2-filter';
import overlayFactory from 'react-bootstrap-table2-overlay';
import {FaPencilAlt} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import {email, minLength2} from "../../utils/validators";
import {getPositions} from "../selectors/positionsSelector";

const UsersTable = props => {

    const {users} = props;

    const columns = [
        {
            dataField: 'staffId',
            text: 'ID',
            hidden: true
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
            }
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
            }
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
            }
        },
        {
            dataField: 'user.role',
            text: 'Role',
            sort: true,
            filter: selectFilter({
                options: {
                    'ROLE_DEP-ADMIN': 'ROLE_DEP-ADMIN',
                    'ROLE_INSTRUCTOR': 'ROLE_INSTRUCTOR',
                    'ROLE_LAB-ASSISTANT': 'ROLE_LAB-ASSISTANT'
                }
            }),
            style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '13px'
            },
            editor: {
                type: Type.SELECT,
                options: [{
                    value: 'ROLE_LAB-ASSISTANT',
                    label: 'ROLE_LAB-ASSISTANT'
                }, {
                    value: 'ROLE_INSTRUCTOR',
                    label: 'ROLE_INSTRUCTOR'
                }, {
                    value: 'ROLE_DEP-ADMIN',
                    label: 'ROLE_DEP-ADMIN'
                }]
            }
        },
        {
            dataField: 'position.name',
            text: 'Position',
            sort: true,
            filter: selectFilter({
                options: getPositions(users)
            }),
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
                return (
                    <LinkContainer to={`/users/edit/${row.staffId}`}>
                        <a href="#" className="badge badge-info">
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
            data={users}
            loading={ props.isUpdating }
            columns={columns}
            filter={filterFactory()}
            pagination={paginationFactory({
                showTotal: true,
                pageStartIndex: 0,
                sizePerPageList: [
                    {text: '20', value: 20},
                    {text: '50', value: 50},
                    {text: 'All', value: users.length}
                ]
            })
            }
            cellEdit={cellEditFactory({mode: 'dbclick'})}
            overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' }) }
            onTableChange={props.onTableChange}
        />
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onTableChange: PropTypes.func.isRequired,
    isUpdating: PropTypes.bool.isRequired
};

export default UsersTable;