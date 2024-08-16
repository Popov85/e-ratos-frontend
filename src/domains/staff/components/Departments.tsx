import React, {useEffect, useState} from 'react';
import {FaPlus, FaSync} from "react-icons/fa";
// @ts-ignore
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
import {Redirect} from "react-router-dom";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {getAllOrgForFilter} from "../selectors/organisationsSelector";
import {getAllFacForFilter} from "../selectors/facultiesSelector";
import {
    clearAllDepFailures,
    getAllDepartmentsBunchByOrganisation,
    getAllDepartmentsBunchByRatos,
    getAllDepartmentsByFaculty,
    updateDepName
} from "../actions/departmentsActions";
import DepTable from "./DepTable";
import {TableObject} from "../types/table/TableObject";
import DepEditModal from "./DepEditModal";

const Departments: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    if (!logged || !authorization) return null;

    const departments = useSelector((state: RootState) => state.staff.departments);

    const {isLoading, isUpdating, error, errorUpdate, content} = departments;

    const organisations: TableObject | null = useSelector((state: RootState) => getAllOrgForFilter(state, {}));

    const faculties: TableObject | null = useSelector((state: RootState) => getAllFacForFilter(state, {}));

    const [newMode, setNewMode] = useState<boolean>(false);

    useEffect(() => {
        loadDepartmentsBasedOnRole();
    }, []);

    const loadDepartmentsBasedOnRole = (): void => {
        const {isGlobalAdmin, isAtLeastOrgAdmin} = authorization;
        if (isGlobalAdmin) {
            dispatch(getAllDepartmentsBunchByRatos());
        } else if (isAtLeastOrgAdmin) {
            dispatch(getAllDepartmentsBunchByOrganisation());
        } else {
            dispatch(getAllDepartmentsByFaculty());
        }
    };

    const deactivateModal = (): void => {
        setNewMode(false);
    };

    const handleUpdate = (facId: number, dataField: string, newValue: string): void => {
        if (dataField === "name") {
            dispatch(updateDepName(facId, newValue));
        }
    };

    const handleTableChange = (type: string, {cellEdit}: any): void => {
        if (cellEdit) {
            const {rowId, dataField, newValue} = cellEdit;
            handleUpdate(rowId, dataField, newValue);
        }
    };

    if (!authorization.isAtLeastFacAdmin) return <Redirect to='/unauthorized'/>;

    return (
        <div className="container-fluid p-0">
            <div className="row p-3">
                <div className="col-12">
                    {(error || errorUpdate) && (
                        <Error message="Operation failed!" close={() => dispatch(clearAllDepFailures())}/>
                    )}
                    {!isLoading && (
                        <div className="text-right mb-1">
                            <button className="btn btn-sm btn-success" onClick={() => setNewMode(true)}>
                                <FaPlus/>&nbsp;New
                            </button>
                            <button className="btn btn-sm btn-info ml-2" onClick={loadDepartmentsBasedOnRole}>
                                <FaSync/>&nbsp;Refresh
                            </button>
                        </div>
                    )}
                    {content && content.length > 0 && (
                        <div className="pb-5">
                            <LoadingOverlay active={isUpdating} spinner text='Performing API call...'>
                                <DepTable
                                    authorization={authorization!}
                                    departments={content}
                                    organisations={organisations}
                                    faculties={faculties}
                                    onTableChange={handleTableChange}
                                />
                            </LoadingOverlay>
                        </div>
                    )}
                    <Overlay show={isLoading}/>
                    {newMode && (
                        <DepEditModal show={newMode} deactivateModal={deactivateModal}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Departments;