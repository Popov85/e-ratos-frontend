import React, {useEffect, useState} from 'react';
import {FaPlus, FaSync} from "react-icons/fa";
// @ts-ignore
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
import {Redirect} from "react-router-dom";
// @ts-ignore
import FacEditModal from "./FacEditModal";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {getAllOrgForFilter} from "../selectors/organisationsSelector";
import {
    clearAllFacFailures,
    getAllFacultiesBunchByRatos,
    getAllFacultiesByOrganisation,
    updateFacName
} from "../actions/facultiesActions";
import FacTable from "./FacTable";
import {TableObject} from "../types/table/TableObject";


const Faculties: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    if (!logged || !authorization) return null;

    const faculties = useSelector((state: RootState) => state.staff.faculties);

    const organisations: TableObject | null = useSelector((state: RootState) => getAllOrgForFilter(state, {}));

    const [newMode, setNewMode] = useState<boolean>(false);

    useEffect(() => {
        loadFacultiesBasedOnRole();
    }, []);

    const loadFacultiesBasedOnRole = (): void => {
        if (authorization.isGlobalAdmin) {
            dispatch(getAllFacultiesBunchByRatos());
        } else {
            dispatch(getAllFacultiesByOrganisation());
        }
    };

    const handleTableChange = (type: string, {cellEdit}: any): void => {
        if (cellEdit) {
            const {rowId, dataField, newValue} = cellEdit;
            handleUpdate(rowId, dataField, newValue);
        }
    };

    const handleUpdate = (facId: number, dataField: string, newValue: string): void => {
        if (dataField === "name") {
            dispatch(updateFacName(facId, newValue));
        }
    };

    if (!authorization.isAtLeastOrgAdmin) return <Redirect to='/unauthorized'/>;

    const {isLoading, isUpdating, error, errorUpdate, content} = faculties;

    return (
        <div className="container-fluid p-0">
            <div className="row p-3">
                <div className="col-12">
                    {(error || errorUpdate) && (
                        <Error message="Operation failed!" close={() => dispatch(clearAllFacFailures())}/>
                    )}
                    {!isLoading && (
                        <div className="text-right mb-1">
                            <button className="btn btn-sm btn-success" onClick={() => setNewMode(true)}>
                                <FaPlus/>&nbsp;New
                            </button>
                            <button className="btn btn-sm btn-info ml-2" onClick={loadFacultiesBasedOnRole}>
                                <FaSync/>&nbsp;Refresh
                            </button>
                        </div>
                    )}
                    {content && (
                        <div className="pb-5">
                            <LoadingOverlay active={isUpdating} spinner text="Performing API call...">
                                <FacTable
                                    faculties={content}
                                    organisations={organisations}
                                    onTableChange={handleTableChange}
                                />
                            </LoadingOverlay>
                        </div>
                    )}
                    <Overlay show={isLoading}/>
                    {newMode && (
                        <FacEditModal show={newMode} deactivateModal={() => setNewMode(false)}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Faculties;