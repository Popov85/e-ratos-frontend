import React, {useEffect, useState} from 'react';
import Failure from "../../common/components/Failure";
import {FaToggleOff, FaToggleOn} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/rootReducer";
import {UserInfo} from "../../common/types/UserInfo";
import {getUserInfo} from "../../common/selectors/userSelector";
import { getProfileUpdated} from "../actions/profileAction";
import {Profile} from "../types/Profile";
import ProfileForm from "../forms/ProfileForm";
import {clearUserProfileFailure} from "../reducers/profileReducer";


const Profile: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();

    const logged: boolean = useSelector((state: RootState) => state.auth.logged);

    const authorization: Partial<Authorization | null> = useSelector((state: RootState) => state.auth.authorization);

    const userInfo: UserInfo | null = useSelector((state: RootState) => getUserInfo(state));

    if (!logged || !authorization || !userInfo) return null;

    const profile = useSelector((state: RootState) => state.staff.profile);

    const [isProfileEditMode, setIsProfileEditMode] = useState<boolean>(false);

    useEffect(() => {
        dispatch(clearUserProfileFailure());
    }, []);

    const handleSubmit = (profile: Profile): void => {
        dispatch(getProfileUpdated(profile));
    };

    return (
        <div className="container-fluid p-0">
            <div className="p-1">
                <div className="alert alert-secondary text-center">
                    <h5 className="alert-heading">
                        <strong>Profile {isProfileEditMode && "[edit]"}</strong>
                    </h5>
                </div>
                <div className="row mt-1">
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                    <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                        {profile.isProfileUpdating && (
                            <div className="text-center text-secondary m-2">
                                <span>Saving...</span>
                            </div>
                        )}
                        {profile.errorMessageUpdatingProfile && (
                            <div className="alert alert-danger text-center p-1" role="alert">
                                <span className="text-danger">
                                    <strong>
                                        <Failure message={profile.errorMessageUpdatingProfile} />
                                    </strong>
                                </span>
                            </div>
                        )}
                        {profile.message && (
                            <div className="alert alert-success text-center p-1" role="success">
                                <span className="text-success">
                                    <strong>{profile.message}</strong>
                                </span>
                            </div>
                        )}
                        <div className="card bg-transparent">
                            <div className="ratos-form-card card-body">
                                <div className="text-right" title="Edit">
                                    <a
                                        href="#"
                                        className="badge badge-info mb-2"
                                        onClick={() => setIsProfileEditMode(!isProfileEditMode)}
                                    >
                                        {isProfileEditMode ? (
                                            <FaToggleOn color="white" style={{ fontSize: '1.25em' }} />
                                        ) : (
                                            <FaToggleOff color="white" style={{ fontSize: '1.25em' }} />
                                        )}
                                    </a>
                                </div>
                                <ProfileForm
                                    onSubmit={handleSubmit}
                                    initialValues={{
                                        name: userInfo.name,
                                        surname: userInfo.surname,
                                        email: userInfo.email,
                                    }}
                                    disabled={!isProfileEditMode || profile.isProfileUpdating}
                                />
                            </div>
                            <div className="card-footer pt-1 pb-1">
                                <LinkContainer to={`/staff/profile/password`}>
                                    <div className="text-center">
                                        <a href="#" className="badge badge-secondary">Change password?</a>
                                    </div>
                                </LinkContainer>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-sm-2 col-md-3 col-lg-4" />
                </div>
            </div>
        </div>
    );
};

export default Profile;