import React, {useEffect, useState} from 'react';
// @ts-ignore
import LoadingOverlay from 'react-loading-overlay';

// @ts-ignore
import UsersTable from './UsersTable';
import {FaCompress, FaExpand, FaPlus, FaSync} from 'react-icons/fa';
import Error from '../../common/components/Error';
import Overlay from '../../common/components/Overlay';
// @ts-ignore
import StaffEditModal from './StaffEditModal';
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {UserInfo} from "../../common/types/UserInfo";
import {getUserInfo} from "../../common/selectors/userSelector";
import {
    clearAllStaffFailures,
    getAllStaffByDepartment,
    getAllStaffByFaculty,
    getAllStaffByOrganisation,
    getAllStaffByRatos, updateStaffEmail, updateStaffName, updateStaffSurname
} from "../actions/usersActions";

const Users: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    const userInfo: UserInfo | null = useSelector((state: RootState) => getUserInfo(state));

    if (!logged || !authorization || !userInfo) return null;

    const users: any = useSelector((state: RootState) => state.staff.users);

    const roles: any = null; // useSelector((state: RootState) => state.staff.roles); //TODO

    const positions: any = useSelector((state: RootState) => state.staff.positions);


    const [newMode, setNewMode] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        //dispatch(getPositions()); //TODO
        loadStaffBasedOnRole();
    }, []);

    const deactivateModal = () => {
        setNewMode(false);
    };

    const expandedSwitch = () => {
        setExpanded(!expanded);
    };

    const loadStaffBasedOnRole = () => {
        const {isGlobalAdmin, isAtLeastOrgAdmin, isAtLeastFacAdmin} = authorization;

        if (isGlobalAdmin) {
            dispatch(getAllStaffByRatos());
        } else if (isAtLeastOrgAdmin) {
            dispatch(getAllStaffByOrganisation());
        } else if (isAtLeastFacAdmin) {
            dispatch(getAllStaffByFaculty());
        } else {
            dispatch(getAllStaffByDepartment());
        }
    };

    const handleUpdate = (staffId: number, dataField: string, newValue: string) => {
        switch (dataField) {
            case 'user.name':
                dispatch(updateStaffName(staffId, newValue));
                break;
            case 'user.surname':
                dispatch(updateStaffSurname(staffId, newValue));
                break;
            case 'user.email':
                dispatch(updateStaffEmail(staffId, newValue));
                break;
            default:
                break;
        }
    };

    const handleTableChange = (type: string, {cellEdit}: any): void => {
        if (cellEdit) {
            const {rowId, dataField, newValue} = cellEdit;
            handleUpdate(rowId, dataField, newValue);
        }
    };

    const {isLoading, isUpdating, error, errorUpdate} = users;

    return (
        <div className="container-fluid p-0">
            <div className="p-1">
                <div className="alert alert-secondary text-center mb-1">
                    <h5 className="alert-heading">
                        <strong>Staff management</strong>
                    </h5>
                </div>
                {(error || errorUpdate) && (
                    <Error message="Operation failed!" close={()=>dispatch(clearAllStaffFailures())}/>
                )}
                {!isLoading && (
                    <div className="d-flex justify-content-between mb-1">
                        <div>
                            {users.content && (
                                <button
                                    type="button"
                                    className="btn btn-sm btn-secondary"
                                    title="Expand/compress"
                                    onClick={expandedSwitch}
                                >
                                    {expanded ? <FaCompress/> : <FaExpand/>}
                                </button>
                            )}
                        </div>
                        <div>
                            <button
                                className="btn btn-sm btn-success"
                                onClick={() => setNewMode(true)}
                            >
                                <FaPlus/>&nbsp;New
                            </button>
                            <button
                                className="btn btn-sm btn-info ml-2"
                                onClick={loadStaffBasedOnRole}
                            >
                                <FaSync/>&nbsp;Refresh
                            </button>
                        </div>
                    </div>
                )}
                {positions.actual && users.content && (
                    <div>
                        <LoadingOverlay
                            active={!!isUpdating}
                            spinner
                            text="Performing API call..."
                        >
                            <UsersTable
                                roles={roles}
                                users={users}
                                userInfo={userInfo}
                                authorization={authorization}
                                positions={positions}
                                expanded={expanded}
                                //deleteStaff={deleteStaff} //TODO: to move!
                                onTableChange={handleTableChange}
                            />
                        </LoadingOverlay>
                    </div>
                )}

                <Overlay show={!!isLoading}/>
                {newMode && (
                    <StaffEditModal show={newMode} deactivateModal={deactivateModal}/>
                )}
            </div>
        </div>
    );
};

export default Users;
