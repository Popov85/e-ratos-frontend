import React from 'react';
import {Route} from "react-router-dom";
import PropTypes from "prop-types";
import Schemes from "./Schemes";
import Questions from "./Questions";
import Groups from "./Groups";
import Complaints from "./Complaints";
import StaffNavbarContainer from "../containers/StaffNavbarContainer";
import UsersContainer from "../containers/UsersContainer";
import ResultsViewerManager from "./ResultsViewerManager";
import ResultsContainer from "../containers/ResultsContainer";

import {loginURL} from "../../common/_api/appAPI";
import StaffHomeContainer from "../containers/StaffHomeContainer";
import ProfileContainer from "../../common/containers/ProfileContainer";
import PasswordContainer from "../../common/containers/PasswordContainer";
import ReportOnContentContainer from "../containers/ReportOnContentContainer";
import ReportOnResultsContainer from "../containers/ReportOnResultsContainer";
import StructureContainer from "../containers/StructureContainer";
import OrganisationsContainer from "../containers/OrganisationsContainer";
import FacultiesContainer from "../containers/FacultiesContainer";
import DepartmentsContainer from "../containers/DepartmentsContainer";
import ProtectedResource from "../../common/ProtectedResource";
import CoursesContainer from "../containers/CoursesContainer";
import ThemesContainer from "../containers/ThemesContainer";
import LmsContainer from "../containers/LmsContainer";
import QuestionsMcqContainer from "../containers/QuestionsMcqContainer";
import ResourcesContainer from "../containers/ResourcesContainer";
import HelpsContainer from "../containers/HelpsContainer";
import SchemesContainer from "../containers/SchemesContainer";

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
                    <Route path="/structure" component={StructureContainer}/>
                    <Route path="/structure/organisations" exact component={OrganisationsContainer}/>
                    <Route path="/structure/faculties" exact component={FacultiesContainer}/>
                    <Route path="/structure/departments" exact component={DepartmentsContainer}/>
                    <Route path="/courses" exact component={CoursesContainer}/>
                    <Route path="/schemes" exact component={SchemesContainer}/>
                    <Route path="/themes" exact component={ThemesContainer}/>
                    <Route path="/themes/:themeId/questions-mcq" exact component={QuestionsMcqContainer}/>
                    <Route path="/questions-mcq" exact component={QuestionsMcqContainer}/>
                    <Route path="/questions" exact component={Questions}/>
                    <Route path="/resources" exact component={ResourcesContainer}/>
                    <Route path="/helps" exact component={HelpsContainer}/>
                    <Route path="/report/on-content" exact component={ReportOnContentContainer} />
                    <Route path="/report/on-results" exact component={ReportOnResultsContainer}/>
                    <Route path="/results" exact component={ResultsContainer}/>
                    <Route path="/results/details/:resultId" exact component={ResultsViewerManager}/>
                    <Route path="/groups" exact component={Groups}/>
                    <Route path="/complaints" exact component={Complaints}/>
                    <Route path="/lms" exact component={LmsContainer}/>
                    <Route path="/profile" exact component={ProfileContainer}/>
                    <Route path="/profile/password" exact component={PasswordContainer}/>
                    <Route path="/protected" exact component={ProtectedResource}/>
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