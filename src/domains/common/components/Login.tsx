import React, {useEffect, useState} from 'react';

import '../../../../main.css';
import Failure from "./Failure";
import logo from '../../../assets/logo-white.png';
import Registration from "./Registration";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {SavedCredentials} from "../types/SavedCredentials";
import {getSavedCredentialsSelector} from "../selectors/registrationSelector";
import {RegOptions} from "../types/RegOptions";
import {Dispatch} from "redux";
import {getLogged} from "../actions/authActions";
import {reset} from "redux-form";
import {clearRegisteredCredentials, getRegOptions} from "../actions/registrationActions";
import {Credentials} from "../types/Credentials";
import LoginForm from "../forms/LoginForm";

const Login: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(getRegOptions());
    }, []);

    const [registration, setRegistration] = useState(false);

    const {isLoggingIn, errorLoggingIn} = useSelector((state: RootState) => ({
        isLoggingIn: state.auth.isLoggingIn,
        errorLoggingIn: state.auth.errorLoggingIn,
    }));
    const regOptions: RegOptions | null = useSelector((state: RootState) => state.registration.regOptions);
    const savedCredentials: SavedCredentials | null = useSelector((state: RootState) => getSavedCredentialsSelector(state))

    const handleSubmit = (data: any) => {
        const credentials: Credentials = {
            username: data.username,
            password: data.password,
            'remember-me': data.rememberMe ? 'on' : 'off',
        };
        dispatch(getLogged(credentials));
    };

    const renderFooter = () => {
        if (!regOptions || !regOptions.allowed) return null;
        return (
            <div className="text-center text-secondary">
                <small>Don't have an account?
                    <a href="#" onClick={() => setRegistration(true)}>
                        Sign Up
                    </a>
                </small>
            </div>
        );
    };

    if (registration) return <Registration/>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 d-none d-md-block" style={{height: '100vh', backgroundColor: '#17A2B8'}}>
                    {/* Left side content */}
                    <div className="d-flex align-items-start justify-content-center h-100">
                        <img className="img-fluid" src={logo} alt="logo" style={{width: '70%', marginTop: '15%'}}/>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12" style={{height: '100vh', backgroundColor: 'lightyellow'}}>
                    {/* Right side content */}
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <div className="card bg-transparent w-100">
                                <div className="card-header pt-1 pb-1">
                                    <small>
                                        <div className="text-secondary text-center">
                                            Welcome to e-Ratos! Please, enter your credentials.
                                        </div>
                                    </small>
                                </div>
                                <div className="card-body">
                                    {
                                        isLoggingIn &&
                                        <div className="text-center text-info mt-n2 mb-2">
                                            <span>Authentication...
                                                <div className="spinner-grow spinner-grow-sm text-info"
                                                     role="checking"/>
                                            </span>
                                        </div>
                                    }
                                    {
                                        errorLoggingIn &&
                                        <div className="alert alert-danger p-1" role="alert">
                                            <Failure message={errorLoggingIn.message}/>
                                        </div>
                                    }
                                    <LoginForm
                                        onSubmit={handleSubmit}
                                        initialValues={savedCredentials ? {
                                            username: savedCredentials.email,
                                            password: savedCredentials.password,
                                            rememberMe: false
                                        } : undefined}
                                        disabled={isLoggingIn}
                                    />
                                </div>
                                <div className="form-group text-center mt-n2 mb-2">
                                    <a href="#" className="badge badge-secondary" onClick={() => {
                                        dispatch(reset('login'));
                                        dispatch(clearRegisteredCredentials());
                                    }}>Reset</a>
                                </div>
                                <div className="card-footer pt-0 pb-0">
                                    {renderFooter()}
                                    <div className="d-flex justify-content-center">
                                        <small><a href="#">Forgot your password?</a></small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
