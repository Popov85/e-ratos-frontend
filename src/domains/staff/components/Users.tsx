import React, {useEffect, useState} from 'react';
// @ts-ignore
import LoadingOverlay from 'react-loading-overlay';
import {FaCompress, FaExpand, FaPlus, FaSync} from 'react-icons/fa';
import Error from '../../common/components/Error';
import Overlay from '../../common/components/Overlay';
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
    getAllStaffByRatos,
    updateStaffEmail,
    updateStaffName,
    updateStaffSurname
} from "../actions/usersActions";
import {getPositions} from "../actions/positionsActions";
import UsersTable from "./UsersTable";
import StaffEditModal from "./StaffEditModal";

const Users: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    const userInfo: UserInfo | null = useSelector((state: RootState) => getUserInfo(state));

    const users = useSelector((state: RootState) => state.staff.users);

    if (!logged || !authorization || !userInfo) return null;

    const positions = useSelector((state: RootState) => state.staff.positions);

    const [newMode, setNewMode] = useState<boolean>(false);

    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getPositions());
        loadStaffBasedOnRole();
    }, []);

    const deactivateModal = (): void => {
        setNewMode(false);
    };

    const expandedSwitch = (): void => {
        setExpanded(!expanded);
    };

    const loadStaffBasedOnRole = (): void => {
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

    const handleUpdate = (staffId: number, dataField: string, newValue: string): void => {
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
                    <Error message="Operation failed!" close={() => dispatch(clearAllStaffFailures())}/>
                )}
                {!isLoading && (
                    <div className="d-flex justify-content-between mb-1">
                        <div>
                            {users.content && users.content.length > 0 && (
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
                {positions.actual && positions.actual.length > 0 && users.content && users.content.length > 0 && (
                    <div>
                        <LoadingOverlay
                            active={!!isUpdating}
                            spinner
                            text="Performing API call..."
                        >
                            <UsersTable
                                authorization={authorization}
                                userInfo={userInfo}
                                expanded={expanded}
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
