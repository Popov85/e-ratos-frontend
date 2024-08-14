import React, {useEffect} from 'react';
import Failure from "../../common/components/Failure";
import {Redirect} from "react-router-dom";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {Organisation} from "../types/Organisation";
import {reset} from "redux-form";
import {getOrgById} from "../selectors/organisationsSelector";
import {clearOrgState, saveOrg, updateOrg} from "../actions/orgEditActions";
import OrgEditForm from "../forms/OrgEditForm";

type Props = {
    orgId?: number;
}

const OrgEdit: React.FC<Props> = ({orgId}) => {

    const dispatch: Dispatch<any> = useDispatch();

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    if (!authorization) return null;

    const org: Organisation | null = useSelector((state: RootState) => getOrgById(state, {orgId}));

    const orgEdit = useSelector((state: RootState) => state.staff.orgEdit);

    const {isLoading, error, message} = orgEdit;

    useEffect(() => {
        dispatch(clearOrgState());
    }, []);

    const handleSubmit = (data: Organisation): void => {
        if (!data.orgId) {
            dispatch(saveOrg(data));
        } else {
            dispatch(updateOrg(data));
        }
    };

    if (!authorization.isGlobalAdmin) return <Redirect to="/unauthorized" />;

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
                            <span className="text-success"><strong>{message}</strong></span>
                        </div>
                    )}
                    <div className="card bg-transparent">
                        <div className="card-body">
                            <OrgEditForm
                                initialValues={org ? { orgId: org.orgId, name: org.name } : undefined}
                                onSubmit={handleSubmit}
                                finished={!!message}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="form-group text-center mt-n2 mb-2" hidden={!!message}>
                            <a href="#" className="badge badge-secondary" onClick={()=>dispatch(reset('org-edit'))}>
                                Reset
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrgEdit;
