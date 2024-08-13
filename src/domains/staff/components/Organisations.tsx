import React, {useEffect, useState} from 'react';
import {FaPlus, FaSync} from "react-icons/fa";
// @ts-ignore
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
//@ts-ignore
import OrgTable from "./OrgTable";
//@ts-ignore
import OrgEditModal from "./OrgEditModal";
import {Redirect} from "react-router-dom";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {clearAllOrgFailures, getAllOrganisations, updateOrgName} from "../actions/organisationsActions";


const Organisations: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    if (!logged || !authorization) return null;

    const organisations: any = useSelector((state: RootState) => state.staff.organisations);

    const [newMode, setNewMode] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getAllOrganisations());
    }, []);

    const deactivateModal = () => {
        setNewMode(false);
    };

    const handleUpdate = (orgId: number, dataField: string, newValue: string): void => {
        if (dataField === "name") {
            dispatch(updateOrgName(orgId, newValue));
        }
    };

    const handleTableChange = (type: string, {cellEdit}: {
        cellEdit: { rowId: number, dataField: string, newValue: string }
    }) => {
        if (cellEdit) {
            const {rowId, dataField, newValue} = cellEdit;
            handleUpdate(rowId, dataField, newValue);
        }
    };

    if (!authorization.isGlobalAdmin) return <Redirect to="/unauthorized"/>;

    const {content, isLoading, isUpdating, error, errorUpdate} = organisations;

    return (
        <div className="container-fluid p-0">
            <div className="row p-3">
                <div className="col-12">
                    {(error || errorUpdate) && (
                        <Error message="Operation failed!" close={() => dispatch(clearAllOrgFailures())}/>
                    )}
                    {!isLoading && (
                        <div className="text-right mb-1">
                            <button className="btn btn-sm btn-success" onClick={() => setNewMode(true)}>
                                <FaPlus/>&nbsp;New
                            </button>
                            <button className="btn btn-sm btn-info ml-2" onClick={() => dispatch(getAllOrganisations())}>
                                <FaSync/>&nbsp;Refresh
                            </button>
                        </div>
                    )}
                    {content && (
                        <div className="pb-5">
                            <LoadingOverlay active={!!isUpdating} spinner text='Performing API call...'>
                                <OrgTable
                                    organisations={content}
                                    //deleteOrg={deleteOrg} // TODO: move!
                                    onTableChange={handleTableChange}
                                />
                            </LoadingOverlay>
                        </div>
                    )}
                    <Overlay show={!!isLoading}/>
                    {newMode && <OrgEditModal show={newMode} deactivateModal={deactivateModal}/>}
                </div>
            </div>
        </div>
    );
};

export default Organisations;