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
import {email, minLength2, required} from "../../../utils/validators/validators";
import {UserInfo} from "../../common/types/UserInfo";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {deleteStaff} from "../actions/usersActions";
import {Roles} from "../objects/Roles";
import {RootState} from "../../../store/rootReducer";
import {getRoles} from "../selectors/rolesSelector";
import StaffEditModal from "./StaffEditModal";
import {utilsCSS} from "../../../utils/utilsCSS";
import {isRoleManageable} from "../../../utils/security";

type Props = {
    authorization: Authorization;
    userInfo: UserInfo;
    expanded: boolean
    onTableChange: (type: string, {cellEdit}: any) => void
}

const UsersTable: React.FC<Props> = props => {

    const dispatch: Dispatch<any> = useDispatch();

    const users = useSelector((state: RootState) => state.staff.users);

    const positions = useSelector((state: RootState) => state.staff.positions);

    const roles: Roles | null = useSelector((state: RootState) => getRoles(state));

    if (!positions || !roles) return null;

    const initEditState = {mode: false, editableStaffId: undefined};

    const [edit, setEditMode] = useState(initEditState);

    const deactivateEditModal = () => setEditMode(initEditState);

    const {authorization, expanded} = props;

    const {content, organisations, faculties, departments} = users;

    if (!content || !organisations || !faculties || !departments) return null;

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
            style: !expanded ? utilsCSS.getShortCellStyle : null,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('250px', 'left'),
            formatter: (cell: any) => organisations[cell],
            title: (cell: any) => organisations[cell],
            hidden: !authorization.isGlobalAdmin,
            editable: false
        },
        {
            dataField: 'department.faculty.facId',
            text: 'Faculty',
            sort: true,
            filter: selectFilter({
                options: faculties
            }),
            style: !expanded ? utilsCSS.getShortCellStyle : null,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('250px', 'left'),
            formatter: (cell: any) => faculties[cell],
            title: (cell: any) => faculties[cell],
            hidden: !authorization.isAtLeastOrgAdmin,
            editable: false
        },
        {
            dataField: 'department.depId',
            text: 'Department',
            sort: true,
            filter: selectFilter({
                options: departments
            }),
            style: !expanded ? utilsCSS.getShortCellStyle : null,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('250px', 'left'),
            formatter: (cell: any) => departments[cell],
            title: (cell: any) => departments[cell],
            hidden: !authorization.isAtLeastFacAdmin,
            editable: false
        },
        {
            dataField: 'user.surname',
            text: 'Surname',
            sort: true,
            filter: textFilter(),
            validator: (newValue: any) => {
                if (required(newValue) || minLength2(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid surname'
                    };
                }
                return true;
            },
            title: (cell: any) => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('150px', 'left'),
            editable: (cell: any, row: any) => {
                const {role} = row.user;
                return isRoleManageable(role, props.userInfo.role);
            }
        },
        {
            dataField: 'user.name',
            text: 'Name',
            sort: true,
            filter: textFilter(),
            validator: (newValue: any) => {
                if (required(newValue) || minLength2(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid name'
                    };
                }
                return true;
            },
            title: (cell: any) => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('150px', 'left'),
            editable: (cell: any, row: any) => {
                const {role} = row.user;
                return isRoleManageable(role, props.userInfo.role);
            }
        },
        {
            dataField: 'user.email',
            text: 'Email',
            sort: true,
            filter: textFilter(),
            validator: (newValue: any) => {
                if (required(newValue) || email(newValue)) {
                    return {
                        valid: false,
                        message: 'Invalid email'
                    };
                }
                return true;
            },
            title: (cell: any) => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('150px', 'left'),
            editable: (cell: any, row: any) => {
                const {role} = row.user;
                return isRoleManageable(role, props.userInfo.role);
            }
        },
        {
            dataField: 'user.role',
            text: 'Role',
            sort: true,
            filter: selectFilter({
                options: roles.forFilter
            }),
            title: (cell: any) => cell,
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('150px', 'left'),
            editable: false
        },
        {
            dataField: 'position.posId',
            text: 'Position',
            sort: true,
            filter: selectFilter({
                options: positions.forFilter
            }),
            formatter: (cell: any) => positions.forFilter[cell],
            title: (cell: any) => positions.forFilter[cell],
            style: utilsCSS.getShortCellStyle,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('150px', 'left'),
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
            title: (cell: any): string => `This user is ${cell ? 'active' : 'disabled'}`,
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('70px', 'center'),
            formatter: (cell: any) => {
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
            title: (): string => 'Edit',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell: any, row: any) => {
                const {staffId} = row;
                const {role} = row.user;
                const isEditable: boolean = isRoleManageable(role, props.userInfo.role);
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
            title: (): string => 'Delete',
            headerStyle: () => utilsCSS.getDefaultHeaderStyle('40px', 'center'),
            formatter: (cell: any, row: any) => {
                const {staffId} = row;
                const {role} = row.user;
                const isEditable: boolean = isRoleManageable(role, props.userInfo.role);
                return (
                    <a href="#" className={`badge badge-${isEditable ? 'warning' : 'secondary'}`}
                       onClick={() => isEditable ? dispatch(deleteStaff(staffId)) : null}>
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
                            noDataIndication={(): string => "No data!"}
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

export default UsersTable;