import React, {Component} from 'react';
import PasswordResetForm from "../forms/PasswordResetForm";
import PropTypes from "prop-types";
import LoginContainer from "../containers/LoginContainer";
import Failure from "./Failure";

class PasswordReset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resCancelled: false
        };
    }

    handleSubmit(data) {
        const email = data.email;
        this.props.getPasswordReset(email);
    }

    render () {
        const { resCancelled} = this.state;
        if (resCancelled) return <LoginContainer/>;
        const { passReset} = this.props;
        return (
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                        <div className="card bg-transparent">
                            <div className="card-header pt-1 pb-1">
                                <small>
                                    <div className="text-secondary text-center">Reset password</div>
                                </small>
                            </div>
                            <div className="card-body">
                                {
                                    passReset.isPerforming &&
                                    <div className="text-center text-info mt-n2 mb-2">
                                            <span>Submitting...
                                                <div className="spinner-grow spinner-grow-sm text-info" role="checking"/>
                                            </span>
                                    </div>
                                }
                                {
                                    passReset.error &&
                                    <div className="alert alert-danger p-1" role="alert">
                                        <Failure message={passReset.error.message}/>
                                    </div>
                                }
                                <PasswordResetForm
                                    onSubmit = {data=>this.handleSubmit(data)}
                                />
                            </div>
                            <div className="card-footer pt-0 pb-0">
                                <div className="d-flex justify-content-center">
                                    <small><a href="#" onClick={() => this.setState({resCancelled: true})}>Back to login</a></small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"/>

                </div>
            </div>
        );
    }
}

PasswordReset.propTypes = {
    passReset: PropTypes.object.isRequired,
    getPasswordReset: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
};

export default PasswordReset;
