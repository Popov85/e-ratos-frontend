import React, {useEffect, useState} from 'react';

import {FaCompress, FaExpand, FaPlus, FaSync} from "react-icons/fa";
// @ts-ignore
import LoadingOverlay from 'react-loading-overlay';
import Error from "../../common/components/Error";
import Overlay from "../../common/components/Overlay";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {UserInfo} from "../../common/types/UserInfo";
import {getUserInfo} from "../../common/selectors/userSelector";
import LmsTable from "./LmsTable";
import LmsEditModal from "./LmsEditModal";
import {getAllLMSByOrganisation, updateLMSName} from "../actions/lmsActions";
import {clearAllLMSFailures, clearLoadingFailure} from "../reducers/lmsReducer";


const Lms: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    const userInfo: UserInfo | null = useSelector((state: RootState) => getUserInfo(state));

    if (!logged || !authorization || !userInfo) return null;

    const lms = useSelector((state: RootState) => state.staff.lms);

    const [newMode, setNewMode] = useState<boolean>(false);

    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        loadLMSBasedOnRole();
    }, []);

    const loadLMSBasedOnRole = (): void => {
        dispatch(clearLoadingFailure())
        dispatch(getAllLMSByOrganisation());
    };

    const deactivateModal = (): void => {
        setNewMode(false);
    };

    const expandedSwitch = (): void => {
        setExpanded(prevExpanded => !prevExpanded);
    };

    const handleUpdate = (lmsId: number, dataField: string, newValue: string): void => {
        if (dataField === "name") {
            dispatch(updateLMSName({lmsId, name: newValue}));
        }
    };

    const handleTableChange = (type: string, {cellEdit}: { cellEdit: any }): void => {
        if (cellEdit) {
            const {rowId, dataField, newValue} = cellEdit;
            handleUpdate(rowId, dataField, newValue);
        }
    };

    const {isLoading, isUpdating, errorMessage, errorUpdateMessage, content} = lms;

    return (
        <div className="container-fluid p-0">
            <div className="p-1">
                <div className="alert alert-secondary text-center mb-1">
                    <h5 className="alert-heading">
                        <strong>LMS management</strong>
                    </h5>
                </div>
                {(errorMessage || errorUpdateMessage) && (
                    <Error message="Operation failed!" close={() => dispatch(clearAllLMSFailures())}/>
                )}
                {!isLoading && (
                    <div className="d-flex justify-content-between mb-1">
                        <div>
                            {content && (
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
                            {authorization.isAtLeastOrgAdmin && (
                                <button
                                    type="button"
                                    className="btn btn-sm btn-success"
                                    onClick={() => setNewMode(true)}
                                >
                                    <FaPlus/>&nbsp;New
                                </button>
                            )}
                            <button
                                type="button"
                                className="btn btn-sm btn-info ml-2"
                                onClick={loadLMSBasedOnRole}
                            >
                                <FaSync/>&nbsp;Refresh
                            </button>
                        </div>
                    </div>
                )}
                {content && (
                    <div className="pb-5">
                        <LoadingOverlay
                            active={isUpdating}
                            spinner
                            text='Performing API call...'
                        >
                            <LmsTable
                                authorization={authorization}
                                lms={content}
                                expanded={expanded}
                                onTableChange={handleTableChange}
                            />
                        </LoadingOverlay>
                    </div>
                )}
                <Overlay show={isLoading}/>
                {newMode && (
                    <LmsEditModal show={newMode} deactivateModal={deactivateModal}/>
                )}
            </div>
        </div>
    );
};

export default Lms;