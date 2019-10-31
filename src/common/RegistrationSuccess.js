import React, {useState} from 'react';
import {FaSignInAlt} from 'react-icons/fa';
import LoginContainer from "./containers/LoginContainer";

const RegistrationSuccess = (props) => {

    const [state, setState] = useState({OK: false});

    if (state.OK) return <LoginContainer/>;

    return (<div className="container-fluid">
        <div className="row mt-5">
            <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
            <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                <div className="card bg-transparent">
                    <div className="card-header pt-1 pb-1">
                        <small>
                            <div className="text-secondary text-center">Registration</div>
                        </small>
                    </div>
                    <div className="card-body">
                        <div className="alert alert-success text-center p-1" role="success">
                            <strong>Successful registration!</strong>
                        </div>
                        <div className="form-group text-center mb-n1">
                            <button type="button" value="Sign In" className="btn btn-sm btn-success pl-5 pr-5"
                                    onClick={() => setState({OK: true})}>
                                <div className="align-middle"><FaSignInAlt color="white"/> Sign In</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-1 col-sm-2 col-md-3 col-lg-4"/>
        </div>
    </div>);
}


export default RegistrationSuccess;