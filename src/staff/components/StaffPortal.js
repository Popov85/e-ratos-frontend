import React from 'react';
import {Route} from "react-router-dom";
import PropTypes from "prop-types";
import Courses from "./Courses";
import Schemes from "./Schemes";
import Themes from "./Themes";
import Questions from "./Questions";
import Resources from "./Resources";
import Groups from "./Groups";
import Complaints from "./Complaints";
import Lms from "./Lms";
import StaffNavbarContainer from "../containers/StaffNavbarContainer";
import UsersContainer from "../containers/UsersContainer";
import UserEditManager from "./UserEditManager";
import UserEditContainer from "../containers/UserEditContainer";
import ResultsViewerManager from "./ResultsViewerManager";
import ResultsContainer from "../containers/ResultsContainer";

import {loginURL} from "../../common/_api/appAPI";
import StaffHomeContainer from "../containers/StaffHomeContainer";
import ProfileContainer from "../../common/containers/ProfileContainer";
import PasswordContainer from "../../common/containers/PasswordContainer";


class StaffPortal extends React.Component {

    componentDidMount() {
        // Only if there is no UserInfo in store!
        const {authenticated} = this.props.userInfo;
        if (!authenticated) this.props.loadUserInfo();
    }

    render() {
        const {logged} = this.props.security;
        if (!logged) window.location.assign(loginURL);
        const {authenticated} = this.props.userInfo;
        if (!authenticated) return null;
        return (
            <React.Fragment>
                <StaffNavbarContainer/>
                <main>
                    <Route path="/" exact component={StaffHomeContainer}/>
                    <Route path="/users" exact component={UsersContainer}/>
                    <Route path="/users/new/" exact component={UserEditContainer}/>
                    <Route path="/users/edit/:staffId" exact component={UserEditManager}/>
                    <Route path="/courses" exact component={Courses}/>
                    <Route path="/schemes" exact component={Schemes}/>
                    <Route path="/themes" exact component={Themes}/>
                    <Route path="/questions" exact component={Questions}/>
                    <Route path="/resources" exact component={Resources}/>
                    <Route path="/results" exact component={ResultsContainer}/>
                    <Route path="/results/details/:resultId" exact component={ResultsViewerManager}/>
                    <Route path="/groups" exact component={Groups}/>
                    <Route path="/complaints" exact component={Complaints}/>
                    <Route path="/lms" exact component={Lms}/>
                    <Route path="/profile" exact component={ProfileContainer}/>
                    <Route path="/profile/password" exact component={PasswordContainer}/>
                </main>
            </React.Fragment>
        );
    }
}

StaffPortal.propTypes = {
    userInfo: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired,

    loadUserInfo: PropTypes.func.isRequired
};

export default StaffPortal;