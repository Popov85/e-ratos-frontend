import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Failure from "./Failure";
import ProfileForm from "./forms/ProfileForm";
import {FaToggleOff, FaToggleOn} from "react-icons/fa";
import {ProfileDto} from "../objects/ProfileDto";
import {LinkContainer} from "react-router-bootstrap";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isProfileEditMode: false
        }
    }

    //Clear all messages
    componentDidMount() {
        this.props.clearUserProfileFailure();
    }

    handleSubmit(data) {
        let profileDTO = new ProfileDto(
            data.name, data.surname, data.email);
        //console.log("profileDTO = ", profileDTO);
        this.props.getProfileUpdated(profileDTO);
    }

    render() {
        const {userInfo} = this.props;
        const {authenticated} = userInfo;
        const {isProfileUpdating, errorUpdatingProfile, message} = this.props.profile;
        return (
            <div className="p-1">
                <div className="alert alert-secondary text-center">
                    <h5 className="alert-heading">
                        <strong>Profile {this.state.isProfileEditMode && "[edit]"}</strong>
                    </h5>
                </div>
                <div className="row mt-1">
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                        {
                            isProfileUpdating &&
                            <div className="text-center text-secondary m-2">
                                <span>Saving...</span>
                            </div>
                        }
                        {
                            errorUpdatingProfile &&
                            <div className="alert alert-danger text-center p-1" role="alert">
                                <span className="text-danger">
                                    <strong>
                                    <Failure message={errorUpdatingProfile.message}/>
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
                                <div className="text-right" title="Edit">
                                    <a href="#" className="badge badge-info mb-2"
                                       onClick={() => this.setState({isProfileEditMode: !this.state.isProfileEditMode})}>
                                        {(this.state.isProfileEditMode) ?
                                            <FaToggleOn color="white" style={{fontSize: '1.25em'}}/> :
                                            <FaToggleOff color="white" style={{fontSize: '1.25em'}}/>}
                                    </a>
                                </div>
                                <ProfileForm
                                    onSubmit={data => this.handleSubmit(data)}
                                    initialValues={
                                        {
                                            name: authenticated.name,
                                            surname: authenticated.surname,
                                            email: authenticated.email
                                        }
                                    }
                                    disabled={!this.state.isProfileEditMode || isProfileUpdating}
                                />
                            </div>
                            <div className="card-footer pt-1 pb-1">
                                <LinkContainer to={`/profile/password`}>
                                    <div className="text-center">
                                        <a href="#" className = "badge badge-secondary">Change password?</a>
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

Profile.propTypes = {
    userInfo: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,

    getProfileUpdated: PropTypes.func.isRequired,
    clearUserProfileFailure: PropTypes.func.isRequired
};

export default Profile;