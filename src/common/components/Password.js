import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Failure from "./Failure";
import {LinkContainer} from "react-router-bootstrap";
import {PasswordsDto} from "../../objects/PasswordsDto";
import PasswordsForm from "../forms/PasswordsForm";
import {FaEye, FaEyeSlash} from "react-icons/fa";

class Password extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false
        }
    }
    //Clear all messages
    componentDidMount() {
        this.props.clearUserPasswordFailure();
    }

    handleSubmit(data) {
        let passwordsDTO = new PasswordsDto(
            data.oldPass, data.password);
        console.log("passwordsDTO  = ", passwordsDTO);
        this.props.getPasswordUpdated(passwordsDTO);
    }

    render() {
        const {isPasswordUpdating, errorUpdatingPassword, message} = this.props.profile;
        return (
            <div className="p-1">
                <div className="alert alert-secondary text-center">
                    <h5 className="alert-heading">
                        <strong>Password [edit]</strong>
                    </h5>
                </div>
                <div className="row mt-1">
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                        {
                            isPasswordUpdating &&
                            <div className="text-center text-secondary m-2">
                                <span>Saving...</span>
                            </div>
                        }
                        {
                            errorUpdatingPassword &&
                            <div className="alert alert-danger text-center p-1" role="alert">
                                <span className="text-danger">
                                    <strong>
                                    <Failure message={errorUpdatingPassword.message}/>
                                </strong>
                                </span>
                            </div>
                        }
                        {
                            message &&
                            <div className="alert alert-success text-center p-1" role="success">
                                <span className="text-success"><strong>{message}</strong></span>
                            </div>
                        }
                        <div className="card bg-transparent">
                            <div className="ratos-form-card card-body">
                                <div className="text-right" title="Show password">
                                    <a href="#" className="badge badge-info mb-2"
                                       onClick={() => this.setState({showPassword: !this.state.showPassword})}>
                                        {(this.state.showPassword) ?
                                            <FaEye color="white" style={{fontSize: '1.25em'}}/> :
                                            <FaEyeSlash color="white" style={{fontSize: '1.25em'}}/>}
                                    </a>
                                </div>
                                <PasswordsForm
                                    onSubmit={data => this.handleSubmit(data)}
                                    disabled={isPasswordUpdating}
                                    showPassword = {this.state.showPassword}
                                />
                            </div>
                            <div className="card-footer pt-1 pb-1">
                                <LinkContainer to={`/profile`}>
                                    <div className="text-center">
                                        <a href="#" className = "badge badge-secondary">Back to profile</a>
                                    </div>
                                </LinkContainer>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"/>
                </div>
            </div>
        );
    }
}

Password.propTypes = {
    profile: PropTypes.object.isRequired,
    getPasswordUpdated: PropTypes.func.isRequired,
    clearUserPasswordFailure: PropTypes.func.isRequired
};

export default Password;