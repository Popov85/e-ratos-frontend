import React, {useEffect} from 'react';
import Failure from "../../common/components/Failure";
import {Redirect} from "react-router-dom";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {UserInfo} from "../../common/types/UserInfo";
import {getUserInfo} from "../../common/selectors/userSelector";
import {FormSelect} from "../types/form/FormSelect";
import {getAllOrgForNew} from "../selectors/organisationsSelector";
import {getAllFacForNewByOrgId} from "../selectors/facultiesSelector";
import {clearDepState, saveDep, updateDep} from "../actions/depEditActions";
import {clearOrgIdSelected, setOrgIdSelected} from "../actions/organisationsActions";
import {reset} from "redux-form";
import {DepartmentInput} from "../_api/departmentsAPI";
import {getDepById} from "../selectors/departmentsSelector";
import {Department} from "../types/Department";
import DepEditForm from "../forms/DepEditForm";


type Props = {
    depId?: number;
}

const DepEdit: React.FC<Props> = ({depId}) => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    const userInfo: UserInfo | null = useSelector((state: RootState) => getUserInfo(state));

    if (!logged || !authorization || !userInfo) return null;

    const depEdit = useSelector((state: RootState) => state.staff.depEdit);

    const organisations: Array<FormSelect> | null = useSelector((state: RootState) => getAllOrgForNew(state, {}));

    const faculties: Array<FormSelect> | null = useSelector((state: RootState) => getAllFacForNewByOrgId(state));

    const department: Department | null = depId ? useSelector((state: RootState) => getDepById(state, {depId: depId})) : null;


    useEffect(() => {
        dispatch(clearDepState());
        dispatch(clearOrgIdSelected());
        if (department && department.faculty && department.faculty.organisation) {
            dispatch(setOrgIdSelected(Number(department.faculty.organisation.orgId)));
        }
    }, []);

    const handleSubmit = (data: DepartmentInput): void => {
        if (!data.facId) {
            data.facId = userInfo!.staff!.department.faculty.facId;
        }
        if (!data.depId) {
            dispatch(saveDep(data));
        } else {
            dispatch(updateDep(data));
        }
    };

    if (!authorization.isAtLeastFacAdmin) {
        return <Redirect to="/unauthorized"/>;
    }

    const {isLoading, error, message} = depEdit;

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
                                    <Failure message={error.message}/>
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
                            <DepEditForm
                                initialValues={
                                    department
                                        ? {
                                            depId: department.depId as number,
                                            name: department.name,
                                            facId: department.faculty!.facId as number,
                                            orgId: department.faculty!.organisation!.orgId as number,
                                        }
                                        : undefined
                                }
                                authorization={authorization}
                                organisations={organisations}
                                faculties={faculties}
                                disabled={isLoading}
                                finished={!!message}
                                onSubmit={handleSubmit}
                            />
                        </div>
                        <div className="form-group text-center mt-n2 mb-2" hidden={!!message}>
                            <a href="#" className="badge badge-secondary" onClick={() => dispatch(reset('dep-edit'))}>
                                Reset
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepEdit;