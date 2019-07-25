import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from "./Login";
import { FaSignInAlt } from 'react-icons/fa';

class RegistrationSuccess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // Return back to login with new username & password
            isLogin: false,
        }
    }

    render() {
        const { isLogin } = this.state;
        if (isLogin) {
            const { email, password } = this.props;
            return <Login username={email} password={password} />;
        }
        return (<div className="container-fluid">
            <div className="row mt-5">
                <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                    <div className="card bg-transparent">
                        <div className="card-header pt-1 pb-1">
                            <small><div className="text-secondary text-center">Registration</div></small>
                        </div>
                        <div className="card-body">
                            <div className="alert alert-success text-center p-1" role="success">
                                <strong>Successful registration!</strong>
                            </div>
                            <div className="form-group text-center mb-n1">
                                <button type="button" value="Sign In" className="btn btn-sm btn-success pl-5 pr-5"
                                    onClick={() => this.setState({ isLogin: true })}>
                                    <div className="align-middle"><FaSignInAlt color="white" /> Sign In</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-1 col-sm-2 col-md-3 col-lg-4" />
            </div>
        </div>);
    }
}

RegistrationSuccess.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
};

export default RegistrationSuccess;