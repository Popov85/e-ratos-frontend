import React, {useEffect} from 'react';
import Failure from "../../common/components/Failure";
//@ts-ignore
import FacEditForm from "../forms/FacEditForm";
import {Redirect} from "react-router-dom";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {clearFacState, saveFac, updateFac} from "../actions/facEditActions";
import {RootState} from "../../../store/rootReducer";
import {getUserInfo} from "../../common/selectors/userSelector";
import {UserInfo} from "../../common/types/UserInfo";
import {getAllOrgForNew} from "../selectors/organisationsSelector";
import {TableSelect} from "../types/table/TableSelect";
import {reset} from "redux-form";
import {FacultyInput} from "../_api/facultiesAPI";
import {getFacById} from "../selectors/facultiesSelector";

type Props = {
    facId?: number;
}

const FacEdit: React.FC<Props> =({facId}) => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    const userInfo: UserInfo | null = useSelector((state: RootState) => getUserInfo(state));

    if (!logged || !authorization || !userInfo) return null;

    const facEdit = useSelector((state: RootState) => state.staff.facEdit);

    const organisations: TableSelect[] | null = useSelector((state: RootState) => getAllOrgForNew(state));

    const faculty = facId ? useSelector((state: RootState) => getFacById(state, {facId})) : null;

    useEffect(() => {
        // Clear all previous messages
        dispatch(clearFacState());
    }, []);

    const handleSubmit = (data: FacultyInput): void => {
        if (!data.orgId) {
            data.orgId = userInfo.staff!.department.faculty.organisation.orgId;
        }
        !data.facId ? dispatch(saveFac(data)) : dispatch(updateFac(data));
    };

    if (!authorization.isAtLeastOrgAdmin) return <Redirect to="/unauthorized" />;

    const { isLoading, error, message } = facEdit;

    return (
        <div>
            <div className="row mt-1">
                <div className="col-12">
                    {isLoading && (
                        <div className="text-center text-secondary m-2">
                            <span>Saving...</span>
                        </div>
                    )}
                    {error && (
                        <div className="alert alert-danger text-center p-1" role="alert">
                            <span className="text-danger">
                                <strong>
                                    <Failure message={error.message} />
                                </strong>
                            </span>
                        </div>
                    )}
                    {message && (
                        <div className="alert alert-success text-center p-1" role="success">
                            <span className="text-success">
                                <strong>{message}</strong>
                            </span>
                        </div>
                    )}
                    <div className="card bg-transparent">
                        <div className="card-body">
                            <FacEditForm
                                initialValues={
                                    faculty
                                        ? {
                                            facId: faculty.facId,
                                            name: faculty.name,
                                            orgId: faculty.organisation?.orgId,
                                        }
                                        : undefined
                                }
                                authorization={authorization}
                                organisations={organisations}
                                disabled={isLoading}
                                finished={!!message}
                                onSubmit={handleSubmit}
                            />
                        </div>
                        <div className="form-group text-center mt-n2 mb-2" hidden={!!message}>
                            <a href="#" className="badge badge-secondary" onClick={()=>dispatch(reset('fac-edit'))}>
                                Reset
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacEdit;
