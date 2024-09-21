import React, {useEffect} from 'react';
import Failure from "../../common/components/Failure";
import LmsEditForm from "../forms/LmsEditForm";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {UserInfo} from "../../common/types/UserInfo";
import {getUserInfo} from "../../common/selectors/userSelector";
import {saveLMS, updateLMS} from "../actions/lmsEditActions";
import {reset} from "redux-form";
import {LMS} from "../types/LMS";
import {getLMSById} from "../selectors/lmsSelector";
import {clearLMSState} from "../reducers/lmsEditReducer";

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

    const {isLoading, errorMessage, successMessage} = lmsEdit;

    return (
        <div>
            <div className="row mt-1">
                <div className="col-12">
                    {isLoading && (
                        <div className="text-center text-secondary m-2">
                            <span>Saving...</span>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger text-center p-1" role="alert">
                            <span className="text-danger">
                                <strong>
                                    <Failure message={errorMessage}/>
                                </strong>
                            </span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="alert alert-success text-center p-1" role="success">
                            <span className="text-success">
                                <strong>{successMessage}</strong>
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
                                finished={!!successMessage}
                                disabled={isLoading}
                                onSubmit={handleSubmit}
                            />
                        </div>
                        <div className="form-group text-center mt-n2 mb-2" hidden={!!successMessage}>
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