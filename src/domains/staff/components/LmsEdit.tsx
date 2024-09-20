import React, {useEffect} from 'react';
import Failure from "../../common/components/Failure";
// @ts-ignore
import LmsEditForm from "../forms/LmsEditForm";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {UserInfo} from "../../common/types/UserInfo";
import {getUserInfo} from "../../common/selectors/userSelector";
import {clearLMSState, saveLMS, updateLMS} from "../actions/lmsEditActions";
import {reset} from "redux-form";
import {LMS} from "../types/LMS";
import {getLMSById} from "../selectors/lmsSelector";

type Props = {
    lmsId?: number
}

const LmsEdit: React.FC<Props> = ({lmsId}) => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    const userInfo: UserInfo | null = useSelector((state: RootState) => getUserInfo(state));

    if (!logged || !authorization || !userInfo) return null;

    const lmsEdit = useSelector((state: RootState) => state.staff.lmsEdit);

    const lms: LMS | null = useSelector((state: RootState) => getLMSById(state, {lmsId: lmsId}));

    useEffect(() => {
        dispatch(clearLMSState());
    }, []);

    const handleSubmit = (data: any) => {
        if (!data.lmsId) {
            dispatch(saveLMS(data));
        } else {
            dispatch(updateLMS(data));
        }
    };

    const {isLoading, error, message} = lmsEdit;

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
                            <LmsEditForm
                                initialValues={
                                    lms
                                        ? {
                                            lmsId: lms.lmsId,
                                            name: lms.name,
                                            key: lms?.credentials?.key,
                                            secret: lms?.credentials?.secret,
                                            versionId: lms?.ltiVersion?.versionId,
                                        }
                                        : undefined
                                }
                                finished={!!message}
                                disabled={isLoading}
                                onSubmit={handleSubmit}
                            />
                        </div>
                        <div className="form-group text-center mt-n2 mb-2" hidden={!!message}>
                            <a href="#" className="badge badge-secondary" onClick={() => dispatch(reset('lms-edit'))}>
                                Reset
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LmsEdit;