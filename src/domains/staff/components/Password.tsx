import React, {useEffect, useState} from 'react';

import Failure from "../../common/components/Failure";
import {LinkContainer} from "react-router-bootstrap";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {clearUserPasswordFailure, getPasswordUpdated} from "../actions/profileAction";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {UserInfo} from "../../common/types/UserInfo";
import {getUserInfo} from "../../common/selectors/userSelector";
import {Password} from "../types/Password";
import PasswordsForm, {PasswordEditOwnProps} from "../forms/PasswordsForm";


const Password: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    const userInfo: UserInfo | null = useSelector((state: RootState) => getUserInfo(state));

    if (!logged || !authorization || !userInfo) return null;

    const profile = useSelector((state: RootState) => state.staff.profile);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        dispatch(clearUserPasswordFailure());
    }, []);

    const handleSubmit = (password: PasswordEditOwnProps): void => {
        const pass: Password = {
            oldPass: password.oldPass,
            newPass: password.password
        }
        dispatch(getPasswordUpdated(pass));
    };

    const {isPasswordUpdating, errorUpdatingPassword, message} = profile;

    return (
        <div className="container-fluid p-0">
            <div className="p-1">
                <div className="alert alert-secondary text-center">
                    <h5 className="alert-heading">
                        <strong>Password [edit]</strong>
                    </h5>
                </div>
                <div className="row mt-1">
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                        {isPasswordUpdating && (
                            <div className="text-center text-secondary m-2">
                                <span>Saving...</span>
                            </div>
                        )}
                        {errorUpdatingPassword && (
                            <div className="alert alert-danger text-center p-1" role="alert">
                                <span className="text-danger">
                                    <strong>
                                        <Failure message={errorUpdatingPassword.message}/>
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
                            <div className="ratos-form-card card-body">
                                <div className="text-right" title="Show password">
                                    <a
                                        href="#"
                                        className="badge badge-info mb-2"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FaEye color="white" style={{fontSize: '1.25em'}}/>
                                        ) : (
                                            <FaEyeSlash color="white" style={{fontSize: '1.25em'}}/>
                                        )}
                                    </a>
                                </div>
                                <PasswordsForm
                                    onSubmit={handleSubmit}
                                    disabled={isPasswordUpdating}
                                    showPassword={showPassword}
                                />
                            </div>
                            <div className="card-footer pt-1 pb-1">
                                <LinkContainer to={`/staff/profile`}>
                                    <div className="text-center">
                                        <a href="#" className="badge badge-secondary">
                                            Back to profile
                                        </a>
                                    </div>
                                </LinkContainer>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"/>
                </div>
            </div>
        </div>
    );
};

export default Password;